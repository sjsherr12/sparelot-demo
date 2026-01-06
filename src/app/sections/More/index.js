import styled from "@emotion/styled";
import { Block, Cancel, CheckCircle, Delete, Flag, Publish, RemoveCircleOutline, Share, VisibilityOff, Comment, PhotoCamera, Close, CloseRounded, PhotoCameraOutlined } from "@mui/icons-material";
import { Box, Fade, Icon, IconButton, Menu, MenuItem, Modal, Snackbar, Typography, useMediaQuery } from "@mui/material";
import {  createContext, useContext, useEffect, useRef, useState } from "react";
import ReportModal from "./report";
import ShareModal from "./share";
import BlockUnblockModal from "./block";
import { useUserAuthState } from "app/backend/user/auth/reactprovider";
import UnpublishModal from "./unpublish";
import PublishModal from "./publish";
import DeleteModal from "./delete";
import CancelReservationModal from "./cancel";
import ApproveReservationModal from "./approve";
import DeclineReservationModal from "./decline";
import { LoadingComponent } from "app/utils/loading/component";
import create_chat_for_users from "app/backend/cloud/create_chat_for_users";
import { title_color } from "const";
import { Sheet } from "react-modal-sheet";
import isStandalone from "isStandalone";
import { LoadingSpinner } from "app/utils/loading/component";
import { AnimatePresence, motion } from "framer-motion";
import { userauth_actions, userauth_title } from "../Modal/actions";
import { useModal } from "../Modal/Parent/context";
import AdaptiveModal from "../Modal/Adaptive";
import { useNavigate } from "react-router-dom";
import conditionalNavigation from "conditionalNavigation";

const CustomMoreOptionsMenu = styled(Menu)(({ theme, noZIndex }) => ({
    '& .MuiPaper-root': {
        boxShadow: theme.shadows[16], // Use theme's shadow
        borderRadius: 8, // Example: doubled border-radius
        padding: theme.spacing(1), // Optional: add padding
    },
    zIndex:noZIndex?1:100000,
}));

const CustomMenuItemDesktop = styled(MenuItem)(({ theme, sx }) => ({
    gap:16,
    fontSize: "1rem",
    fontWeight: 500,
    fontFamily: "Inter, sans-serif",
    display:'flex',
    alignItems:'center',
    ...sx,
}));

const CustomMenuItemMobile = styled(MenuItem)(({theme, sx }) => ({
    padding: '12px 16px',
    fontSize: '1rem',
    fontWeight: 450,
    fontFamily: 'Inter, sans-serif',
    alignItems: 'center',
    gap: '8px',
    borderRadius: '0px',
    color: '#000',
    width: '100%',
    backgroundColor: '#efefef',
    borderRadius:'8px',
    ...sx,
}));
const CustomMenuItem = ({ sx, children, disabled, onClick }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isMobile ? (
        <CustomMenuItemMobile disabled={disabled} onClick={onClick} sx={sx}>
            {children}
        </CustomMenuItemMobile>
    ) : (
        <CustomMenuItemDesktop disabled={disabled} onClick={onClick} sx={sx}>
            {children}
        </CustomMenuItemDesktop>
    );
};

const MenuCloseContext = createContext(null);

export const MenuCloseProvider = ({ children, onOpen, onClose }) => {
    return (
        <MenuCloseContext.Provider value={{onOpen, onClose}}>
            {children}
        </MenuCloseContext.Provider>
    );
};

export const useMenuClose = () => {
    return useContext(MenuCloseContext);
};

export const ShareMenuItem = ({contentType, shareLink, disabled}) => {
    const [open, setOpen] = useState(false);
    const {onOpen, onClose} = useMenuClose();
    const handleOpen = () => {
        setOpen(true);
        onOpen();
    }
    const handleClose = () => {
        setOpen(false);
        onClose();
    }
    return (<>
        <CustomMenuItem
            disabled={disabled}
            onClick={handleOpen}
        >
            Share
            <Icon
                sx={{
                    mb:-.5,
                    ml:'auto',
                    height:'fit-content',
                }}
            >
                <Share/>
            </Icon>
        </CustomMenuItem>
        <ShareModal open={open} onClose={handleClose} contentType={contentType} shareLink={shareLink} disabled={disabled}/>
    </>)
}

