import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Box, Typography, TextField, IconButton, Avatar, Icon, Tooltip, 
  useMediaQuery, Button, Menu, MenuItem, Divider
} from '@mui/material';
import { 
  Send, ArrowBackIosNew, PendingActions, 
  MoreVert, Delete, Flag, ContentCopy 
} from '@mui/icons-material';
import { format, isToday, isYesterday, isSameDay } from 'date-fns';
import { 
  doc, getDoc, getFirestore, updateDoc, collection, 
  addDoc, serverTimestamp, deleteDoc 
} from 'firebase/firestore';
import { useUserAuthState } from 'app/backend/user/auth/reactprovider';
import { useChatContext } from './provider';
import { getUser } from 'app/backend/db/user';
import { ReservationStatus } from 'app/utils/optimize/utils';
import conditionalNavigation from 'conditionalNavigation';
import colors from 'assets/theme/base/colors';
import { LoadingSpinner } from 'app/utils/loading/component';
import isStandalone from 'isStandalone';
import AdaptiveModal from 'app/sections/Modal/Adaptive';
import UserProfile from 'app/pages/web/UserProfile';
import { ReservationViewingRole } from 'app/utils/optimize/utils';
import RentalPreview from 'app/pages/web/Account/Activity/Rentals/preview';
import { ReportMenuItem } from 'app/sections/More';
import { BasicMenuItem } from 'app/sections/More';
import { MoreOptionsMenu } from 'app/sections/More';
import WarnedAction from 'app/sections/Options/Action';
import UserProfileSheet from 'app/sections/Modal/Profile';
import { FOOTER_HEIGHT } from 'app/utils/optimize/utils';

