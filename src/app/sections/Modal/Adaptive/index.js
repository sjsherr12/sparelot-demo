import { ArrowBackIosNew, Close, MoreHoriz } from "@mui/icons-material";
import { MoreOptionsMenu } from "app/sections/More";
import { useEffect, useRef, useState } from "react";
import { Modal, Box, Typography, IconButton, Icon, useMediaQuery } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import isStandalone from "isStandalone";
import { useLocation, useNavigate } from "react-router-dom";
import CustomBottomSheet from "./sheet";

const addQueryParam = (param, value) => {
    const url = new URL(window.location.href); // Get current URL
    url.searchParams.set(param, value); // Set or update the query parameter
    window.history.pushState({}, '', url); // Update the URL without reloading the page
};

const removeQueryParam = (param) => {
    const url = new URL(window.location.href); // Get current URL
    url.searchParams.delete(param); // Remove the query parameter
    window.history.pushState({}, '', url); // Update the URL without reloading the page
};

const AdaptiveModal = ({
    open,
    onClose,
    children,
    title,
    sx,
    header_sx,
    parent_sx,
    maxWidth,
    moreOptions,
    noHeader,
    sideSwipeMobile,
    noSwipedownMobile,
    noLeftCornerDefault,
    C_leftCornerOptionIcon,
    C_leftCornerOptionClick,
    C_rightCornerOptionIcon,
    C_rightCornerOptionClick,
}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isMobile = useMediaQuery('(max-width:991px)')
    const [moreOptionsMenu, setMoreOptionsMenu] = useState(false);
    const [menuAlign, setMenuAlign] = useState(null);
    const MoreOptionsLeftIcon = C_leftCornerOptionIcon || (sideSwipeMobile && isMobile ? ArrowBackIosNew : Close);
    const MoreOptionsRightIcon = C_rightCornerOptionIcon || MoreHoriz;
    const [animateExit, setAnimateExit] = useState(false);

    useEffect(() => {
        if (sideSwipeMobile && open && isMobile) {
            addQueryParam(sideSwipeMobile?.customExtension, '1')
        }
    }, [open, isMobile])

    useEffect(() => {
        if (animateExit) {
            removeQueryParam(sideSwipeMobile?.customExtension);
            onClose();
            setAnimateExit(false);
        }
    }, [animateExit])

    useEffect(() => {
        // Listen for popstate events (which are triggered by browser navigation like back/forward)
        const handlePopState = () => {
            if (sideSwipeMobile) {
                const searchParams = new URLSearchParams(window.location.search)
                if (!searchParams.get(sideSwipeMobile?.customExtension)) {
                    onClose();
                }
            }
        };

        // Add the popstate event listener
        window.addEventListener('popstate', handlePopState);

        // Cleanup the event listener on unmount
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    const isAMobileSwipesheet = (isMobile && !sideSwipeMobile && !noSwipedownMobile && !C_leftCornerOptionIcon && !C_leftCornerOptionClick && onClose);

    return (
        <>
            {isMobile && !sideSwipeMobile && !noSwipedownMobile && onClose ? (
                <>
                    {open &&
                        <CustomBottomSheet
                            isOpen={open}
                            onClose={onClose}
                            detent="content-height"
                        >
                            {/* Header Section */}
                            {!noHeader && (
                                <Box
                                    className="sheet-header"
                                    sx={{
                                        px: { xs: isAMobileSwipesheet ? 2 : 1.5, lg: 1.5 },
                                        py: 1,
                                        minHeight: 45,
                                        maxHeight: 45,
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        bgcolor:'#fff',
                                        borderBottom: '1px solid #ededed',
                                        ...header_sx,
                                    }}
                                >
                                    <IconButton
                                        size="small"
                                        sx={{
                                            p: 0.75,
                                            color: '#737373',
                                            bgcolor: '#efefef !important',
                                            opacity: noLeftCornerDefault || isAMobileSwipesheet ? 0 : 1,
                                            pointerEvents: noLeftCornerDefault || isAMobileSwipesheet ? 'none' : 'auto',
                                        }}
                                        onClick={() => {
                                            if (C_leftCornerOptionClick) {
                                            C_leftCornerOptionClick();
                                            } else {
                                                setAnimateExit(true);
                                            }
                                        }}
                                    >
                                        <MoreOptionsLeftIcon />
                                    </IconButton>
                                    
                                    <Box
                                        sx={{
                                            width: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flexGrow: 1,
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                mb:.5,
                                                color: '#000',
                                                textAlign: 'center',
                                                fontWeight: 600,
                                                fontSize: 14,
                                            }}
                                        >
                                            {title}
                                        </Typography>
                                    </Box>
                                    
                                    <IconButton
                                        size="small"
                                        sx={{
                                            mb:isAMobileSwipesheet ? 1.1 : 0,
                                            p: 0.75,
                                            color: '#737373',
                                            bgcolor: '#efefef !important',
                                            opacity: ((C_rightCornerOptionIcon && C_rightCornerOptionClick) || moreOptions) ? 1 : 0,
                                            pointerEvents: ((C_rightCornerOptionIcon && C_rightCornerOptionClick) || moreOptions) ? 'auto' : 'none',
                                        }}
                                        onClick={(e) => {
                                            if (C_rightCornerOptionClick) {
                                            C_rightCornerOptionClick();
                                            } else {
                                            setMoreOptionsMenu(true);
                                            setMenuAlign(e.currentTarget);
                                            }
                                        }}
                                    >
                                        <MoreOptionsRightIcon
                                            sx={{
                                                opacity: ((C_rightCornerOptionIcon && C_rightCornerOptionClick) || moreOptions) + 0,
                                            }}
                                        />
                                    </IconButton>
                                </Box>
                            )}
                            <Box
                                sx={{
                                    p: 2,
                                    ...sx,
                                    pb: 8,
                                    maxHeight: `calc(${isStandalone() ? `95dvh` : `85dvh`} - 70px)`,
                                    overflowY: "auto",
                                    scrollbarWidth: "thin",
                                    scrollbarColor: "#ababab #fff",
                                    msOverflowStyle: "none",
                                }}
                            >
                                {children}
                            </Box>
                        </CustomBottomSheet>
                    }
                </>
            ) : (
                <AnimatePresence>
                    {open && (
                        <Modal
                            open={open}
                            onClose={onClose}
                            sx={{
                                zIndex: 100000,
                                display: "flex",
                                alignItems: {xs:'end',lg:"center"},
                                justifyContent: "center",
                            }}
                        >
                            <Box
                                willchange="transform"
                                component={motion.div}
                                initial={{
                                    [sideSwipeMobile && isMobile ? 'x' : 'y']: "100%",
                                }}
                                
                                animate={{
                                    [sideSwipeMobile && isMobile ? 'x' : 'y']: 0,
                                    transition: { duration: sideSwipeMobile && isMobile ? 0.2 : 0.3, ease: 'easeOut' },
                                }}
                                
                                exit={{
                                    [sideSwipeMobile && isMobile ? 'x' : 'y']: "100%",
                                    transition: { duration: (sideSwipeMobile && isMobile && !animateExit) ? 0 : 0.15, ease: 'easeIn' },
                                }}                       
                                transition={{
                                    type: "tween",
                                    ease: "easeOut",  // Less abrupt easing
                                }}
                                sx={{
                                    pb: {xs:4,lg:0},
                                    borderRadius: { xs: sideSwipeMobile?0 : "20px 20px 0px 0px", lg: 3 },
                                    width: { xs: "100vw", lg: maxWidth || 750 },
                                    height: { xs: "fit-content", lg: "fit-content" },
                                    maxHeight: `95dvh`,
                                    minHeight:sideSwipeMobile?{xs:`100dvh`,lg:'unset'}:'unset',
                                    bgcolor: "#fff",
                                    outline: "none",
                                    overflow: "hidden",
                                    boxShadow: 4,
                                    ...parent_sx,
                                }}
                            >
                                { /*
                                    THIS HEADER COMPONENT IS COPIED INTO MULTIPLE AREAS
                                    IF AN EDIT IS MADE TO IT MAKE IT TO THE OTHER VERSION
                                    IT CANNOT BE MADE INTO A COMPONENT AS CHANGING A STATE UNMOUNTS THE WHOLE THING
                                    AND I DONT KNOW HOW TO FIX IT JUST KEEP IT LIKE THIS FOR NOW
                                */ }
                                <Box
                                    id="header"
                                    sx={{
                                        bgcolor:'#fff',
                                        px:{xs:isAMobileSwipesheet?2:1.5,lg:1.5},
                                        py:1,
                                        minHeight:{xs:isAMobileSwipesheet?70:50,lg:50},
                                        maxHeight:{xs:isAMobileSwipesheet?70:50,lg:50},
                                        width:'100%',
                                        display:noHeader?'none':'flex',
                                        alignItems:'center',
                                        borderBottom:'1px solid #ededed',
                                        flexDirection:{xs:!(sideSwipeMobile && isMobile) ? 'row-reverse' : 'row', lg:'row'},
                                        ...header_sx,
                                    }}
                                >
                                    <IconButton
                                        size='small'
                                        sx={{
                                            p:.75,
                                            color:'#737373',
                                            bgcolor:'#efefef !important',
                                            opacity:noLeftCornerDefault || isAMobileSwipesheet?0:1,
                                            pointerEvents:noLeftCornerDefault || isAMobileSwipesheet?'none':'auto',
                                        }}
                                        onClick={(e) => {
                                            if (C_leftCornerOptionClick) {
                                                C_leftCornerOptionClick();
                                            }
                                            else {
                                                setAnimateExit(true);
                                            }
                                        }}
                                    >
                                        <MoreOptionsLeftIcon 
                                        />
                                    </IconButton>
                                    <Box
                                        sx={{
                                            width:'100%',
                                            display:'flex',
                                            flexDirection:'column',
                                            justifyContent:'center',
                                            alignItems:'center',
                                            flexGrow:1,
                                            height:50,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                mb:'auto',
                                                width:40,
                                                height:4,
                                                bgcolor:'#737373',
                                                borderRadius:16,
                                                overflow:'hidden',
                                                display:isAMobileSwipesheet?'flex':'none',
                                            }}
                                        />
                                        <Typography
                                            sx={{
                                                mt:isAMobileSwipesheet?'auto':'unset',
                                                color:'#000',
                                                textAlign:'center',
                                                fontWeight:550,
                                                fontSize:14,
                                            }}
                                        >
                                            {title}
                                        </Typography>
                                    </Box>

                                    <IconButton
                                        size='small'
                                        sx={{
                                            p:.75,
                                            color:'#737373',
                                            bgcolor:'#efefef !important',
                                            opacity:((C_rightCornerOptionIcon && C_rightCornerOptionClick) || moreOptions)?1:0,
                                            pointerEvents:((C_rightCornerOptionIcon && C_rightCornerOptionClick) || moreOptions)?'auto':'none',
                                        }}
                                        onClick={(e) => {
                                            if (C_rightCornerOptionClick) {
                                                C_rightCornerOptionClick();
                                            }
                                            else {
                                                setMoreOptionsMenu(true);
                                                setMenuAlign(e.currentTarget);

                                            }
                                        }}
                                    >
                                        <MoreOptionsRightIcon 
                                            sx={{
                                                opacity:((C_rightCornerOptionIcon && C_rightCornerOptionClick) || moreOptions)+0,
                                            }}
                                        />
                                    </IconButton>
                                </Box>
                                { /*
                                    THIS HEADER COMPONENT IS COPIED INTO MULTIPLE AREAS
                                    IF AN EDIT IS MADE TO IT MAKE IT TO THE OTHER VERSION
                                    IT CANNOT BE MADE INTO A COMPONENT AS CHANGING A STATE UNMOUNTS THE WHOLE THING
                                    AND I DONT KNOW HOW TO FIX IT JUST KEEP IT LIKE THIS FOR NOW
                                */ }

                                <Box
                                    sx={{
                                        p: 2,
                                        ...sx,
                                        maxHeight: sideSwipeMobile?{xs:`calc(100dvh - 50px)`, lg:`calc(95dvh - 50px)`}:`calc(95dvh - 50px)`,
                                        overflowY: "auto",

                                        scrollbarWidth: "thin",
                                        scrollbarColor: "#ababab #fff",
                                        msOverflowStyle: "none",
                                    }}
                                >
                                    {children}
                                </Box>
                            </Box>
                        </Modal>
                    )}
                </AnimatePresence>
            )}
            
            <MoreOptionsMenu
                open={moreOptionsMenu}
                onClose={() => setMoreOptionsMenu(false)}
                menuAlign={menuAlign}
            >
                {moreOptions}
            </MoreOptionsMenu>
        </>
    );
};

export default AdaptiveModal;