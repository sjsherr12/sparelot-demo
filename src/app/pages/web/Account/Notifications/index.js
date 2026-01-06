import React, { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  limit, 
  startAfter,
  onSnapshot,
  getDocs,
  setDoc,
  doc,
} from 'firebase/firestore';
import { useUserAuthState } from 'app/backend/user/auth/reactprovider';
import { Alert, Badge, Box, Button, Icon, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Check, NotificationsOutlined } from '@mui/icons-material';
import { getFirestore } from 'firebase/firestore';
import Notification from './notification';
import colors from 'assets/theme/base/colors';
import Hr from 'app/utils/Hr';
import { LoadingComponent } from 'app/utils/loading/component';
import { LoadingSpinner } from 'app/utils/loading/component';

const Notifications = ({removeGetOlderNotifications}) => {
    const [newNotifications, setNewNotifications] = useState([]);
    const [oldNotifications, setOldNotifications] = useState([]);
    const [lastDoc, setLastDoc] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [loadingOld, setLoadingOld] = useState(false);
    const { user } = useUserAuthState();
    const db = getFirestore();

    useEffect(() => {
        if (!user) return;
        const notificationsRef = collection(db, `users/${user.uid}/notifications`);
        const q = query(notificationsRef, where('read', '==', false), orderBy('created', 'desc'));
    
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const newNotifs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
            setNewNotifications((prevNotifs) => {
                const merged = [...newNotifs, ...prevNotifs.filter(n => n.read)];
                return merged;
            });
        });
    
        return () => unsubscribe();
    }, [user]);

    const loadOlderNotifications = async () => {
        if (!user || !hasMore) return;
        setLoadingOld(true);
        const notificationsRef = collection(db, `users/${user.uid}/notifications`);
        let q = query(notificationsRef, orderBy('created', 'desc'), limit(3));
        
        if (lastDoc) q = query(notificationsRef, orderBy('created', 'desc'), startAfter(lastDoc), limit(3));

        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
            const olderNotifs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setOldNotifications(prev => [...prev, ...olderNotifs]);
            setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
        } else {
            setHasMore(false);
        }
        setLoadingOld(false);
    };

    return (
        <Box
            sx={{
                my:2,
                width:'100%',
                display:'flex',
                flexDirection:'column',
            }}
        >
            <Box
                sx={{
                    px:2,
                    gap:2,
                    width:'100%',
                    display:'flex',
                    alignItems:'center',
                    flexDirection:'column',
                }}
            >
            {newNotifications.length ? (<>
                {newNotifications?.map((ntf, idx) => (
                    <Notification notification={ntf} />
                ))}
            </>) : (
                <Box
                    sx={{
                        width:'100%',
                        display:'flex',
                        alignItems:'center',
                        flexDirection:'column',
                    }}
                >
                    <Icon
                        sx={{
                            width:48,
                            height:48,
                            display:'flex',
                            borderRadius:8,
                            bgcolor:'#efefef',
                            alignItems:'center',
                            justifyContent:'center',
                            boxShadow:'0px 2px 2px rgba(0,0,0,.25)'
                        }}
                    >
                        <Check 
                            sx={{
                                scale:1.25,
                                color:colors.info.main,
                            }}
                        />
                    </Icon>
                    <Typography
                        sx={{
                            mt:2,
                            fontWeight:500,
                            textAlign:'center',
                            fontSize:{xs:'1rem',lg:'1.2rem'},
                        }}
                    >
                        You’re all caught up!
                    </Typography>
                    <Typography
                        sx={{
                            textAlign:'center',
                            fontSize:{xs:'.75rem',lg:'.875rem'},
                            color:'#737373',
                            fontWeight:450,
                        }}
                    >
                        We have no new notifications for you. Good work!
                    </Typography>
                </Box>
            )}
            <Box
                sx={{
                    p:2,
                    mt:2,
                    gap:2,
                    width:'100%',
                    borderRadius:2,
                    alignItems:'center',
                    flexDirection:'column',
                    border:'1px solid #ededed',
                    display:removeGetOlderNotifications?'none':'flex',
                }}
            >
                <Box
                    sx={{
                        gap:2,
                        width:'100%',
                        display:'flex',
                        alignItems:'center',
                    }}   
                >
                    <Hr />
                    <Button
                        disabled={loadingOld || !hasMore}
                        sx={{
                            minWidth:215,
                            color:'#333 !important',
                            border:'1px solid #ababab',
                            borderRadius:8,
                            fontWeight:500,
                            fontSize:'.875rem',
                            whiteSpace:'nowrap',
                        }}
                        onClick={loadOlderNotifications}
                    >
                        {loadingOld ? (
                            <LoadingSpinner compact />
                        ) : (<>
                            {hasMore ? 'Find older notifications' : 'No older notifications'}
                        </>)}
                    </Button>
                    <Hr />
                </Box>
                {oldNotifications?.map((ntf, idx) => (
                    <Notification notification={ntf} />
                ))}
            </Box>
            </Box>
        </Box>
    );
};

export default Notifications;