export const BlockMenuItem = ({targetUserId, autoCallonClick, disabled}) => {
    const {userImpl} = useUserAuthState();
    const isUnblockingUser = userImpl?.extra?.blocked?.includes(targetUserId)
    const [open, setOpen] = useState(false);
    const {onOpen, onClose} = useMenuClose();
    const handleOpen = () => {
        setOpen(true);
        onOpen();
    }
    const handleClose = () => {
        setOpen(false);
        onClose();
    }
    useEffect(() => {
        if (autoCallonClick) {
            handleOpen()
        }
    }, [])

    return (<>
        <CustomMenuItem
            disabled={disabled}
            onClick={() => {
                if (!disabled) {
                    handleOpen();
                }
                else {
                    alert('You cannot block this user.')
                }
            }}
        >
            {isUnblockingUser ? 'Unblock' : 'Block'}
            <Icon
                sx={{
                    mb:-.5,
                    ml:'auto',
                    height:'fit-content',
                }}
            >
                {isUnblockingUser ? <RemoveCircleOutline /> : <Block/>}
            </Icon>
        </CustomMenuItem>
        <BlockUnblockModal open={open} onClose={handleClose} isUnblockingUser={isUnblockingUser} targetUserId={targetUserId} disabled={disabled}/>
    </>)
}

export const ReportMenuItem = ({contentType, contentId, extraData, disabled}) => {
    const [open, setOpen] = useState(false);
    const {onOpen, onClose} = useMenuClose();
    const handleOpen = () => {
        setOpen(true);
        onOpen();
    }
    const handleClose = () => {
        setOpen(false);
        onClose();
    }
    return(<>
        <CustomMenuItem
            disabled={disabled}
            onClick={() => {
                if (!disabled) {
                    handleOpen();
                }
                else {
                    alert('You cannot report this user.')
                }
            }}
        >
            Report
            <Icon
                sx={{
                    mb:.5,
                    ml:'auto',
                }}
            >
                <Flag/>
            </Icon>
        </CustomMenuItem>
        <ReportModal open={open} onClose={handleClose} contentType={contentType} contentId={contentId} extraData={extraData} disabled={disabled}/>
    </>)
}

export const DeleteMenuItem = ({draftId, listingId, disabled}) => {
    const [open, setOpen] = useState(false);
    const {onOpen, onClose} = useMenuClose();
    const handleOpen = () => {
        setOpen(true);
        onOpen();
    }
    const handleClose = () => {
        setOpen(false);
        onClose();
    }
    return(<>
        <CustomMenuItem 
            disabled={disabled}
            onClick={() => {
                if (!disabled) {
                    handleOpen();
                }
                else {
                    alert('You cannot delete this.')
                }
            }}
        >
            Delete
            <Icon
                sx={{
                    mb:.5,
                    ml:'auto',
                }}
            >
                <Delete/>
            </Icon>
        </CustomMenuItem>
        <DeleteModal open={open} onClose={handleClose} draftId={draftId} listingId={listingId} disabled={disabled}/>
    </>)
}

export const ApproveReservationMenuItem = ({reservationId, disabled}) => {
    const [open, setOpen] = useState(false);
    const {onOpen, onClose} = useMenuClose();
    const handleOpen = () => {
        setOpen(true);
        onOpen();
    }
    const handleClose = () => {
        setOpen(false);
        onClose();
    }
    return(<>
        <CustomMenuItem
            disabled={disabled}
            onClick={() => {
                if (!disabled) {
                    handleOpen();
                }
                else {
                    alert('You cannot approve this reservation.')
                }
            }}
        >
            Approve
            <Icon
                sx={{
                    mt:.25,
                    height:20,
                    ml:'auto',
                }}
            >
                <CheckCircle/>
            </Icon>
        </CustomMenuItem>
        <ApproveReservationModal open={open} onClose={handleClose} reservationId={reservationId} disabled={disabled}/>
    </>)
}

