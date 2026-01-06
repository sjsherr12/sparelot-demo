import { Badge, Box, Icon, Menu, styled, Typography } from "@mui/material";
import { useUserAuthState } from "app/backend/user/auth/reactprovider";
import { Avatar } from "@mui/material";
import MKBox from "components/MKBox";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import MKTypography from "components/MKTypography";
import { Add, AddCircleOutline, ArrowDropDown, Bookmark, BookmarkAdded, BookmarkAddedOutlined, BookmarkBorder, Close, ExpandMore, ForumOutlined, KeyboardArrowDown, KeyboardArrowUp, Logout, ManageAccountsOutlined, MenuOutlined, NotificationsActive, NotificationsNone, OpenInNew, SupervisorAccount, SupervisorAccountOutlined, SwapHoriz } from "@mui/icons-material";
import Hr from "app/utils/Hr";
import { collection, getFirestore, limit, onSnapshot, query, where } from "firebase/firestore";
import Notifications from "app/pages/web/Account/Notifications";

const UserButton = styled('a')`
    color:#000;
  font-weight: 450;
  height:44px;
  text-align: left;
  width: 100%;
  font-size: 1rem;
  padding-left: 10px;
  padding-top:10px;
  padding-bottom:10px;
  text-transform: none;
  background-color: inherit;
  border: none;
  font-family: Inter, sans-serif;
  border-radius: 0;
  display: flex;
  align-items: center;
  user-select: none;
  &:hover {
    background-color: #efefef;
    cursor: pointer;
  }
`;

const Overlay = styled('div')(({ open }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
    display: 'block',
    opacity: open ? 1 : 0,
    pointerEvents: open ? 'auto' : 'none',
    transition: 'all 0.25s ease-out',
}));

