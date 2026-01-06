import { CheckCircle, Close, Email, Info, MailLock, Visibility, VisibilityOff } from "@mui/icons-material";
import { Alert, Box, Collapse, Icon, IconButton, InputAdornment, TextField, Tooltip, Typography } from "@mui/material";
import { useUserAuthState } from "app/backend/user/auth/reactprovider";
import MKButton from "components/MKButton";
import { useEffect, useState } from "react";
import { CommonAccountStyles } from "../common";
import { useReauth } from "app/sections/Modal/UserAuth/Reauth/context";
import { updatePassword, verifyBeforeUpdateEmail } from "firebase/auth";
import AdaptiveModal from "app/sections/Modal/Adaptive";
import ReauthComponent from "app/sections/Modal/UserAuth/Reauth";
import { isValidEmail } from "app/sections/Modal/UserAuth/SignUp/utils";
import { isValidPassword } from "app/sections/Modal/UserAuth/SignUp/utils";

const EditPassword = () => {

    const {user} = useUserAuthState();
    const [pass, setPass] = useState('')
    const [view, setView] = useState(false)
    const [cnfm, setCnfm] = useState('');
    const [canSave, setCanSave] = useState(false);
    const [loading, setLoading] = useState(false);
    const [reauth, setReauth] = useState(false);
    const [recomp, setRecomp] = useState(false);
    const {requestReauth} = useReauth();

    const checkCanSave = () => {
        return isValidPassword(pass.trim()) && cnfm === pass
    };

    const handleSave = () => {
        setLoading(true);
        setReauth(true);
        requestReauth(
        ).then(res => {
            setReauth(false);
            updatePassword(
                user,
                pass,
            ).then(res => {
                setLoading(false);
                setRecomp(true);
                setCanSave(false);
            })
        });
    }

    useEffect(() => {
        setCanSave(checkCanSave())
    }, [pass, cnfm])

    useEffect(() => {
        setTimeout(() => setRecomp(false), 2000)
    }, [recomp])
    
    return (<>
        <Box
            sx={{
                px:2,
                display:'flex',
                flexDirection:'column',
            }}
        >
            <MKButton
                color={canSave && !loading ? 'info' : 'light'}
                disabled={canSave && !loading ? false : true}
                onClick={canSave && !loading ? handleSave : null}
                sx={CommonAccountStyles.MobileSaveButton}
            >
                Save
            </MKButton>
            <Collapse in={recomp} sx={{width:'100%'}}>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setRecomp(false);
                            }}
                        >
                            <Close fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ 
                        width:'100%', 
                        mb: 2,
                        color:'#000',
                        fontWeight:500,
                        fontSize:14,
                    }}
                >
                    Authorization Complete. You have changed your password.
                </Alert>
            </Collapse>
            <Box
                sx={{
                    mt:2,
                    width:'100%',
                }}
            >
                <div style={{display:'flex',alignItems:'center',gap:4,}}>
                    <Typography
                        sx={{
                            color:'#000',
                            textAlign:'start',
                            fontWeight:600,
                            fontSize:{xs:'.875rem',lg:'1rem'},
                        }}
                    >
                        Update Password
                    </Typography>
                    <Tooltip
                        placement='right'
                        title={user?.reloadUserInfo?.passwordUpdatedAt?`Last updated on ${(new Date(user?.reloadUserInfo?.passwordUpdatedAt)).toLocaleDateString()} at ${(new Date(user?.reloadUserInfo?.passwordUpdatedAt)).toLocaleTimeString()}` : 'Never previously updated.'}
                        style={{
                            whiteSpace:'nowrap'
                        }}
                    >
                        <Info sx={{cursor:'help'}}/>
                    </Tooltip>
                    <MailLock 
                        sx={{
                            color:'#ababab',
                            mb:.5,
                            ml:'auto',
                        }}
                    />
                </div>
                <TextField
                    type={view ? 'text' : 'password'}
                    placeholder='New password'
                    helperText='At least 8 characters, 1 number & 1 special character.'
                    value={pass}
                    onChange={(e) => setPass(e.target.value.trim())}
                    variant="outlined"
                    sx={{
                        mt: 1,
                        width: "100%",
                    }}
                    inputProps={{
                        sx: {
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            fontWeight: 500,
                            fontSize: { xs: ".875rem", lg: "1rem" },
                            color: "#000",
                        },
                    }}
                    FormHelperTextProps={{
                        sx: {
                            mt:.75,
                            ml:1,
                            fontWeight:400,
                        }
                    }}
                    InputProps={{
                        endAdornment: pass && (
                            <InputAdornment>
                                <IconButton
                                    sx={{
                                        mr:-1.5,
                                    }}
                                    size='medium'
                                    onClick={() => setView(!view)}
                                >
                                    {view ? 
                                        <Visibility/> :
                                        <VisibilityOff />
                                    }
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <div style={{display:'flex',alignItems:'center',gap:4,marginTop:20}}>
                    <Typography
                        sx={{
                            color:'#000',
                            textAlign:'start',
                            fontWeight:600,
                            fontSize:{xs:'.875rem',lg:'1rem'},
                        }}
                    >
                        Confirm Password
                    </Typography>
                    <CheckCircle 
                        sx={{
                            color:'#ababab',
                            mb:.5,
                            ml:'auto',
                        }}
                    />
                </div>
                <TextField
                    type={view ? 'text' : 'password'}
                    placeholder='Confirm password'
                    variant="outlined"
                    helperText='Both passwords must match.'
                    value={cnfm}
                    onChange={(e) => setCnfm(e.target.value.trim())}
                    sx={{
                        mb:2,
                        mt: 1,
                        width: "100%",
                    }}
                    inputProps={{
                        sx: {
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            fontWeight: 500,
                            fontSize: { xs: ".875rem", lg: "1rem" },
                            color: "#000",
                        },
                    }}
                    FormHelperTextProps={{
                        sx: {
                            mt:.75,
                            ml:1,
                            fontWeight:400,
                        }
                    }}
                />
            </Box>
            <Box
                sx={{
                    mt:2,
                    gap:2,
                    width:'100%',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'end',
                }}
            >
                <MKButton
                    color={canSave && !loading ? 'info' : 'light'}
                    disabled={canSave && !loading ? false : true}
                    onClick={canSave && !loading ? handleSave : null}
                    sx={CommonAccountStyles.DesktopSaveChanges}
                >
                    Save Changes
                </MKButton>
            </Box>
        </Box>

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
                description='Enter your old password to authenticate this change. Once authenticated, your password will be changed.'
            />
        </AdaptiveModal>
    </>)
}

export default EditPassword;