export const DeclineReservationMenuItem = ({reservationId, disabled}) => {
    const [open, setOpen] = useState(false);
    const {onOpen, onClose} = useMenuClose();
    const handleOpen = () => {
        setOpen(true);
        onOpen();
    }
    const handleClose = () => {
        setOpen(false);
        onClose();
    }
    return(<>
        <CustomMenuItem
            disabled={disabled}
            onClick={() => {
                if (!disabled) {
                    handleOpen();
                }
                else {
                    alert('You cannot decline this reservation.')
                }
            }}
        >
            Decline
            <Icon
                sx={{
                    mt:.25,
                    height:20,
                    ml:'auto',
                }}
            >
                <Cancel/>
            </Icon>
        </CustomMenuItem>
        <DeclineReservationModal open={open} onClose={handleClose}  reservationId={reservationId} disabled={disabled}/>
    </>)
}

export const CancelReservationMenuItem = ({reservationId, isRenterCancelling, disabled}) => {
    const [open, setOpen] = useState(false);
    const {onOpen, onClose} = useMenuClose();
    const handleOpen = () => {
        setOpen(true);
        onOpen();
    }
    const handleClose = () => {
        setOpen(false);
        onClose();
    }
    return(<>
        <CustomMenuItem
            disabled={disabled}
            onClick={() => {
                if (!disabled) {
                    handleOpen();
                }
                else {
                    alert('You cannot cancel this reservation.')
                }
            }}
        >
            Cancel
            <Icon
                sx={{
                    mt:.25,
                    height:20,
                    ml:'auto',
                }}
            >
                <Cancel/>
            </Icon>
        </CustomMenuItem>
        <CancelReservationModal open={open} onClose={handleClose} reservationId={reservationId} isRenterCancelling={isRenterCancelling} disabled={disabled}/>
    </>)
}

export const PublishMenuItem = ({draftId, disabled}) => {
    const [open, setOpen] = useState(false);
    const {onOpen, onClose} = useMenuClose();
    const handleOpen = () => {
        setOpen(true);
        onOpen();
    }
    const handleClose = () => {
        setOpen(false);
        onClose();
    }
    return(<>
        <CustomMenuItem 
            disabled={disabled}
            onClick={() => {
                if (!disabled) {
                    handleOpen();
                }
                else {
                    alert('You cannot publish this draft.')
                }
            }}
        >
            Publish
            <Icon
                sx={{
                    mb:.5,
                    ml:'auto',
                }}
            >
                <Publish />
            </Icon>
        </CustomMenuItem>
        <PublishModal open={open} onClose={handleClose} draftId={draftId} disabled={disabled}/>
    </>)
}

export const UnpublishMenuItem = ({listingId, disabled}) => {
    const [open, setOpen] = useState(false);
    const {onOpen, onClose} = useMenuClose();
    const handleOpen = () => {
        setOpen(true);
        onOpen();
    }
    const handleClose = () => {
        setOpen(false);
        onClose();
    }
    return(<>
        <CustomMenuItem 
            disabled={disabled}
            onClick={() => {
                if (!disabled) {
                    handleOpen();
                }
                else {
                    alert('You cannot unpublish this listing.')
                }
            }}
        >
            Unpublish
            <Icon
                sx={{
                    mb:.5,
                    ml:'auto',
                }}
            >
                <VisibilityOff/>
            </Icon>
        </CustomMenuItem>
        <UnpublishModal open={open} onClose={handleClose} listingId={listingId} disabled={disabled}/>
    </>)
}