const AccountChildren = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {user, userImpl, logout} = useUserAuthState();
    const [accountChildren, setAccountChildren] = useState(false);
    const [notificationWindow, setNotificationWindow] = useState(false);
    const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
    
    const isHosting = location?.pathname.startsWith('/hosting');

    const PotentialBadge = ({ children }) => (
        hasUnreadNotifications
            ? 
            <Badge
                badgeContent=" " 
                color="info"
            >
                {children}
            </Badge>
            : children
    );
    const NotificationIcon = hasUnreadNotifications ? NotificationsActive : NotificationsNone;

    useEffect(() => {
        if (!user?.uid) return;

        const notificationsRef = collection(getFirestore(), `users/${user.uid}/notifications`);
        const q = query(notificationsRef, where("read", "==", false), limit(1));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            setHasUnreadNotifications(!snapshot.empty);
        });

        return () => unsubscribe();
    }, [user]);

    return (
        <>
            <Overlay
                open={accountChildren || notificationWindow}
                id='Overlay'
                onClick={() => {
                    setNotificationWindow(false)
                    setAccountChildren(false)
                }}
            />
            <MKBox
                sx={{
                    gap:2,
                    position:'relative',
                    zIndex:1000,
                    display:'flex',
                    alignItems:'center',
                }}
            >
                <PotentialBadge>
                    <Box
                        sx={Styles.NavbarComponent}
                        onClick={(e) => {
                            setAccountChildren(false);
                            setNotificationWindow(!notificationWindow)
                        }}
                    >
                        <Icon
                            sx={{
                                width:28,
                                height:28,
                                display:'flex',
                                alignItems:'center',
                                justifyContent:'center',
                            }}
                        >
                            <NotificationIcon 
                                sx={{
                                    scale:1.25,
                                }}
                            />
                        </Icon>
                    </Box>
                </PotentialBadge>

                <Avatar
                    src={user.photoURL}
                    sx={{
                        boxShadow:2,
                        width:40,
                        height:40,
                        cursor:'pointer',
                        
                        '& img': {
                            width:'100%',
                            height:'100%',
                            objectFit:'cover',
                            userDrag: 'none', // For modern browsers
                            WebkitUserDrag: 'none' // For Safari
                        }
                    }}
                    onClick={() => {
                        setNotificationWindow(false);
                        setAccountChildren(!accountChildren)
                    }}
                />

                <MKBox
                    key={notificationWindow}
                    sx={{
                        position:'absolute',
                        backgroundColor:'#fff',
                        width:500,
                        borderRadius:2,
                        py:1.5,
                        border:'1px solid #ededed',
                        top:'calc(8px + 50px)',
                        right:52,
                        opacity:notificationWindow?1:0,
                        pointerEvents:notificationWindow?'auto':'none',
                        transition:'all .25s ease-out',
                        fontSize:20,
                        boxShadow:`0px 0px 16px 0px rgba(100,100,100,.25)`,
                        zIndex:2,
                    }}
                >
                    <Notifications removeGetOlderNotifications />
                </MKBox>
                
                <MKBox
                    sx={{
                        position:'absolute',
                        backgroundColor:'#fff',
                        width:225,
                        borderRadius:2,
                        py:1.5,
                        border:'1px solid #ededed',
                        top:'calc(8px + 50px)',
                        right:0,
                        opacity:accountChildren?1:0,
                        pointerEvents:accountChildren?'auto':'none',
                        transition:'all .25s ease-out',
                        fontSize:20,
                        boxShadow:`0px 0px 16px 0px rgba(100,100,100,.25)`,
                        zIndex:2,
                    }}
                >
                    <UserButton
                        href={`/profile/${user?.uid}`}
                        target='_blank'
                    >
                        Profile
                        <OpenInNew sx={{ml:'auto',mr:1, height:25,mt:0,}}/>
                    </UserButton>
                    <UserButton
                        href='/account'
                    >
                        Account
                        <ManageAccountsOutlined sx={{ml:'auto',mr:1, height:25,mt:0,}}/>
                    </UserButton>
                    <UserButton
                        href='/account/notifications/view'
                    >
                        {`Notifications`}
                        <NotificationIcon sx={{ml:'auto',mr:1, height:25,mt:0,}}/>
                    </UserButton>
                    <Hr sx={{my:1}}/>
                    <UserButton
                        href='/messages'
                    >
                        Messages
                        <ForumOutlined sx={{ml:'auto',mr:1, height:25,mt:0,}}/>
                    </UserButton>
                    <UserButton
                    href='/saved'
                    >
                        Saved Spaces
                        <BookmarkAddedOutlined sx={{ml:'auto',mr:1, height:25,mt:0,}}/>
                    </UserButton>
                    <UserButton
                        href='/account/rentals/active'
                    >
                        Rental Spaces
                        <SupervisorAccountOutlined sx={{ml:'auto',mr:1, height:25,mt:0,}}/>
                    </UserButton>
                    <UserButton
                        href={isHosting ? '/' : '/hosting/operations/earnings'}
                    >
                        {isHosting ? 'Switch to Renting' : 'Switch to Hosting'}
                        <SwapHoriz sx={{ml:'auto',mr:1, height:25,mt:0,}}/>
                    </UserButton>
                    <UserButton
                        href='/hosting/listings/unpublished'
                    >
                        List a Space
                        <AddCircleOutline sx={{ml:'auto',mr:1, height:25,mt:0,}}/>
                    </UserButton>
                    <Hr sx={{my:1}}/>
                    <UserButton
                        onClick={() => {
                            logout();
                            window.location.reload();
                        }}
                    >
                        Logout
                        <Logout sx={{ml:'auto',mr:1, height:25,mt:0,}}/>
                    </UserButton>
                </MKBox>
            </MKBox>
        </>
    )
}

export default AccountChildren;

const Styles = {
    NavbarComponent: {
        width:44,
        height:44,
        gap:1,
        cursor:'pointer',
        boxShadow:1,
        borderRadius:16,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        transition:'all .25s ease',
        '&:hover':{
            bgcolor:'rgba(0,0,0,.05)',
        },
        '&:active':{
            bgcolor:'rgba(0,0,0,.05)'
        },
        border:'1px solid #ededed',
        boxShadow:'0px 2px 2px rgba(0,0,0,0.05)',
    }
}