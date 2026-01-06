import { Add, ArrowForwardIosRounded, Logout } from "@mui/icons-material";
import { Avatar, Box, Button, Collapse, Container, Fade, Grow, Icon, IconButton, Typography } from "@mui/material";
import { useUserAuthState } from "app/backend/user/auth/reactprovider";
import ForwardRoute from "app/pages/web/Account/forward";
import Footer from "app/sections/Footer";
import HostNavbar from "app/sections/HostNavbar";
import host_routes from "app/sections/HostNavbar/routes";
import { home_actions } from "app/sections/Navbar/actions";
import { home_mobile_routes } from "app/sections/Navbar/routes";
import { home_web_routes } from "app/sections/Navbar/routes";
import colors from "assets/theme/base/colors";
import * as c from 'const'
import isStandalone from "isStandalone";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { Link, useLocation } from "react-router-dom";
import HostContentWrapper from "./content";
import MKButton from "components/MKButton";
import { useSpareLotHostData } from "app/pages/mobile/Hosting/Bookings/context";

const HostWebWrapper = ({Content}) => {
    const location = useLocation();
    const {user} = useUserAuthState();
    const {loading, reservations} = useSpareLotHostData('reservations')

    useEffect(() => {
        window.scrollTo({top:0, behavior:'smooth'})
    }, [location?.pathname])

    return (
        <>
            {<HostNavbar />}

            <Box 
                sx={{
                    overflow:'hidden',
                    minHeight:'calc(100dvh - 80px)',
                    maxHeight:isMobile?'unset':{xs:'unset',lg:'calc(100dvh - 80px)'},
                    display:'flex',
                }}
            >
                <Box
                    sx={{
                        gap:2,
                        display:'flex',
                        flexDirection:'column',
                        bgcolor:'#fff',
                        width:350,
                        display:isMobile?'none':{xs:'none',lg:'flex'},
                        minHeight:'inherit',
                        maxHeight:isMobile?'unset':{xs:'unset',lg:'inherit'},
                        overflowY:'auto',
                        boxShadow:'0px 0px 12px rgba(0,0,0,.25)',
                        ...Styles.CustomScrollbar,
                    }}
                >
                    <Box
                        sx={{
                            pr:2,
                            pt:2,
                            height:'100%',
                            flexGrow:1,
                            display:'flex',
                            flexDirection:'column',
                        }}
                    >
                        {host_routes.map((rt, idx) => (
                            <Box key={idx} sx={{ width: '100%' }}>
                                <Typography
                                    sx={{
                                        mt: 2,
                                        pb: 0.5,
                                        mb: 1,
                                        pl:1.5,
                                        color: '#737373',
                                        fontSize: { xs: '.66rem', lg: '.75rem' },
                                        fontWeight: 550,
                                        borderBottom: '1px solid #ededed',
                                    }}
                                >
                                    {rt?.title}
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap:.5, }}>
                                    {rt?.subroutes?.map((rt, idx) => {
                                        const active = rt.route === location?.pathname;

                                        return (
                                            <Box
                                                component={Link}
                                                to={rt.route}
                                                sx={{
                                                    px:4,
                                                    py:1.25,
                                                    bgcolor:active?'rgba(46,137,255,0.2)':'#fff',
                                                    display:'flex',
                                                    alignItems:'center',
                                                    gap:2,
                                                    cursor:'pointer',
                                                    borderRadius:'0px 32px 32px 0px',
                                                    '&:hover':{
                                                        bgcolor:'rgba(46,137,255,0.2)',
                                                        transition:'all .1s ease-in-out',
                                                    },
                                                    transition:'all .1s ease-in-out',
                                                }}
                                            >
                                                <Icon
                                                    sx={{
                                                        color:colors.info.main,
                                                        width:24,
                                                        height:24,
                                                        display:'flex',
                                                        alignItems:'center',
                                                        justifyContent:'center',
                                                    }}
                                                >
                                                    <rt.icon fontSize='medium' />
                                                </Icon>
                                                <Typography
                                                    sx={{
                                                        fontSize:'.875rem',
                                                        fontWeight:500,
                                                        color:active?colors.info.main : '#737373',
                                                    }}
                                                >
                                                    {rt?.name}
                                                    {rt?.custom?.badgeType !== undefined ? ` (${!loading ? reservations.filter((res) => res.reservationInfo?.status === rt.custom.badgeType)?.length : '...'})` : ''}
                                                </Typography>
                                            </Box>
                                        )
                                    })}
                                </Box>
                            </Box>
                        ))}

                        <Box
                            sx={{
                                mt:'auto',
                                pt:2,
                                pb:2,
                                pl:2,
                                gap:2,
                                width:'100%',
                                display:'flex',
                                flexDirection:'column',
                            }}
                        >
                            <MKButton
                                component={Link}
                                to='/create'
                                color='info'
                                sx={{
                                    borderRadius:8,
                                    fontWeight:500,
                                    fontSize:'1rem',
                                    gap:1,
                                }}
                                endIcon={<Add sx={{scale:1.5}} />}
                            >
                                Create Listing
                            </MKButton>
                            <MKButton
                                component={Link}
                                to='/account/logout'
                                color='secondary'
                                sx={{
                                    borderRadius:8,
                                    fontWeight:500,
                                    fontSize:'1rem',
                                    gap:1,
                                }}
                                endIcon={<Logout sx={{scale:1.2}}/>}
                            >
                                Sign Out
                            </MKButton>
                        </Box>
                    </Box>
                </Box>   
                <Box
                    sx={{
                        width:'100%',
                        minHeight:'inherit',
                        overflowY:'auto',
                    }}
                >
                    <Content />
                </Box>
            </Box>
        </>
    )
}

export default HostWebWrapper;

const Styles = {
    CustomScrollbar: {
        overflowY: "auto",
        scrollbarWidth: "thin", // Firefox
        scrollbarColor: "#ededed transparent", // Thumb visible, track invisible
        "&::-webkit-scrollbar": {
            width: "6px",
        },
        "&::-webkit-scrollbar-track": {
            background: "transparent", // Completely invisible track
        },
        "&::-webkit-scrollbar-thumb": {
            background: "#ababab", // Visible scrollbar thumb
            borderRadius: "16px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
            background: "#777",
        },
    },
}