export const ContactMenuItem = ({sx, chatId, hostId, userId, disabled}) => {
    const [loading, setLoading] = useState(false);
    const {user} = useUserAuthState();
    const {openModal} = useModal();
    const navigate = useNavigate();
    
    return (<>
        <CustomMenuItem 
            sx={{
                ...sx,
                bgcolor:loading?'#ededed':sx?.bgcolor||sx?.backgroundColor||'unset',
            }}
            disabled={disabled || loading}
            onClick={() => {
                if (!disabled) {
                    if (chatId) {
                        conditionalNavigation(navigate, `/messages/${chatId}`)
                    }
                    else {
                        if (user) {
                            setLoading(true);
                            create_chat_for_users({
                                participant1Id:userId,
                                participant2Id:hostId,
                            }).then(res => {
                                setLoading(false);
                                if (!res?.data?.error) {
                                    conditionalNavigation(navigate, `/messages/${res?.data?.chatId}`)
                                }
                            }).catch(err => {
                                setLoading(false);
                                alert(`${err.message}`)
                            })
                        }
                        else {
                            openModal(userauth_title, userauth_actions)
                        }
                    }
                }
                else {
                    alert('You cannot go to this chat.')
                }
            }}
        >
            {loading ? (
                <LoadingSpinner compact/>                
            ) : (<>
                Contact
                <Icon
                    sx={{
                        height:24,
                        display:'flex',
                        alignItems:'center',
                        ml:'auto',
                    }}
                >
                    <Comment />
                </Icon>
            </>)}
        </CustomMenuItem>
    </>)
}

export const EditPFPMenuItem = ({ sx }) => {
    const { user, setNewPfp } = useUserAuthState();
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const {onClose} = useMenuClose();

    const handleFileChange = (event) => {
        setLoading(true);
        const file = event.target.files[0];
        if (file) {
            const blobURL = URL.createObjectURL(file);
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
                setNewPfp({
                    url: blobURL,
                    b64: base64String,
                })
            };
            reader.readAsDataURL(file);
        }
        setLoading(false);
        onClose();
    };

    return (
        <>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
            />

            <CustomMenuItem
                sx={{ ...sx }}
                disabled={!user?.uid}
                onClick={() => fileInputRef.current?.click()} // Trigger file input
            >
                {!loading && <>
                    {user?.photoURL?'Edit':'Add'}
                    <Icon
                        sx={{
                            ml:'auto',
                            mb:.5,
                        }}
                    >
                        <PhotoCameraOutlined />
                    </Icon>
                </>}
                {loading &&
                    <LoadingComponent compact />
                }

            </CustomMenuItem>
        </>
    );
};

export const BasicMenuItem = ({title, BMIcon, onClick, disabled}) => {
    const {onOpen, onClose} = useMenuClose();
    const [loading, setLoading] = useState(false);

    return (<>
        <CustomMenuItem 
            disabled={disabled || loading}
            onClick={async () => {
                if (!disabled) {
                    setLoading(true);
                    await onClick();
                    setLoading(false);
                    onClose();
                }
                else {
                    alert('You cannot perform this action.')
                }
            }}
        >
            {title}
            <Icon
                sx={{
                    ml:'auto',
                    height:24,
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                }}
            >
                {loading ? (
                    <LoadingSpinner compact/>                
                ) : (<BMIcon />)}
            </Icon>
        </CustomMenuItem>
    </>)
}

const MobileParentContainer = ({ open, onClose, anyOpen, children }) => {
    return (
        (open &&
            <AdaptiveModal
                open={open}
                onClose={onClose}
                title='More options'
                swipeSheetMobile
            >
                <Box
                    sx={{
                        display:'flex',
                        flexDirection:'column',
                        gap:1.5,
                    }}
                >
                    {children}
                </Box>
            </AdaptiveModal>
        )
    );
};

export const MoreOptionsMenu = ({ open, onClose, menuAlign, noZIndex, children, forceSameContainer }) => {
    const [anyOpen, setAnyOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width:768px)')
    const ParentContainer = isMobile && !forceSameContainer ? MobileParentContainer : CustomMoreOptionsMenu;
    return (
        <MenuCloseProvider onOpen={() => setAnyOpen(true)} onClose={() => {onClose(); setAnyOpen(false); }}>
            <ParentContainer
                id="basic-menu"
                open={open}
                anyOpen={anyOpen}
                onClose={onClose}
                anchorEl={menuAlign}
                PaperProps={{
                    style:{
                        marginTop:4,
                        boxShadow:4,
                        display:anyOpen?'none':'flex',
                    }}
                }
                noZIndex={noZIndex}
            >
                {children}
            </ParentContainer>
        </MenuCloseProvider>
    );
};