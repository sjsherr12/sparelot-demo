import { useEffect, useRef, useState } from "react";
import { Box, Typography, Badge, IconButton, useMediaQuery, Icon, Fade, Tooltip, Container, Avatar, Alert } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowBack, ArrowBackIosNewRounded, ArrowForward, ArrowForwardIosRounded, Close, Info, InfoOutlined, KeyboardArrowDown, MoreHoriz, SwapCalls } from "@mui/icons-material";
import { motion, AnimatePresence, useMotionValue, useTransform, animate, usePresence } from 'framer-motion';
import { useUserAuthState } from "app/backend/user/auth/reactprovider";
import account_web_routes from "./routes";
import ForwardRoute from "./forward";
import isStandalone from "isStandalone";
import { LoadingSpinner } from "app/utils/loading/component";
import colors from "assets/theme/base/colors";
import { Sheet } from "react-modal-sheet";
import MKButton from "components/MKButton";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { LoadingComponent } from "app/utils/loading/component";
import AdaptiveModal from "app/sections/Modal/Adaptive";
import AccountHeaderDirectory from "./directory";
import zIndex from "@mui/material/styles/zIndex";
import { sendEmailVerification } from "firebase/auth";

const findMatchingRoute = (routes, location) => {
    for (const parent of routes) {
        const routeObjects = parent.routes;
        for (const routeObject of routeObjects) {
            if (routeObject.route && routeObject.route === location?.pathname) {
                return routeObject;
            }
            if (routeObject.subroutes) {
                const subrouteMatch = findMatchingRoute([{
                    routes: routeObject.subroutes,
                }], location);
                if (subrouteMatch) {
                    return subrouteMatch;
                }
            }
        }
    }
    return null;
};

