import { Close, Email, MailLock } from "@mui/icons-material";
import { Alert, Box, Collapse, IconButton, TextField, Typography } from "@mui/material";
import { useUserAuthState } from "app/backend/user/auth/reactprovider";
import MKButton from "components/MKButton";
import { useEffect, useState } from "react";
import { CommonAccountStyles } from "../common";
import { useReauth } from "app/sections/Modal/UserAuth/Reauth/context";
import { verifyBeforeUpdateEmail } from "firebase/auth";
import AdaptiveModal from "app/sections/Modal/Adaptive";
import ReauthComponent from "app/sections/Modal/UserAuth/Reauth";
import { isValidEmail } from "app/sections/Modal/UserAuth/SignUp/utils";

const EditEmail = () => {

    const {user} = useUserAuthState();
    const [email, setEmail] = useState(user?.email)
    const [canSave, setCanSave] = useState(false);
    const [loading, setLoading] = useState(false);
    const [reauth, setReauth] = useState(false);
    const [recomp, setRecomp] = useState(false);
    const {requestReauth} = useReauth();

    const checkCanSave = () => {
        return email?.trim() && email?.trim() !== user?.email && isValidEmail(email.trim())
    };

    const handleSave = () => {
        setLoading(true);
        setReauth(true);
        requestReauth(
        ).then(res => {
            setReauth(false);
            verifyBeforeUpdateEmail(
                user, 
                email
            ).then(res => {
                setLoading(false);
                setRecomp(true);
                setCanSave(false);
            })
        });
    }

    useEffect(() => {
        setCanSave(checkCanSave())
    }, [email])
    
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
                    Authorization Complete. There will be a verification sent to your new email to confirm you have access to it. Once verified, you will be logged out.
                </Alert>
            </Collapse>
            <Box
                sx={{
                    mt:2,
                    width:'100%',
                }}
            >
                <div style={{display:'flex',alignItems:'center',}}>
                    <Typography
                        sx={{
                            color:'#000',
                            width:'100%',
                            textAlign:'start',
                            fontWeight:600,
                            fontSize:{xs:'.875rem',lg:'1rem'},
                        }}
                    >
                        Email
                    </Typography>
                    <MailLock sx={{color:'#ababab',mb:.5,}}/>
                </div>
                <TextField
                    placeholder='example@email.com'
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value.trim())
                    }}
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
                description='Enter your password to authenticate this change. Once authenticated, a verification email will be sent to the new email you want to verify.'
            />
        </AdaptiveModal>
    </>)
}

export default EditEmail;