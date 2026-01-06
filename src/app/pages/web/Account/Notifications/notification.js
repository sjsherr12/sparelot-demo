import { Circle, Delete, MarkChatReadOutlined, MoreVert } from "@mui/icons-material"
import { useUserAuthState } from "app/backend/user/auth/reactprovider"
import AdaptiveModal from "app/sections/Modal/Adaptive"
import { BasicMenuItem } from "app/sections/More"
import { MoreOptionsMenu } from "app/sections/More"
import getTimeAgo from "app/utils/date/timeago"
import colors from "assets/theme/base/colors"
import { deleteDoc, doc, getFirestore, setDoc } from "firebase/firestore"
import { useState } from "react"

const { Box, Icon, Typography } = require("@mui/material")
const { getNotificationInfo } = require("app/utils/listings/utils")

const Notification = ({
    notification,
    markAsRead,
}) => {
    const {user} = useUserAuthState();
    const notificationInfo = getNotificationInfo(notification)
    const [open, setOpen] = useState(false);
    const [mo, setMO] = useState(false);
    const [ma, setMA] = useState(null);

    const handleClose = async () => {
        setOpen(false);
        if (!notification.read) {
            notification.read = true;
            const markAsRead_res = await setDoc(
                doc(getFirestore(), `/users/${user?.uid}/notifications`, `${notification?.id}`), 
                { read: true,}, 
                { merge:true, },
            );
        }
    }

    const handleDelete = async () => {
        await deleteDoc(
            doc(getFirestore(), `/users/${user?.uid}/notifications`, `${notification?.id}`)
        )
        notification=undefined;
    }


    return (<>
        <Box
            sx={{
                p:1.5,
                gap:2,
                width:'100%',
                display:'flex',
                cursor:'pointer',
                userSelect:'none',
                alignItems:'center',
                '&:active':{scale:.98},
                transition:'all .15s ease-in-out',
                borderRadius:2,
                '&:hover':{bgcolor:notification?.read?'rgba(0,0,0,.025)':'brightness(75%)'},
                bgcolor: !notification?.read && 'rgba(46,136,255,.05)',
                border: `1px solid ${notification?.read ? '#ededed' : 'rgba(46,137,255,.2)'}`,
            }}
            onClick={() => setOpen(true)}
        >
            <Icon
                sx={{
                    width:42,
                    height:42,
                    boxShadow:1,
                    borderRadius:16,
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    border:'1px solid #ededed',
                    bgcolor:'#fff',
                }}
            >
                <notificationInfo.icon
                    sx={{
                        scale:1.2,
                        color:notificationInfo?.color,
                    }}
                />
            </Icon>

            <Box>
                <Box
                    sx={{
                        gap:.5,
                        display:'flex',
                        alignItems:'center',
                    }}
                >
                    <Icon
                        sx={{
                            mb:.5,
                            ml:-.5,
                            height:20,
                            scale:.66,
                            color:colors.info.main,
                        }}
                    >
                        <Circle />
                    </Icon>
                    <Typography
                        sx={{
                            color:'#333',
                            fontWeight:550,
                            fontSize:{xs:'.875rem',lg:'1rem'},
                            lineHeight:'25px',
                        }}
                    >
                        {notificationInfo.title} 
                    </Typography>

                </Box>

                <Typography
                    sx={{
                        color:'#737373',
                        fontWeight:500,
                        lineHeight:'20px',
                        fontSize:{xs:'.75rem',lg:'.875rem'},
                    }}
                >
                    {notificationInfo.sub}
                </Typography>
            </Box>

            <Box
                sx={{
                    gap:1,
                    ml:'auto',
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'center',
                    alignSelf:'stretch',
                }}
            >
                <Typography
                    sx={{
                        fontWeight:550,
                        fontSize:{xs:'.66rem',lg:'.75rem'},
                        color:'#737373'
                    }}
                >
                    {getTimeAgo(notification?.created)}
                </Typography>
                <Icon
                    sx={{
                        color:'#000',
                        width:32,
                        height:32,
                        borderRadius:16,
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center',
                        '&:hover':{
                            bgcolor:'#efefef',
                        }
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        setMA(e.currentTarget)
                        setMO(true)
                    }}
                >
                    <MoreVert />
                </Icon>
            </Box>
        </Box>

        <AdaptiveModal
            open={open}
            onClose={handleClose}
            maxWidth={500}
            title={notificationInfo?.title}
        >
            <Box
                sx={{
                    gap:1,
                    width:'100%',
                    display:'flex',
                    flexDirection:'column',
                }}
            >
                <Typography
                    sx={{
                        color:'#333',
                        fontWeight:550,
                        fontSize:{xs:'.875rem',lg:'1rem'},
                    }}
                >
                    {notificationInfo?.sub}
                </Typography>
                <Typography
                    sx={{
                        color:'#737373',
                        fontWeight:500,
                        fontSize:{xs:'.75rem',lg:'.875rem'},
                    }}
                >
                    {notificationInfo?.desc}
                </Typography>
            </Box>
        </AdaptiveModal>

        <MoreOptionsMenu
            open={mo}
            onClose={() => setMO(false)}
            menuAlign={ma}
        >
            <BasicMenuItem
                title='Mark as read'
                BMIcon={MarkChatReadOutlined}
                onClick={handleClose}
                disabled={notification?.read}
            />
            <BasicMenuItem
                title='Delete'
                BMIcon={Delete}
                onClick={handleDelete}
            />
        </MoreOptionsMenu>
    </>)
}

export default Notification;