const InChat = () => {
    const { chatId } = useParams();
    const isMobile = isStandalone();
    const { user } = useUserAuthState();
    const navigate = useNavigate();
    const { messages, loadingMessages, hasMoreMessages, loadMoreMessages, markMessagesAsRead } = useChatContext();
    
    const [loading, setLoading] = useState(false);
    const [otherUser, setOtherUser] = useState(null);
    const [otherUserId, setOtherUserId] = useState('');
    const [messageToSend, setMessageToSend] = useState('');
    const [isSendingAllowed, setIsSendingAllowed] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [reservation, setReservation] = useState(null);
    const [reservationId, setReservationId] = useState(null);
    const [isViewingRequest, setIsViewingRequest] = useState(false);
    const [relativeUserDescription, setRelativeUserDescription] = useState(false);
    const [isViewingUserProfile, setIsViewingUserProfile] = useState(false);
    
    // Message options menu state
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [confirmationAction, setConfirmationAction] = useState(null);
    
    const bottomRef = useRef(null);
    const containerRef = useRef(null);
    const messageContainerRef = useRef(null);
    const isInitialLoad = useRef(true);
    const cooldownPeriod = 2000; // Cooldown duration in milliseconds

    // Fetch chat details when chatId changes
    useEffect(() => {
        const getChatDetails = async () => {
            if (!user || !chatId) return;
            
            setLoading(true);
            try {
                const chatDocRef = doc(getFirestore(), 'chats', chatId);
                const chatDocSnapshot = await getDoc(chatDocRef);
                
                if (chatDocSnapshot.exists()) {
                    const chatData = chatDocSnapshot.data();
                    
                    // Set reservationId if available
                    if (reservationId !== chatData?.reservationId) {
                        setReservationId(chatData?.reservationId);
                    }
                    
                    // Get other user ID and fetch user details
                    const otherUserId = chatData.participants.find(id => id !== user.uid);
                    setOtherUserId(otherUserId);
                    const otherUserData = await getUser(otherUserId);
                    setOtherUser(otherUserData);
                    
                    // Mark messages as read when entering chat
                    markMessagesAsRead(chatId, user.uid);
                } else {
                    navigate('/messages');
                }
            } catch (error) {
                console.error("Error fetching chat details:", error);
            } finally {
                setLoading(false);
            }
        };
        
        getChatDetails();
    }, [chatId, user]);

    // Fetch reservation details when reservationId changes
    useEffect(() => {
        const getReservation = async () => {
            if (!reservationId) {
                setReservation(null);
                setRelativeUserDescription('User on SpareLot');
                return;
            }
            
            setLoading(true);
            try {
                const reservationDoc = await getDoc(doc(getFirestore(), `reservations/${reservationId}`));
                if (reservationDoc.exists()) {
                    const reservationData = reservationDoc.data();
                    setReservation(reservationData);
                    setRelativeUserDescription(getRelativeDescription(reservationData));
                }
            } catch (error) {
                console.error("Error fetching reservation:", error);
            } finally {
                setLoading(false);
            }
        };
        
        getReservation();
    }, [reservationId]);

    // Scroll to bottom on initial load or when new messages arrive
    useEffect(() => {
        if (isInitialLoad.current && messages.length > 0) {
            bottomRef.current?.scrollIntoView({ behavior: 'auto' });
            isInitialLoad.current = false;
        }
        else if (!isLoadingMore && messages.length > 0) {
            bottomRef?.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isLoadingMore]);

    // Handle loading more messages with button click
    const handleLoadMoreMessages = async () => {
        if (!hasMoreMessages || loadingMessages || isLoadingMore) return;
        
        setIsLoadingMore(true);
        try {
            await loadMoreMessages();
        } catch (error) {
            console.error("Error loading more messages:", error);
        } finally {
            setIsLoadingMore(false);
        }
    };

    // Relative user description based on reservation status
    const getRelativeDescription = useCallback((reservation) => {
        if (!reservation) return 'User on SpareLot';
        
        const now = (new Date()).setHours(0, 0, 0, 0);
        
        if (reservation?.renter === user?.uid) {
            return 'Host on SpareLot';
        } else {
            if (reservation?.startDate && reservation?.endDate) {
                if (reservation.startDate < now) {
                    if (reservation?.status === ReservationStatus.Approved) {
                        if (reservation.endDate > now) {
                            return `Renting until ${(new Date(reservation?.endDate)).toLocaleDateString()}`;
                        } else {
                            return 'Has rented previously';
                        }
                    } else if (reservation?.status === ReservationStatus.Pending) {
                        return 'Has overdue request!';
                    }
                } else {
                    if (reservation?.status === ReservationStatus.Approved) {
                        return `Starts renting on ${(new Date(reservation?.startDate)).toLocaleDateString()}`;
                    } else if (reservation?.status === ReservationStatus.Pending) {
                        return `Request: ${(new Date(reservation?.startDate)).toLocaleDateString()} to ${(new Date(reservation?.endDate)).toLocaleDateString()}`;
                    }
                }
            } else {
                return 'Renter on SpareLot';
            }
        }
        return 'User on SpareLot';
    }, [user]);

    // Handle key press for message sending
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey && isSendingAllowed) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // Send message function
    const handleSendMessage = async () => {
        if (!user || !chatId || !messageToSend.trim() || !isSendingAllowed) return;
        
        const messageCopy = messageToSend;
        setMessageToSend('');
        
        try {
            const chatMessagesRef = collection(getFirestore(), `chats/${chatId}/messages`);
            
            await addDoc(chatMessagesRef, {
                message: messageCopy,
                senderId: user.uid,
                timestamp: serverTimestamp(),
                type: 'text',
                readBy: [user.uid],
                edited: false,
                deleted: false
            });
            
            // Set cooldown to prevent sending another message immediately
            setIsSendingAllowed(false);
            setTimeout(() => setIsSendingAllowed(true), cooldownPeriod);
        } catch (error) {
            console.error("Error sending message:", error);
            setMessageToSend(messageCopy); // Restore message on error
        }
    };

    // Message options menu handlers
    const handleMenuOpen = (event, message) => {
        setAnchorEl(event.currentTarget);
        setSelectedMessage(message);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleCopyMessage = () => {
        if (selectedMessage) {
            navigator.clipboard.writeText(selectedMessage.message)
                .then(() => console.log('Message copied to clipboard'))
                .catch(err => console.error('Failed to copy message: ', err));
        }
        handleMenuClose();
    };

    const handleOpenDeleteConfirmation = () => {
        setConfirmationAction('delete');
        setIsConfirmationOpen(true);
        handleMenuClose();
    };

    const handleConfirmAction = async () => {
        if (!selectedMessage) return;

        try {
            if (confirmationAction === 'delete') {
                // Only allow deletion of user's own messages
                if (selectedMessage.senderId === user.uid) {
                    const messageRef = doc(getFirestore(), `chats/${chatId}/messages/${selectedMessage.id}`);
                    
                    // Soft delete - mark as deleted and update message
                    await updateDoc(messageRef, {
                        deleted: true
                    });
                    selectedMessage.deleted = true;
                }
            }
        } catch (error) {
            console.error(`Error ${confirmationAction}ing message:`, error);
        } finally {
            setIsConfirmationOpen(false);
            setSelectedMessage(null);
            setConfirmationAction(null);
        }
    };

    // Function to render date divider
    const renderDateDivider = (date) => {
        let dateText;
        
        if (isToday(date)) {
            dateText = "Today";
        } else if (isYesterday(date)) {
            dateText = "Yesterday";
        } else {
            dateText = format(date, 'MMMM d, yyyy');
        }
        
        return (
            <Box 
                sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    my: 3,
                }}
            >
                <Divider sx={{ flex: 1 }} />
                <Typography 
                    variant="caption" 
                    sx={{ 
                        mx: 2, 
                        px: 2,
                        py: 0.5,
                        borderRadius: 4,
                        bgcolor: '#f0f0f0',
                        fontWeight: 500,
                        color: '#666'
                    }}
                >
                    {dateText}
                </Typography>
                <Divider sx={{ flex: 1 }} />
            </Box>
        );
    };

    // Function to get message content based on deleted status
    const getMessageContent = (msg) => {
        if (msg.deleted) {
            return msg.senderId === user?.uid 
                ? "You deleted a message" 
                : `${otherUser?.personal?.firstName || 'User'} deleted a message`;
        }
        return msg.message;
    };

    // Function to render each message bubble
    const renderMessage = (msg, index, showDateDivider) => {
        const isCurrentUser = msg.senderId === user?.uid;
        const messageDate = msg?.timestamp && new Date(msg?.timestamp)?.getTime() ? new Date(msg?.timestamp) : new Date();
        const timeString = format(messageDate, 'h:mm a');
        const senderData = isCurrentUser ? user : otherUser;
        
        return (
            <React.Fragment key={msg.id || index}>
                {showDateDivider && renderDateDivider(messageDate)}
                <Box
                    sx={{
                        mb: 1,
                        width: '100%',
                        display: 'flex',
                        flexDirection: isCurrentUser ? 'row-reverse' : 'row',
                        alignItems: 'flex-end',
                    }}
                >
                    {/* User Avatar */}
                    <Avatar
                        sx={{
                            width: 36,
                            height: 36,
                            mx: 1,
                            boxShadow: 1,
                            '& img': {
                                objectFit: 'cover',
                                width: '100%',
                                height: '100%',
                                userDrag: 'none',
                                WebkitUserDrag: 'none'
                            },
                        }}
                        src={isCurrentUser ? user?.photoURL : otherUser?.profile?.avatar}
                    />
                    
                    {/* Message Bubble */}
                    <Box
                        sx={{
                            position: 'relative',
                            p: 2,
                            maxWidth: '65%',
                            borderRadius: 2,
                            backgroundColor: isCurrentUser ? colors.primary : '#f0f0f0',
                            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                            wordBreak: 'break-word',
                            opacity: msg.deleted ? 0.7 : 1, // Reduce opacity for deleted messages
                            '&:hover .message-options': {
                                opacity: 1,
                                visibility: 'visible',
                            }
                        }}
                        onClick={(e) => !msg.deleted && handleMenuOpen(e, msg)}
                    >
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#000',
                                whiteSpace: 'pre-wrap',
                                fontStyle: msg.deleted ? 'italic' : 'normal', // Italicize deleted messages
                            }}
                        >
                            {getMessageContent(msg)}
                        </Typography>
                        <Typography 
                            variant="caption" 
                            sx={{ 
                                mt: 0.5, 
                                opacity: 0.8,
                                display: 'block', 
                                textAlign: isCurrentUser ? 'right' : 'left',
                                fontSize: '0.75rem'
                            }}
                        >
                            {timeString}
                        </Typography>
                        
                        {/* More options icon (only show for non-deleted messages) */}
                        {!msg.deleted && (
                            <IconButton
                                className="message-options"
                                size="small"
                                sx={{
                                    position: 'absolute',
                                    top: -10,
                                    right: isCurrentUser ? 'auto' : -10,
                                    left: isCurrentUser ? -10 : 'auto',
                                    opacity: 0,
                                    visibility: 'hidden',
                                    transition: 'opacity 0.2s ease-in-out',
                                    bgcolor: '#fff',
                                    boxShadow: '0px 1px 3px rgba(0,0,0,0.2)',
                                    '&:hover': {
                                        bgcolor: '#f5f5f5',
                                    }
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleMenuOpen(e, msg);
                                }}
                            >
                                <MoreVert fontSize="small" />
                            </IconButton>
                        )}
                    </Box>
                </Box>
            </React.Fragment>
        );
    };

    // Group messages by date for date dividers
    const renderMessages = () => {
        let lastMessageDate = null;
        
        return messages
            .filter(message => message.timestamp?.toISOString) // only render if timestamp is valid
            .map((message, index) => {
                const messageDate = message?.timestamp && new Date(message?.timestamp)?.getTime() 
                    ? new Date(message?.timestamp) 
                    : new Date();
                
                // Check if we need to show date divider
                const showDateDivider = !lastMessageDate || !isSameDay(lastMessageDate, messageDate);
                lastMessageDate = messageDate;
                
                return renderMessage(message, index, showDateDivider);
            });
    };

    if (loading) {
        return (
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <LoadingSpinner />
            </Box>
        );
    }

    return (
        <>
            <Box
                ref={containerRef}
                sx={{
                    width: '100%',
                    minHeight: isStandalone() ? { xs: 'calc(100dvh)' , lg: `calc(100dvh - ${FOOTER_HEIGHT}px)`  } : {xs: 'calc(100dvh - 115px)', lg:'calc(100dvh - 85px)'},
                    maxHeight: isStandalone() ? { xs: 'calc(100dvh)' , lg: `calc(100dvh - ${FOOTER_HEIGHT}px)`  } : {xs: 'calc(100dvh - 115px)', lg:'calc(100dvh - 85px)'},
                    display: 'flex',
                    position: 'relative',
                    flexDirection: 'column',
                }}
            >
                {/* Chat header */}
                <Box
                    id="participant-info-header"
                    sx={{
                        p: 2,
                        gap: 2,
                        height: 75,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'start',
                        borderBottom: '1px solid #EDEDED'
                    }}
                >
                    <IconButton
                        sx={{
                            mx: -1.5,
                            display: { xs: 'flex', lg: 'none' },
                        }}
                        onClick={() => navigate('/messages')}
                    >
                        <Icon sx={{ color: '#000' }}>
                            <ArrowBackIosNew />
                        </Icon>
                    </IconButton>

                    <Box
                        component={isMobile ? Box : Link}
                        to={`/profile/${otherUserId}`}
                        target='_blank'
                        onClick={() => {if (isMobile) {setIsViewingUserProfile(true)}}}
                        sx={{
                            p:.5,
                            m:-.5,
                            pr:1,
                            mr:-1,
                            display:'flex',
                            alignItems:'center',
                            gap:2,
                            borderRadius:2,
                            cursor: 'pointer',
                            transition:'all .15s ease',
                            '&:hover':{
                                bgcolor:'#efefef',
                                transition:'all .15s ease',
                            }
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 48,
                                height: 48,
                                boxShadow: 2,

                                '& img': {
                                    objectFit: 'cover',
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    userDrag: 'none',
                                    WebkitUserDrag: 'none'
                                },
                            }}
                            src={otherUser?.profile?.avatar}
                        />

                        <Box>
                            <Typography
                                sx={{
                                    color: '#000',
                                    fontSize: '1.2rem',
                                    fontWeight: 650,
                                    lineHeight: '25px'
                                }}
                            >
                                {`${otherUser?.personal?.firstName || 'User'} ${otherUser?.personal?.lastName || ''}`}
                            </Typography>
                            <Typography
                                sx={{
                                    color: '#333',
                                    fontSize: '.875rem',
                                    fontWeight: 500,
                                    lineHeight: '20px',
                                }}
                            >
                                {relativeUserDescription}
                            </Typography>
                        </Box>
                    </Box>
                    

                    <Tooltip
                        title="Reservation Request"
                        placement="left"
                        arrow
                    >
                        <IconButton
                            size='large'
                            sx={{
                                mr: -1,
                                ml: 'auto',
                                display: reservation ? 'flex' : 'none',
                            }}
                            onClick={() => setIsViewingRequest(true)}
                        >
                            <Icon sx={{ color: '#000' }}>
                                <PendingActions />
                            </Icon>
                        </IconButton>
                    </Tooltip>
                </Box>

                {/* Messages area */}
                <Box
                    id="messages"
                    ref={messageContainerRef}
                    sx={{
                        p: 2,
                        gap: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        flex: 1,
                    }}
                >
                    {/* Load More Messages Button */}
                    {hasMoreMessages && (
                        <Box 
                            sx={{ 
                                display: 'flex', 
                                justifyContent: 'center', 
                                mb: 2 
                            }}
                        >
                            <Button
                                disabled={isLoadingMore}
                                onClick={handleLoadMoreMessages}
                                sx={{
                                    minWidth:215,
                                    color:'#333 !important',
                                    border:'1px solid #ababab',
                                    borderRadius:8,
                                    fontWeight:500,
                                    fontSize:'.875rem',
                                    whiteSpace:'nowrap',
                                }}
                            >
                                {isLoadingMore ? (
                                    <LoadingSpinner compact />
                                ) : (
                                    'Find older messages'
                                )}
                            </Button>
                        </Box>
                    )}
                    
                    {/* No messages placeholder */}
                    {messages.length === 0 && !loadingMessages && (
                        <Box
                            sx={{
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                gap: 2,
                                opacity: 0.6,
                                my: 4,
                            }}
                        >
                            <Typography variant="body1">
                                No messages yet. Start a conversation!
                            </Typography>
                        </Box>
                    )}
                    
                    {/* Message list with date dividers */}
                    {renderMessages()}
                    
                    {/* Invisible element to scroll to bottom */}
                    <div ref={bottomRef} />
                </Box>

                {/* Message input area */}
                <Box
                    sx={{
                        p: 2,
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        borderTop: '1px solid #EDEDED',
                        backgroundColor: '#fff',
                    }}
                >
                    <TextField
                        fullWidth
                        multiline
                        maxRows={4}
                        variant="outlined"
                        value={messageToSend}
                        placeholder="Type a message..."
                        onChange={(e) => setMessageToSend(e.target.value)}
                        onKeyDown={handleKeyPress}
                        InputProps={{
                            sx: {
                                borderRadius: 4,
                                backgroundColor: '#f5f5f5',
                            },
                        }}
                    />
                    <IconButton
                        color="primary"
                        disabled={!isSendingAllowed || !messageToSend.trim()}
                        onClick={handleSendMessage}
                        sx={{
                            ml: 2,
                            backgroundColor: colors.info.main,
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: colors.info.main,
                            },
                            '&.Mui-disabled': {
                                backgroundColor: '#E0E0E0',
                                color: '#A0A0A0',
                            },
                        }}
                    >
                        <Send />
                    </IconButton>
                </Box>
            </Box>

            {/* Message Options Menu */}
            <MoreOptionsMenu
                open={Boolean(anchorEl)}
                menuAlign={anchorEl}
                onClose={handleMenuClose}
            >
                <BasicMenuItem
                    title='Copy'
                    onClick={handleCopyMessage}
                    BMIcon={ContentCopy}
                />
                
                {/* Only show delete option for user's own messages */}
                {selectedMessage && selectedMessage?.senderId === user?.uid && (
                    <BasicMenuItem
                        title='Delete'
                        onClick={handleOpenDeleteConfirmation}
                        BMIcon={Delete}
                    />
                )}
                
                {/* Only show report option for other user's messages */}
                {selectedMessage && selectedMessage?.senderId !== user?.uid && (
                    <ReportMenuItem
                        contentType='message'
                        disabled={!user?.uid || user?.uid === selectedMessage?.senderId}
                        contentId={`${chatId}::${selectedMessage?.id}`}
                    />
                )}
            </MoreOptionsMenu>

            {/* Confirmation Dialog for Delete/Report */}
            <WarnedAction
                color='error'
                open={isConfirmationOpen}
                onClose={() => setIsConfirmationOpen(false)}
                onClick={handleConfirmAction}
                warningTitle='Delete Message'
                warningDescription='Are you sure you want to delete this message? This action cannot be undone.'
                actionTitle='Delete'
            />

            <UserProfileSheet
                open={isViewingUserProfile && isMobile}
                onClose={() => setIsViewingUserProfile(false)}
                customTitle={`${otherUser?.personal?.firstName || 'User'}'s Profile`}
                userId={otherUserId}
                userData={otherUser}
                sideSwipeMobile
            />

            <RentalPreview
                onlyModal={{
                    open:isViewingRequest,
                    onClose:() => setIsViewingRequest(false)
                }}
                reservationId={reservationId}
                reservationInfo={reservation}
                otherUser={otherUser}
                viewingRole={reservation?.renter === user?.uid ? ReservationViewingRole.Renter : ReservationViewingRole.Host}
            />
        </>
    );
};

export default InChat;