const Account = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isMobile = useMediaQuery('(max-width:991px)');
    const { user, userImpl, forceReloadUserImpl } = useUserAuthState();
    const matchingRoute = findMatchingRoute(account_web_routes, location);
    const [shouldExit, setShouldExit] = useState(false);
    const [viewExtraInfo, setViewExtraInfo] = useState(false);
    const [verifying, setVerifying] = useState(0); // -1 = error, 0 = unpressed, 1 = loading, 2 = success

    const verificationButtonDisabled = verifying === 1;

    const handleVerifyEmail = () => {
        setVerifying(1)
        sendEmailVerification(
            user
        ).then(res => {
            setVerifying(2);
        }).catch(err => {
            setVerifying(-1)
        })
    }

    useEffect(() => {
        if (!isMobile && location?.pathname === '/account') {
            navigate('/account/profile')
        }
    }, [isMobile])

    useEffect(() => {
        forceReloadUserImpl()
        if (isStandalone() && userImpl?.hosting?.isHostMode) {
            account_web_routes[4].routes[0].name = 'Switch to Renting'
        }
    }, [])

    const Sidebar = () => (
        <Box
            sx={{
                px: 2,
                py:{xs:2,lg:0},
                minHeight: 'inherit',
                display: 'flex',
                flexDirection: 'column',
                minWidth: { xs: '100%', lg:300,xl:350,},
                maxWidth: { xs: '100%', lg:300,xl:350, },
                borderRight: { xs: 'none', lg: '1px solid #ededed' },
                bgcolor: '#fff',
                position:'relative',
            }}
        >
            <Box
                sx={Styles.UserModule}
                onClick={() => {
                    if (isMobile)
                    navigate('/account/viewprofile')
                }}
            >
                <Avatar
                    src={user?.photoURL}
                    sx={Styles.UserPFP}
                />
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <Typography
                        sx={{
                            color: '#000',
                            lineHeight: '25px',
                            fontWeight: 600,
                            fontSize: '1.1rem',
                            userSelect:'none',
                        }}
                    >
                        Hello, {user?.displayName?.split(' ')[0]}!
                    </Typography>
                    <Typography
                        sx={{
                            color: '#333',
                            lineHeight: '25px',
                            fontSize: '.85rem',
                            fontWeight: 400,
                            userSelect:'none',
                        }}
                    >
                        {user?.email}
                    </Typography>
                </Box>
                <Icon
                    sx={{
                        ml:'auto',
                        scale:1.2,
                        color:'#737373',
                        display:{xs:'flex',lg:'none'}
                    }}
                >
                    <ArrowForwardIosRounded />
                </Icon>
            </Box>

            {account_web_routes.filter((rt, idx) => rt.title !== 'custom').map((cat, idx) => (
                <Box key={idx}>
                    <Typography
                        sx={Styles.TinyCaption}
                    >
                        {cat?.title}
                    </Typography>
                    <Box
                        sx={Styles.RouteDisplay}
                    >
                        {cat?.routes?.map((rt, idx) => {
                            const isActiveParent = (parent) => {
                                return (
                                    parent.route === location?.pathname || 
                                    parent?.subroutes?.some(sub => sub.route === location?.pathname)
                                );
                            };
                            const isActive = isActiveParent(rt);
                            return (
                                <ForwardRoute isActive={isActive} key={idx} rtInf={rt} />
                            )
                        })}
                    </Box>
                </Box>
            ))}
        </Box>
    );

    return (<>
        <Alert 
            severity='error'
            sx={{
                width:'100%',
                display:user?.emailVerified?'none':'flex',
            }}
        >
            <strong>Urgent action required!</strong>
            <br/>
            Your account's email is not verified. In order to use many of SpareLot's services, you must first verify your email.
            <br />
            <MKButton
                disabled={verificationButtonDisabled}
                color={verificationButtonDisabled ? 'light' : 'info'}
                sx={{
                    mt:2,mb:1,
                    display:'flex',
                    alignItems:'center',
                    gap:verificationButtonDisabled+1,
                    fontWeight:500,
                    fontSize:'1rem',
                    whiteSpace:'nowrap',
                }}
                onClick={handleVerifyEmail}
            >
                Verify Your Email
                {verificationButtonDisabled ? <LoadingSpinner compact/> : <ArrowForward fontSize='large'/>}
            </MKButton>
        </Alert>

        <Box
            sx={{
                width: '100%',
                minHeight: 'inherit',
                display: 'flex',
                bgcolor: '#fff',
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            {/* Background Sidebar Layer */}
            {isMobile && location?.pathname !== '/account' && (
                <motion.div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 1
                    }}
                >
                    <Sidebar />
                </motion.div>
            )}

            {(location?.pathname === '/account' || !isMobile) && (
                <Box
                    sx={{ 
                        display: 'flex',
                        minHeight: 'inherit',
                        minWidth: isMobile ? '100%' : 'fit-content',
                        zIndex: 2
                    }}
                >
                    <Sidebar />
                </Box>
            )}

            <AnimatePresence mode="wait">
                {!shouldExit && (
                    <motion.div
                        key={location?.pathname}
                        initial={isMobile ? { x: "100%" } : {}}
                        animate={isMobile ? { x: 0 } : {}}
                        exit={
                            location?.pathname !== "/account"
                                ? isMobile
                                    ? { x: "100%" }
                                    : {}
                                : {}
                        }
                        transition={{ duration: isMobile ? 0.15 : 0.05, ease: "circOut" }}
                        style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            zIndex: 3,
                            backgroundColor: "#fff",
                            position: "relative",
                        }}
                    >
                        <Box
                            sx={{
                                py:2,
                                px:1,
                                mb:{xs:1,lg:4},
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                minHeight:75,
                                maxHeight:75,
                                borderBottom:{xs:'unset',lg:'1px solid #ededed'},
                            }}
                        >
                            {isMobile ? (<>
                                <IconButton
                                    size='medium'
                                    sx={{
                                        color:'#333',
                                        bgcolor:'#fff !important',
                                    }}
                                    onClick={() => {
                                        setShouldExit(true);
                                        setTimeout(() => {
                                            navigate("/account");
                                            setShouldExit(false);
                                        }, 150);
                                    }}
                                >
                                    <ArrowBack />
                                </IconButton>
                                <Box
                                    sx={{
                                        gap:1.5,
                                        width:'100%',
                                        display:'flex',
                                        alignItems:'center',
                                        justifyContent:{xs:'center',lg:'start'},
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize:'1rem',
                                            fontWeight:550,
                                            display:{xs:isStandalone()?'flex':'none',lg:'flex'},
                                        }}
                                    >
                                        {matchingRoute?.name}
                                    </Typography>
                                </Box>
                                <IconButton
                                    size='medium'
                                    sx={{
                                        color:'#333',
                                        bgcolor:'#fff !important',
                                        opacity:matchingRoute?.custom?.doNotDisplayInfo?0:1,
                                        pointerEvents:matchingRoute?.custom?.doNotDisplayInfo?'none':'auto',
                                    }}
                                    onClick={() => setViewExtraInfo(true)}
                                >
                                    <InfoOutlined />
                                </IconButton>
                            </>
                        ) : (
                            <AccountHeaderDirectory />
                        )}
                        </Box>

                        <Fade in={!shouldExit} enter={150} exit={150}>
                            <Box
                                sx={{
                                    pb:4,
                                    width: "100%",
                                    maxWidth: { xs: "100%", lg: matchingRoute?.custom?.maxContainerWidth || 700 },
                                    overscrollBehavior: "auto",
                                }}
                            >
                                {(() => {
                                    const Component = matchingRoute?.Component;
                                    return Component ? <Component shouldExit={shouldExit}/> : null;
                                })()}
                            </Box>
                        </Fade>
                    </motion.div>
                )}
            </AnimatePresence>

            <AdaptiveModal
                open={viewExtraInfo && isMobile}
                onClose={() => setViewExtraInfo(false)}
                title={matchingRoute?.name}
            >
                <Typography
                    sx={{
                        color:'#737373',
                        fontSize:'1rem',
                        fontWeight:500,
                        textAlign:'center',
                    }}
                >
                    {matchingRoute?.desc}.
                </Typography>
            </AdaptiveModal>

            <AdaptiveModal
                open={verifying === 2 || verifying === -1}
                onClose={() => setVerifying(0)}
                title='Verification Email'
                noSwipedownMobile
                maxWidth={500}
            >
                <Typography>
                    {verifying === 2 && `A verification email has been sent to ${user?.email}. Once you verify, please refresh this page to see your newly verified account.`}
                    {verifying === -1 && `An unexpected error occured while trying to send a verification email to ${user?.email}. Please try again later`}
                </Typography>

                <Box
                    sx={{
                        mt:3,
                        display:'flex',
                        width:'100%',
                        gap:2,
                    }}
                >
                    <MKButton
                        color='light'
                        onClick={() => setVerifying(0)}
                        sx={{
                            width:'100%',
                            fontSize:'.9rem',
                            fontWeight:500,
                        }}
                    >
                        Close
                    </MKButton>

                    <MKButton
                        color='info'
                        onClick={() => window.location.reload()}
                        sx={{
                            width:'100%',
                            fontSize:'.9rem',
                            fontWeight:500,
                        }}
                    >
                        Refresh
                    </MKButton>
                </Box>
            </AdaptiveModal>
        </Box>
    </>);
};

