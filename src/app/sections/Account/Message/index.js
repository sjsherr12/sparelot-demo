import React from 'react';
import { Avatar, Badge, Box, Skeleton, Typography} from '@mui/material';
import MKBox from 'components/MKBox';
import MKTypography from 'components/MKTypography';
import colors from 'assets/theme/base/colors';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { useUserAuthState } from 'app/backend/user/auth/reactprovider';
import { Block } from '@mui/icons-material';
import getTimeAgo from 'app/utils/date/timeago';

const MessagePreview = ({ userName, otherUserId, active, profileImage, lastMessage, unreadMessages, onClick, compressedView }) => {

    const {userImpl} = useUserAuthState();
    const isUserBlocked = userImpl?.extra?.blocked?.includes(otherUserId)

    return (
        <Box
            id="participant-info-header"
            sx={{
                px:2,
                gap:2,
                height:75,
                width:'100%',
                display:'flex',
                alignItems:'center',
                justifyContent:'start',
                cursor:'pointer',
                borderBottom:'1px solid #EDEDED',
                bgcolor:active?'#ededed':'#fff',
                overflow:'hidden',
                textOverflow:'ellipsis',
                '&:hover':{
                    bgcolor:'#ededed',
                }
            }}
            onClick={onClick}
        >
            <Avatar
                src={profileImage}
                sx={{
                    width:48,
                    height:48,
                    boxShadow:2,
                    '& img':{
                        objectFit:'cover',
                        width:'100%',
                        height:'100%',
                        objectFit:'cover',
                        userDrag: 'none',
                        WebkitUserDrag: 'none'
                    },
                }}
            />
            {!compressedView && (<>
                <Box
                    sx={{
                        mb: 0.5,
                        maxWidth: '66%',
                    }}
                >
                    <Typography
                        sx={{
                            color:'#000',
                            fontSize: {xs:'1rem',lg:'1.25rem'},
                            fontWeight: unreadMessages&&!isUserBlocked?650:500,
                            lineHeight: {xs:'25px',lg:'30px'},
                        }}
                    >
                        {userName}
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            maxWidth: '100%',
                        }}
                    >
                        <Typography
                            sx={{
                                color: unreadMessages && !isUserBlocked ? '#000' : '#737373',
                                fontWeight: unreadMessages && !isUserBlocked ? 500 : 450,
                                lineHeight: '20px',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                fontSize: { xs: '.9rem', lg: '1rem' },
                                maxWidth: '100%',
                                flexShrink: 1, // allow it to shrink to show the time
                            }}
                        >
                            {!isUserBlocked ? lastMessage?.text : 'You have this user blocked.'}
                        </Typography>

                        {!isUserBlocked && lastMessage?.time && (
                            <Typography
                                sx={{
                                    lineHeight: '20px',
                                    color: '#737373',
                                    marginLeft:'2px',
                                    flexShrink: 0,
                                    whiteSpace: 'nowrap',
                                    fontSize: { xs: '.9rem', lg: '1rem' },
                                }}
                            >
                                · {getTimeAgo(lastMessage.time)}
                            </Typography>
                        )}
                    </Box>
                </Box>
                <Box
                    sx={{
                        ml:'auto',
                        display:unreadMessages&&!isUserBlocked?'flex':'none',
                        bgcolor:colors.info.main,
                        width:8,
                        height:8,
                        borderRadius:4,
                    }}
                />
                <Block
                    sx={{
                        ml:'auto',
                        scale:2,
                        color:'#f00',
                        display:isUserBlocked?'flex':'none',
                    }}
                />
            </>)}
        </Box>
    );
};

export default MessagePreview;