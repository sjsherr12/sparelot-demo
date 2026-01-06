import { Camera, Clear, Close, Create, DeleteForever, TextSnippet, Villa, Work } from "@mui/icons-material";
import { Alert, Avatar, Box, Button, Collapse, Icon, IconButton, Input, Snackbar, TextareaAutosize, TextField, Typography, useMediaQuery } from "@mui/material";
import upload_profile_picture from "app/backend/cloud/upload_profile_picture";
import { useUserAuthState } from "app/backend/user/auth/reactprovider";
import UserProfileSheet from "app/sections/Modal/Profile";
import { EditPFPMenuItem } from "app/sections/More";
import { MoreOptionsMenu } from "app/sections/More";
import Hr from "app/utils/Hr";
import colors from "assets/theme/base/colors";
import MKButton from "components/MKButton";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { get, isBoolean } from "lodash";
import { useEffect, useState } from "react";
import { Sheet } from "react-modal-sheet";
import { Link } from "react-router-dom";
import { CommonAccountStyles } from "../common";
import { BasicMenuItem } from "app/sections/More";
import { updateProfile } from "firebase/auth";
import isStandalone from "isStandalone";

const EditProfile = () => {
    const {user, userImpl, newPfp, setNewPfp, forceReloadUserImpl} = useUserAuthState();
    const [MOMenu, setMOMenu] = useState(false);
    const [anchor, setAnchor] = useState(null);
    const isMobile = useMediaQuery('(max-width:768px)')
    const [c, setc] = useState(false);
    const [loading, setLoading] = useState(false);
    const [bio, setBio] = useState(userImpl?.profile?.fullBio || "");
    const [job, setJob] = useState(userImpl?.profile?.jobWork || "");
    const [res, setRes] = useState(userImpl?.profile?.residence || "");
    const [canSave, setCanSave] = useState(false);
    const [viewProfile, setViewProfile] = useState(false);

    const items = [
        {
            name: 'Biography',
            icon: TextSnippet,
            value: bio,
            setValue: setBio,
        },
        {
            name: 'Occupation',
            icon: Work,
            value: job,
            setValue: setJob,
        },
        {
            name: 'Residence',
            icon: Villa,
            value: res,
            setValue: setRes,
        }
    ]
    
    const checkCanSave = () => {
        return (
            (newPfp !== null && newPfp?.url && newPfp?.b64) ||
            (bio?.trim() && bio?.trim() !== userImpl?.profile?.fullBio && bio?.length <= 150) ||
            (job?.trim() && job?.trim() !== userImpl?.profile?.jobWork && job?.length <= 150) ||
            (res?.trim() && res?.trim() !== userImpl?.profile?.residence && res?.length <= 150)
        );
    };
    
    const handleSave = async () => {
        setc(false);
        setLoading(true);
        if (checkCanSave()) {
            const updatedFields = {}; // Dynamically store only changed fields

            if (bio?.trim() && bio?.trim() !== userImpl?.profile?.fullBio) {
                updatedFields.fullBio = bio.trim();
                if (userImpl?.profile?.fullBio) {
                    userImpl.profile.fullBio = bio.trim();
                }
                setBio(bio.trim())
            }
            if (job?.trim() && job?.trim() !== userImpl?.profile?.jobWork) {
                updatedFields.jobWork = job.trim();
                if (userImpl?.profile?.jobWork) {
                    userImpl.profile.jobWork = job.trim();
                }
                setJob(job.trim())
            }
            if (res?.trim() && res?.trim() !== userImpl?.profile?.residence) {
                updatedFields.residence = res.trim();
                if (userImpl?.profile?.residence) {
                    userImpl.profile.residence = res.trim();
                }
                setRes(res.trim())
            }
    
            if (Object.keys(updatedFields).length > 0) {
                await setDoc(
                    doc(getFirestore(), "users", user?.uid),
                    { profile: updatedFields },
                    { merge: true }
                );
            }
            if (newPfp?.url && newPfp?.b64) {
                const res = await upload_profile_picture({
                    base64String: newPfp.b64
                })
                user.photoURL = newPfp.url
                setNewPfp(null);
            }
            setCanSave(false)
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
        forceReloadUserImpl();
    }, [])

    useEffect(() => {
        setCanSave(checkCanSave())
    }, [newPfp, bio, job, res])
    
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
                    Successfully saved profile info!
                </Alert>
            </Collapse>
            <div 
                style={{
                    position:'relative',
                    marginBottom:48,
                }}
                onClick={(e) => {
                    setAnchor(e.currentTarget)
                    setMOMenu(true);
                }}    
            >
                <Avatar
                    src={newPfp?.url || user?.photoURL}

                    sx={{
                        width:{xs:100,lg:128},
                        height:{xs:100,lg:128},
                        objectFit:'cover',
                        boxShadow:'0px 6px 12px rgba(0,0,0,.05)',
                        '& img':{
                            objectFit:'cover',
                            width:'100%',
                            height:'100%',
                            objectFit:'cover',
                            userDrag: 'none',
                            WebkitUserDrag: 'none'
                        },
                        '&:hover': {
                            filter: 'brightness(50%)',
                            cursor:'pointer',
                        }
                    }}
                />
                <Icon
                    sx={{
                        p:.5,
                        bgcolor:'#fff',
                        color:'#000',
                        position:'absolute',
                        bottom:0,
                        right:0,
                        width:30,
                        height:30,
                        boxShadow:1,
                        borderRadius:4,
                    }}
                >
                    <Create />
                </Icon>
            </div>

            {items.map((it, idx) => (
                <Box
                    sx={{
                        py:2,
                        width:'100%',
                        borderTop:'1px solid #ededed',
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
                        onChange={(e) => it?.setValue && it?.setValue(e.target.value)}
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
                    <Typography
                        sx={{
                            ml:'auto',
                            textAlign:'end',
                            color:'#737373',
                            fontWeight:500,
                            fontSize:{xs:'.75rem',lg:'.875rem'},
                        }}
                    >
                        {it?.value?.length || 0} / 150
                    </Typography>
                </Box>
            ))}
            <Hr />
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
                    color='light'
                    component={isStandalone() ? Box : Link}
                    to={`/profile/${user?.uid}`}
                    target='_blank'
                    onClick={() => {
                        if (isStandalone()) {
                            setViewProfile(true);
                        }
                    }}
                    sx={{
                        py:.5,
                        fontSize:'1rem',
                        fontWeight:500,
                        borderRadius:16,
                        width:{xs:'100%',lg:'fit-content'}
                    }}
                >
                    View Profile
                </MKButton>
                <MKButton
                    color={canSave && !loading ? 'info' : 'light'}
                    disabled={canSave && !loading ? false : true}
                    onClick={canSave && !loading ? handleSave : null}
                    sx={CommonAccountStyles.DesktopSaveChanges}
                >
                    Save Changes
                </MKButton>
            </Box>
            
            <UserProfileSheet
                open={viewProfile}
                onClose={() => setViewProfile(false)}
                userId={user?.uid}
                customTitle='Your Profile'
                sideSwipeMobile
            />

            <MoreOptionsMenu
                open={MOMenu}
                onClose={() => setMOMenu(false)}
                menuAlign={anchor}
            >
                <EditPFPMenuItem />
                <BasicMenuItem
                    title='Remove'
                    BMIcon={Clear}
                    onClick={async () => {
                        setLoading(true);
                        await updateProfile(user, {
                            photoURL: ""
                        })
                        await setDoc(doc(getFirestore(), `/users/${user?.uid}`), {
                            profile: {
                                avatar: ''
                            }
                        }, {merge:true})
                        user.photoURL = ''
                        setLoading(false);
                        setc(true);
                    }}
                    disabled={!user?.photoURL}
                />
            </MoreOptionsMenu>
        </Box>
    )
}

export default EditProfile;