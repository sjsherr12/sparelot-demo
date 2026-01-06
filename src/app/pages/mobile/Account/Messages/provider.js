import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { getFirestore, doc, collection, query, orderBy, limit, startAfter, onSnapshot, where, getDocs, updateDoc, getDoc } from 'firebase/firestore';
import { useUserAuthState } from 'app/backend/user/auth/reactprovider';

// Create context
const ChatContext = createContext();

// Custom hook for consuming the context
export const useChatContext = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useUserAuthState();
  
  // Use refs to store unsubscribe functions
  const chatsUnsubscribeRef = useRef(null);
  const messagesUnsubscribeRef = useRef(null);

  // Load initial chats for the user
  useEffect(() => {
    if (!user?.uid) return;
    
    setLoading(true);
    
    const firestore = getFirestore();
    
    try {
      // Query for chats where the current user is a participant
      const chatsQuery = query(
        collection(firestore, 'chats'),
        where('participants', 'array-contains', user.uid)
      );
      
      // Set up real-time listener for chats
      const unsubscribe = onSnapshot(chatsQuery, async (snapshot) => {
        try {
          const chatPromises = snapshot.docs.map(async (docSnapshot) => {
            const chatData = docSnapshot.data();
            const chatId = docSnapshot.id;
            
            // Find the other participant's ID
            const otherUserId = chatData.participants.find(id => id !== user.uid);
            
            // Get the latest message and unread count in a single batch
            const messagesRef = collection(firestore, `chats/${chatId}/messages`);
            
            // Query for the latest message
            const latestMessageQuery = query(
              messagesRef,
              orderBy('timestamp', 'desc'),
              limit(1)
            );
            
            // For unread messages, we need a different approach since array-not-contains isn't valid
            // Either query for all messages and filter client-side or use a field to track read status
            const unreadQuery = query(messagesRef, where('readBy', 'not-in', [user.uid]), limit(20));
            
            // Execute both queries in parallel
            const [latestMsgSnapshot, unreadSnapshot] = await Promise.all([
              getDocs(latestMessageQuery),
              getDocs(unreadQuery)
            ]);
            
            const latestMessage = latestMsgSnapshot.docs[0]?.data() || null;
            const latestMessageTime = latestMessage?.timestamp?.toMillis() || 0;
            
            // Filter unread messages client-side
            const unreadCount = unreadSnapshot.docs.filter(doc => {
              const data = doc.data();
              return !data.readBy || !data.readBy.includes(user.uid);
            }).length;
            
            return {
              id: chatId,
              otherUserId,
              data: chatData,
              latestMessage,
              latestMessageTime,
              unreadCount,
            };
          });
          
          const fetchedChats = await Promise.all(chatPromises);
          
          // Sort chats by latest message time
          fetchedChats.sort((a, b) => b.latestMessageTime - a.latestMessageTime);
          setChats(fetchedChats);
        } catch (error) {
          console.error('Error processing chat data:', error);
        }
        
        setLoading(false);
      }, (error) => {
        console.error('Error in chat listener:', error);
        setLoading(false);
      });
      
      // Store unsubscribe function
      chatsUnsubscribeRef.current = unsubscribe;
      
      // Cleanup function
      return () => {
        if (chatsUnsubscribeRef.current) {
          chatsUnsubscribeRef.current();
        }
      };
    } catch (error) {
      console.error('Error setting up chat listener:', error);
      setLoading(false);
    }
  }, [user?.uid]);

  // Clean up message listener when component unmounts
  useEffect(() => {
    return () => {
      if (messagesUnsubscribeRef.current) {
        messagesUnsubscribeRef.current();
        messagesUnsubscribeRef.current = null;
      }
    };
  }, []);

  // Helper function to update the latest message in the chats array
  const updateLatestMessageInChats = (chatId, message) => {
    if (!message || !chatId) return;
    
    setChats(prevChats => {
      // Find the chat to update
      const updatedChats = prevChats.map(chat => {
        if (chat.id === chatId) {
          // Check if timestamp is a Date object or Firestore timestamp
          let formattedTimestamp;
          if (message.timestamp instanceof Date) {
            // Convert Date to a format similar to Firestore timestamp
            formattedTimestamp = {
              seconds: Math.floor(message.timestamp.getTime() / 1000),
              nanoseconds: 0
            };
          } else {
            // Use the existing timestamp format
            formattedTimestamp = message.timestamp;
          }
          
          // Update with the new message in the correct format
          return {
            ...chat,
            latestMessage: {
              message: message.message || message.text || "", // Handle both possible field names
              timestamp: formattedTimestamp,
            },
            latestMessageTime: 
              (formattedTimestamp?.seconds * 1000) || 
              (message.timestamp instanceof Date ? message.timestamp.getTime() : Date.now()),
            // If the new message is from the other user and not read yet, increment unread count
            unreadCount: message.senderId !== user?.uid && (!message.readBy || !message.readBy.includes(user?.uid)) 
              ? chat.unreadCount + 1 
              : chat.unreadCount
          };
        }
        return chat;
      });
      
      // Re-sort chats by latest message time
      return updatedChats.sort((a, b) => b.latestMessageTime - a.latestMessageTime);
    });
  };

  // Set active chat and load initial messages
  const setActiveChatById = async (chatId) => {
    if (!chatId || !user?.uid) return;
    
    // Clean up previous message listener if exists
    if (messagesUnsubscribeRef.current) {
      messagesUnsubscribeRef.current();
      messagesUnsubscribeRef.current = null;
    }
    
    setActiveChat(chatId);
    
    // Verify access to this chat
    try {
      const firestore = getFirestore();
      const chatRef = doc(firestore, `chats/${chatId}`);
      const chatDoc = await getDoc(chatRef);
      
      if (!chatDoc.exists()) {
        console.error("Chat does not exist");
        return;
      }
      
      const chatData = chatDoc.data();
      if (!chatData.participants.includes(user.uid)) {
        console.error("User not authorized to access this chat");
        return;
      }
      
      // Load messages after confirming access
      loadInitialMessages(chatId);
      
      // Mark messages as read when chat is opened
      markMessagesAsRead(chatId, user.uid);
    } catch (error) {
      console.error('Error verifying chat access:', error);
    }
  };

  // Load initial batch of messages
  const loadInitialMessages = async (chatId) => {
    if (!chatId || !user?.uid) return;
    
    setLoadingMessages(true);
    setMessages([]);
    setHasMoreMessages(true);
    setLastVisible(null);
    
    try {
      const firestore = getFirestore();
      const messagesRef = collection(firestore, `chats/${chatId}/messages`);
      
      // Get initial batch of messages
      const initialQuery = query(
        messagesRef,
        orderBy('timestamp', 'desc'),
        limit(20)
      );
      
      const messagesSnapshot = await getDocs(initialQuery);
      
      if (messagesSnapshot.empty) {
        setHasMoreMessages(false);
        setMessages([]);
      } else {
        const fetchedMessages = messagesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: new Date(doc.data().timestamp?.seconds*1000) || new Date()
        }));
        
        setMessages(fetchedMessages.reverse());
        setLastVisible(messagesSnapshot.docs[messagesSnapshot.docs.length - 1]);
        setHasMoreMessages(messagesSnapshot.size === 20);
      }
      
      // Set up real-time listener for new messages
      setupMessageListener(chatId);
    } catch (error) {
      console.error('Error loading initial messages:', error);
    } finally {
      setLoadingMessages(false);
    }
  };

  // Set up real-time listener for new messages
  const setupMessageListener = (chatId) => {
    if (!chatId || !user?.uid) return;
    
    try {
      const firestore = getFirestore();
      const messagesRef = collection(firestore, `chats/${chatId}/messages`);
      
      // We want to listen for messages newer than our current newest message
      let realtimeQuery;
      
      if (messages.length > 0) {
        const newestTimestamp = messages[messages.length - 1]?.timestamp;
        
        realtimeQuery = query(
          messagesRef,
          where('timestamp', '>', newestTimestamp),
          orderBy('timestamp', 'asc')
        );
      } else {
        // If no messages yet, just listen for new ones
        realtimeQuery = query(
          messagesRef,
          orderBy('timestamp', 'desc'),
          limit(20)
        );
      }
      
      const unsubscribe = onSnapshot(realtimeQuery, (snapshot) => {
        if (!snapshot.empty) {
          const newMessages = snapshot.docs
          .map(doc => {
            const data = doc.data();
            const timestamp = data.timestamp?.seconds ? new Date(data.timestamp.seconds * 1000) : null;
            if (!timestamp) return null; // skip if server timestamp is missing
            return {
              id: doc.id,
              ...data,
              timestamp,
            };
          })
          .filter(Boolean);
          
          setMessages(prevMessages => {
            // Filter out any messages we already have
            const uniqueNewMessages = newMessages.filter(
              newMsg => !prevMessages.some(existingMsg => existingMsg.id === newMsg.id)
            );
            
            if (uniqueNewMessages.length === 0) return prevMessages;
            
            // Sort all messages by timestamp
            return [...prevMessages, ...uniqueNewMessages].sort(
              (a, b) => a.timestamp - b.timestamp
            );
          });
          
          // Update the latest message in the chats list for each new message
          // We use the most recent message to update the chats list
          if (newMessages.length > 0) {
            // Sort by timestamp and get the most recent message
            const mostRecentMessage = [...newMessages].sort((a, b) => 
              b.timestamp.getTime() - a.timestamp.getTime()
            )[0];
            
            // Update the chats list with this message
            updateLatestMessageInChats(chatId, mostRecentMessage);
          }
          
          // Mark new messages as read if they're from the other user
          newMessages.forEach(msg => {
            if (msg.senderId !== user.uid) {
              markMessageAsRead(chatId, msg.id, user.uid);
            }
          });
        }
      }, (error) => {
        console.error('Error in message listener:', error);
      });
      
      // Store unsubscribe function
      messagesUnsubscribeRef.current = unsubscribe;
    } catch (error) {
      console.error('Error setting up message listener:', error);
    }
  };

  // Load more messages when scrolling up
  const loadMoreMessages = async () => {
    if (!activeChat || !lastVisible || !hasMoreMessages || loadingMessages || !user?.uid) return;
    
    setLoadingMessages(true);
    
    try {
      const firestore = getFirestore();
      const messagesRef = collection(firestore, `chats/${activeChat}/messages`);
      
      // Get older messages before our oldest loaded message
      const moreMessagesQuery = query(
        messagesRef,
        orderBy('timestamp', 'desc'), // Keep consistent with loadInitialMessages
        startAfter(lastVisible),
        limit(20)
      );
      
      const messagesSnapshot = await getDocs(moreMessagesQuery);
      
      if (messagesSnapshot.empty) {
        setHasMoreMessages(false);
      } else {
        const fetchedMessages = messagesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: new Date(doc.data().timestamp?.seconds*1000) || new Date()
        }));
        
        setMessages(prevMessages => {
          // Since these are older messages and we're using 'desc' order,
          // they should be added at the beginning but need to be reversed first
          return [...fetchedMessages.reverse(), ...prevMessages];
        });
        
        setLastVisible(messagesSnapshot.docs[messagesSnapshot.docs.length - 1]);
        setHasMoreMessages(messagesSnapshot.size === 20);
      }
    } catch (error) {
      console.error('Error loading more messages:', error);
    } finally {
      setLoadingMessages(false);
    }
  };

  // Mark a single message as read
  const markMessageAsRead = async (chatId, messageId, userId) => {
    if (!chatId || !messageId || !userId) return;
    
    try {
      const firestore = getFirestore();
      const messageRef = doc(firestore, `chats/${chatId}/messages/${messageId}`);
      
      // Get the current message data
      const messageSnapshot = await getDoc(messageRef);
      
      if (messageSnapshot.exists()) {
        const messageData = messageSnapshot.data();
        const readBy = messageData.readBy || [];
        
        // Only update if user isn't already in readBy
        if (!readBy.includes(userId)) {
          await updateDoc(messageRef, { 
            readBy: [...readBy, userId] 
          });
          
          // Update unread count in chats list
          setChats(prevChats => 
            prevChats.map(chat => 
              chat.id === chatId ? 
                { ...chat, unreadCount: Math.max(0, chat.unreadCount - 1) } : 
                chat
            )
          );
        }
      }
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  // Mark all unread messages in a chat as read
  const markMessagesAsRead = async (chatId, userId) => {
    if (!chatId || !userId) return;
    
    try {
      const firestore = getFirestore();
      const messagesRef = collection(firestore, `chats/${chatId}/messages`);
      
      // Get all messages
      const messagesSnapshot = await getDocs(messagesRef);
      
      // Filter for unread messages client-side
      const unreadMessages = messagesSnapshot.docs.filter(doc => {
        const data = doc.data();
        return !data.readBy || !data.readBy.includes(userId);
      });
      
      // Update each unread message
      const updatePromises = unreadMessages.map(async (docSnapshot) => {
        const messageRef = doc(firestore, `chats/${chatId}/messages/${docSnapshot.id}`);
        const messageData = docSnapshot.data();
        
        // Update readBy array
        const readBy = [...(messageData.readBy || []), userId];
        return updateDoc(messageRef, { readBy });
      });
      
      await Promise.all(updatePromises);
      
      // Update local chat list to reflect read status
      setChats(prevChats => 
        prevChats.map(chat => 
          chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
        )
      );
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  };

  // Function to send a message and update the chat list
  const sendMessage = async (chatId, messageData) => {
    try {
      // Your existing send message logic here
      
      // After sending, update the latestMessage in chats
      updateLatestMessageInChats(chatId, messageData);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const value = {
    chats,
    loading,
    activeChat,
    setActiveChat,
    messages,
    loadingMessages,
    hasMoreMessages,
    setActiveChatById,
    loadMoreMessages,
    markMessagesAsRead,
    sendMessage // Export the new function
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};