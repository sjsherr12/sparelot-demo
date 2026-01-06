import { useUserAuthState } from "app/backend/user/auth/reactprovider";
import { EmailAuthProvider, getAuth, getRedirectResult, GoogleAuthProvider, signInWithPopup, signInWithRedirect, unlink } from "firebase/auth";

import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Avatar,
  Icon,
  Snackbar
} from '@mui/material';
import { 
  Google as GoogleIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  MoreVert,
  Info,
  LinkOff,
  Add,
  ArrowForward,
  Check
} from '@mui/icons-material';
import { MoreOptionsMenu } from "app/sections/More";
import { BasicMenuItem } from "app/sections/More";
import AdaptiveModal from "app/sections/Modal/Adaptive";
import { useReauth } from "app/sections/Modal/UserAuth/Reauth/context";
import ReauthComponent from "app/sections/Modal/UserAuth/Reauth";
import { LoadingSpinner } from "app/utils/loading/component";
import colors from "assets/theme/base/colors";

const ConnectedAccounts = () => {
    const { user } = useUserAuthState();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const {requestReauth} = useReauth();
    const [reauth, setReauth] = useState(false);
    const [IDtoUL, setIDtoUL] = useState('')
    const [status, setStatus] = useState('');
    const [MO, setMO] = useState('');
    const [MA, setMA] = useState(false);

    const availableProviders = [
        {
            id: 'password',
            name: 'Password',
            logo: 'https://cdn-icons-png.flaticon.com/512/1804/1804429.png',
            provider: EmailAuthProvider,
            canBeRemoved:false,
        },
        {
            id: 'google.com',
            name: 'Google',
            logo: 'https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png',
            provider: GoogleAuthProvider,
            canBeRemoved:true,
        }
    ];

    const connectedProviders = user?.providerData || [];

    const handleRemoveProvider = (providerId) => {
        setLoading(true);
        setReauth(true);
        requestReauth(   
        ).then(res => {
            setReauth(false);
            if (user?.providerData?.length <= 1) {
                setStatus('You cannot unlink your only authentication method.')
            }
            unlink(
                user,
                providerId,
            ).then(res => {
                setLoading(false);
                const extra = availableProviders.find((prv => prv.id === providerId));
                setStatus(`You have successfully unlinked your ${extra.name} login provider.`);
            })
        }).catch(err => {

        })
    };

    return (
        <Box
            sx={{
                px:2,
                gap:2,
                display:'flex',
                flexDirection:'column',
            }}
        >
            {connectedProviders.map((provider, idx) => {
                const extra = availableProviders.find((prv => prv.id === provider?.providerId));
                const isBeingRemoved = loading && IDtoUL===provider.providerId;
                return (<>
                    <Box
                        key={idx}
                        sx={{
                            p:2,
                            pr:(isBeingRemoved*1.5)+.5,
                            gap:3,
                            width:'100%',
                            display:'flex',
                            alignItems:'center',
                            border:'1px solid #ededed',
                            borderRadius:2,
                        }}
                    >
                        <Avatar
                            sx={{
                                width:48,
                                height:48,
                            }}
                            src={extra?.logo}
                        />
                        <Box>
                            <Typography
                                sx={{
                                    fontSize:'1rem',
                                    fontWeight:500,
                                    color:'#000'
                                }}
                            >
                                {extra?.name}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize:'.875rem',
                                    fontWeight:400,
                                    color:'#737373'
                                }}
                            >
                                {provider?.email}
                            </Typography>
                        </Box>
                        {extra?.canBeRemoved ?
                            <>
                                {(isBeingRemoved) ?
                                    <div style={{marginLeft:'auto'}}>
                                        <LoadingSpinner compact />
                                    </div>
                                    :
                                    <IconButton
                                        sx={{
                                            ml:'auto',
                                            display: connectedProviders?.length > 1?'flex':'none',
                                        }}
                                        onClick={(e) => {
                                            setMA(e.currentTarget)
                                            setMO(extra?.name)
                                        }}
                                    >
                                        <MoreVert />
                                    </IconButton>
                                }
                            </>

                            :

                            <Icon
                                color='success'
                                fontSize='medium'
                                sx={{
                                    mr:1,
                                    ml:'auto',
                                    height:30,
                                    display:'flex',
                                    alignItems:'center',
                                    justifyContent:'center',
                                }}
                            >
                                <Check />
                            </Icon>
                        }
                    </Box>

                    <MoreOptionsMenu
                        open={MO === extra?.name && connectedProviders?.length > 1}
                        onClose={() => setMO(false)}
                        menuAlign={MA}
                    >
                        <BasicMenuItem
                            title='Unlink'
                            BMIcon={LinkOff}
                            onClick={() => {
                                setIDtoUL(provider.providerId);
                                handleRemoveProvider(provider.providerId)
                            }}
                            disabled={connectedProviders?.length <= 1}
                        />
                    </MoreOptionsMenu>
                </>)
            })}

            <Snackbar
                open={status}
                autoHideDuration={2500}
                onClose={() => setStatus('')}
                message={status}
                anchorOrigin={{
                    vertical:'bottom',
                    horizontal:'center',
                }}
            />

            <AdaptiveModal
                open={reauth}
                onClose={() => {
                    setReauth(false);
                    setLoading(false)
                }}
                title='Reauthenticate'
                maxWidth={500}
            >
                <ReauthComponent
                    description={`Enter your password to authenticate this change. Once authenticated, your ${IDtoUL} login provider will be unlinked.`}
                />
            </AdaptiveModal>
        </Box>
    )
};
export default ConnectedAccounts;