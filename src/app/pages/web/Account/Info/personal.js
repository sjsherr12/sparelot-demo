import { BadgeOutlined, Camera, Close, Create, MarkEmailRead, TextSnippet, Villa, Work } from "@mui/icons-material";
import { Alert, Avatar, Badge, Box, Button, Collapse, Icon, IconButton, Input, Snackbar, TextareaAutosize, TextField, Typography, useMediaQuery } from "@mui/material";
import upload_profile_picture from "app/backend/cloud/upload_profile_picture";
import { useUserAuthState } from "app/backend/user/auth/reactprovider";
import UserProfileSheet from "app/sections/Modal/Profile";
import { EditPFPMenuItem } from "app/sections/More";
import { MoreOptionsMenu } from "app/sections/More";
import Hr from "app/utils/Hr";
import colors from "assets/theme/base/colors";
import MKButton from "components/MKButton";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Sheet } from "react-modal-sheet";
import { Link } from "react-router-dom";
import { CommonAccountStyles } from "../common";
import { updateProfile } from "firebase/auth";

const EditPersonal = () => {
    const {user, userImpl} = useUserAuthState();
    const [c, setc] = useState(false);
    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState(user?.displayName?.split(' ')[0] || '');
    const [lastName, setLastName] = useState(user?.displayName?.split(' ')[1] || '');
    const [canSave, setCanSave] = useState(false);

    const items = [
        {
            name: 'First name',
            icon: BadgeOutlined,
            value: firstName,
            setValue: setFirstName,
        },
        {
            name: 'Last name',
            icon: BadgeOutlined,
            value: lastName,
            setValue: setLastName,
        },
    ]
    
    const checkCanSave = () => {
        return (
            (firstName?.trim() && firstName?.trim() !== user?.displayName?.split(' ')[0]) ||
            (lastName?.trim() && lastName?.trim() !== user?.displayName?.split(' ')[1])
        );
    };
    
    const handleSave = async () => {
        setc(false);
        setLoading(true);
        if (checkCanSave()) {
            const updatedFields = {}; // Dynamically store only changed fields
            if (firstName?.trim() !== user?.displayName?.split(' ')[0]) {
                updatedFields.firstName = firstName.trim();
            }
            if (lastName?.trim() !== user?.displayName?.split(' ')[1]) {
                updatedFields.lastName = lastName.trim();
            }
    
            if (Object.keys(updatedFields).length > 0) {
                await updateProfile(user, {
                    displayName: `${firstName} ${lastName}`,
                })
                await setDoc(
                    doc(getFirestore(), "users", user?.uid),
                    { personal: updatedFields },
                    { merge: true }
                );
            }
            user.displayName = `${firstName} ${lastName}`
            setCanSave(false);
            setc(true);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (c) {
            const t = setTimeout(() => {
                setc(false)
            }, 2000)
            return () => clearTimeout(t)
        }
    }, [c])

    useEffect(() => {
        setCanSave(checkCanSave())
    }, [firstName, lastName])
    
    return (
        <Box
            sx={{
                px:2,
                width:'100%',
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
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
            <Collapse in={c} sx={{width:'100%'}}>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setc(false);
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
                    Successfully saved personal info!
                </Alert>
            </Collapse>

            {items.map((it, idx) => (
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
                            {it?.name}
                        </Typography>
                        <it.icon sx={{color:'#ababab',mb:.5,}}/>
                    </div>
                    <TextField
                        defaultValue=""
                        value={it?.value}
                        onChange={(e) => it?.setValue && it?.setValue(e.target.value.trim())}
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
                            maxLength: 150,
                        }}
                    />
                </Box>
            ))}

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
    )
}

export default EditPersonal;