export default Account;

const Styles = {
    NavigationButton: {
        display:{xs:'flex',lg:'none'},
        color:'#737373',
        bgcolor:'#ededed',
        '&:hover':{
            bgcolor:'#ededed',
        },
        '&:active':{
            bgcolor:'#ededed',
        }
    },
    CloseButton: {
        scale:1.1,
        p:1.5,
        color:'#000',
        display:'flex',
        borderRadius:16,
        alignItems:'center',
        justifyContent:'center',
        ml:'auto',
        '&:hover':{
            bgcolor:'#efefef',
        }
    },
    TinyCaption: {
        mt: 2,
        ml:2,
        mb: 1,
        color: '#737373',
        fontSize: { xs: '.75rem', lg: '.875rem' },
        fontWeight: 450,
    },
    RouteDisplay: {
        pb:2,
        gap:.25,
        display: 'flex',
        flexDirection: 'column',
        borderBottom:'1px solid #efefef',
    },
    UserPFP: {
        width:{xs:72,lg:52},
        height:{xs:72,lg:52},
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
    },
    UserModule: {
        px: 2,
        py:{xs:2,lg:0},
        gap: 2,
        cursor:{xs:'pointer',lg:'auto'},
        '&:active':{ scale:{xs:.98,lg:1} },
        display: 'flex',
        borderRadius: {xs:3,lg:0},
        alignItems: 'center',
        transition:'scale .2s ease-out',
        boxShadow: {xs:'0px 2px 6px rgba(0,0,0,.25)',lg:'unset'},
        borderBottom:{xs:'unset',lg:'1px solid #ededed'},
        minHeight:{xs:'unset',lg:75},
        maxHeight:{xs:'unset',lg:75},
        mx:{xs:0,lg:-2},
        minWidth:{xs:'unset',lg:'calc(100% + 32px)'}
    }
}