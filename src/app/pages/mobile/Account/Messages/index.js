import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Box, Typography, IconButton, Menu, MenuItem, Checkbox, useMediaQuery } from '@mui/material';
import { Tune, ChatBubbleOutlineOutlined, ForumOutlined } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { getUser } from 'app/backend/db/user';
import { Helmet } from 'react-helmet-async';
import { useUserAuthState } from 'app/backend/user/auth/reactprovider';
import { useChatContext } from './provider';
import MessagePreview from 'app/sections/Account/Message';
import { LoadingSpinner } from 'app/utils/loading/component';
import Filler from 'app/sections/Filler';
import InChat from './inchat';

const Messages = () => {
    const navigate = useNavigate();
    const { chatId } = useParams();
    const location = useLocation();
    const { user, userImpl } = useUserAuthState();
    const { chats, loading, activeChat, setActiveChat, setActiveChatById } = useChatContext();
    
    const [otherUsers, setOtherUsers] = useState({});
    const [msgFilterAnchor, setMsgFilterAnchor] = useState(null);
    const [messageFiltersOpen, setMessageFiltersOpen] = useState(false);
    const [includeBlockedUsers, setIncludeBlockedUsers] = useState(false);
    
    const isMobile = useMediaQuery(`(max-width:991px)`);

    // Set active chat when chatId changes
    useEffect(() => {
        if (chatId) {
            setActiveChatById(chatId);
        }
        else {
            setActiveChat(null)
        }
    }, [chatId]);

    // Fetch other users' data
    useEffect(() => {
        const fetchOtherUsers = async () => {
            const newOtherUsers = {};
            
            await Promise.all(
                chats.map(async (chat) => {
                    if (!otherUsers[chat.otherUserId]) {
                        const otherUserData = await getUser(chat.otherUserId);
                        newOtherUsers[chat.otherUserId] = otherUserData;
                    }
                })
            );
            
            setOtherUsers(prev => ({ ...prev, ...newOtherUsers }));
        };
        
        fetchOtherUsers();
    }, [chats]);

    const openMessageFilters = (e) => {
        setMsgFilterAnchor(e.currentTarget);
        setMessageFiltersOpen(true);
    };

    // Format the last message for display
    const formatLastMessage = (chat) => {
        if (!chat.latestMessage) {
            return { text: 'Send a Message' };
        }
        
        return {
            text: chat.latestMessage.message,
            time: chat.latestMessage.timestamp.seconds*1000,
        };
    };

    const visibleChats = includeBlockedUsers
    ? chats
    : chats.filter(chat => !userImpl?.extra?.blocked?.includes(chat.otherUserId));

    return (
        <>
            <Helmet>
                <title>SpareLot | Messages</title>
                <meta name="description" content="Message renters and hosts through SpareLot messaging." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
    
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    minHeight: 'inherit',
                    flexGrow: 1,
                }}
            >
                {/* Chat List Section */}
                <AnimatePresence>
                    {(!chatId || !isMobile) && (
                        <motion.div
                            key={location}
                            initial={activeChat ? { x: isMobile ? '-100%' : 0, opacity: isMobile ? 0 : 1 } : {}}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: isMobile ? '-100%' : 0, opacity: isMobile ? 0 : 1 }}
                            transition={{ duration: 0.2 }}
                            style={{
                                minWidth: isMobile ? '100%' : 400,
                                maxWidth: isMobile ? '100%' : 400,
                                display: isMobile ? chatId ? 'none' : 'block' : 'block',
                                borderRight: '1px solid #ededed',
                                transition: !isMobile && 'all .2s ease-in-out'
                            }}
                        >
                            <Box
                                sx={{
                                    gap: 1.5,
                                    px: 2,
                                    height: 75,
                                    display: 'flex',
                                    fontSize: 20,
                                    alignItems: 'center',
                                    borderBottom: '1px solid #ededed',
                                }}
                            >
                                <Typography variant="h3">
                                    Messages
                                </Typography>

                                <IconButton
                                    size='medium'
                                    sx={{
                                        ml: 'auto',
                                        bgcolor: '#efefef !important',
                                        display: chats?.length ? 'flex' : 'none',
                                    }}
                                    onClick={openMessageFilters}
                                >
                                    <Tune sx={{ color: '#000' }} />
                                </IconButton>
                            </Box>

                            {visibleChats.length > 0 ? (
                                visibleChats.map((chat, idx) => {
                                    const otherUser = otherUsers[chat.otherUserId];

                                    return (
                                        <MessagePreview
                                            key={idx}
                                            active={chat.id === chatId}
                                            otherUserId={chat.otherUserId}
                                            userName={`${otherUser?.personal?.firstName || 'User'} ${otherUser?.personal?.lastName || ''}`}
                                            lastMessage={formatLastMessage(chat)}
                                            unreadMessages={chat.unreadCount > 0}
                                            profileImage={otherUser?.profile?.avatar}
                                            onClick={() => navigate(`/messages/${chat.id}`)}
                                        />
                                    );
                                })
                            ) : (<Box sx={{mt:3}}>
                                {loading ? (
                                    <LoadingSpinner />
                                ) : (
                                    <Box
                                        sx={{
                                            width:'100%',
                                            px:2,
                                        }}
                                    >
                                        <Filler
                                            LargeIcon={ChatBubbleOutlineOutlined}
                                            title={'No chats'}
                                            desc={'You have no chats with other SpareLot users. Contact users from their profiles or listings.'}
                                        />
                                    </Box>
                                )}
                            </Box>)}
                        </motion.div>
                    )}
                </AnimatePresence>
    
                {/* In-Chat Section */}
                <AnimatePresence>
                    {(chatId) && (
                        <motion.div
                            key="in-chat"
                            initial={{ x: isMobile ? '100%' : 0, opacity: isMobile ? 0 : 1 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: isMobile ? '100%' : 0, opacity: isMobile ? 0 : 1 }}
                            transition={{ duration: 0.2 }}
                            style={{
                                width: '100%',
                                display: { xs: chatId ? 'block' : 'none', lg: 'block' },
                            }}
                        >
                            <InChat />
                        </motion.div>
                    )}
                    {!chatId && !isMobile && chats.length &&
                        <Box
                            sx={{
                                p:4,
                                width:'100%',
                                display:'flex',
                                justifyContent:'center',
                            }}
                        >
                                <Filler
                                    LargeIcon={ForumOutlined}
                                    title={'No chat selected'}
                                    desc={'You have not selected a chat. Select a chat to begin chatting with other users on SpareLot.'}
                                    sx={{
                                        my: 5,
                                        height: 'fit-content',
                                    }}
                                    childsx={{ maxWidth: '75%' }}
                                />
                        </Box>
                    }
                </AnimatePresence>

                <Menu
                    open={messageFiltersOpen}
                    onClose={() => setMessageFiltersOpen(false)}
                    anchorEl={msgFilterAnchor}
                    style={{
                        padding: '0px 0px !important'
                    }}
                >
                    <MenuItem
                        sx={{
                            px: 2,
                            py: 0,
                            color: '#000',
                            fontWeight: 500,
                            fontSize: '.9rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                        }}
                        onClick={() => setIncludeBlockedUsers(!includeBlockedUsers)}
                    >
                        Show Blocked Users
                        <Checkbox checked={includeBlockedUsers} />
                    </MenuItem>
                </Menu>
            </Box>
        </>
    );        
};

export default Messages;