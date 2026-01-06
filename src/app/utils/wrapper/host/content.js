import { ArrowForwardIosRounded } from "@mui/icons-material";
import { Box, Button, Container, Fade, Grow, Icon, IconButton, Typography, useMediaQuery } from "@mui/material";
import { useSpareLotHostData } from "app/pages/mobile/Hosting/Bookings/context";
import host_routes from "app/sections/HostNavbar/routes";
import colors from "assets/theme/base/colors";
import isStandalone from "isStandalone";
import { Link, useLocation } from "react-router-dom";

const { useState, useEffect } = require("react");

const HostContentWrapper = ({children}) => {
    const findActiveRoute = (parent) => {
        for (const route of host_routes) {
            for (const subroute of route.subroutes) {
                if (subroute?.route === location?.pathname) {
                    return parent ? route : subroute;
                }
            }
        }
    }

    const isMobile = useMediaQuery('(max-width:991px)')
    const location = useLocation();
    const [expanded, setExpanded] = useState(false)
    const activeRoute = findActiveRoute(true);
    const subroutes = activeRoute?.subroutes || [];
    const activeName = findActiveRoute()?.name;
    const {loading, reservations} = useSpareLotHostData('reservations');

    useEffect(() => {
        setExpanded(false);
    }, [location?.pathname])

    return (
        <Box>
            <Box
                sx={{ 
                    mb:3,
                    width: "100%",
                    borderBottom:'1px solid #ededed',
                }}
            >
                <Box
                    sx={{
                        p:3,
                        pb:{xs:2,lg:3},
                        gap:{xs:1,lg:1.5},
                        width:'100%',
                        display:'flex',
                        alignItems:'center',
                    }}
                >
                    <Typography
                        sx={{
                            color:'#737373',
                            fontSize: {xs:'1.5rem',lg:"2rem"},
                            fontWeight: 450,
                        }}
                    >
                        {activeRoute?.title}
                    </Typography>

                    <Icon
                        sx={{
                            color:'#737373',
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <ArrowForwardIosRounded
                            sx={{scale:1}}
                        />
                    </Icon>

                    <Typography
                        sx={{
                            fontSize: {xs:'1.5rem',lg:"2rem"},
                            fontWeight: 450,
                            color:colors.info.main,
                        }}
                    >
                        {activeName}
                    </Typography>

                    {activeRoute?.custom?.Adornment && <activeRoute.custom.Adornment />}
                </Box>

                <Box
                    sx={{
                        width:'100%',
                        display:isMobile||isStandalone() ? 'flex' : 'none',
                        alignItems:'center',
                        overflowX:'auto',
                        gap:1,
                        px:3,
                        pb:2,
                    }}
                >
                    {subroutes.map((sbrt, idx) => {
                        const active = sbrt?.name === activeName;

                        return (
                            <Typography
                                component={Link}
                                to={sbrt?.route}
                                sx={{
                                    borderRadius:8,
                                    color:`${active?'#fff':'#737373'} !important`,
                                    bgcolor:`${active?colors.info.main:'#ededed'} !important`,
                                    minHeight:'unset',
                                    py:.75,
                                    px:1.5,
                                    whiteSpace:'nowrap',
                                    width:'fit-content',
                                    fontWeight:500,
                                    fontSize:'.6rem',
                                }}
                            >
                                {sbrt?.name}
                                {sbrt?.custom?.badgeType !== undefined ? ` (${!loading ? reservations.filter((res) => res.reservationInfo?.status === sbrt.custom.badgeType)?.length : '...'})` : ''}
                            </Typography>
                        )
                    })}
                </Box>
            </Box>

            <Container
            >
                {children}
            </Container>
        </Box>
    )
}

export default HostContentWrapper

const Styles = {
    Subroutes: {
        px:2,
        py:1,
        fontSize:14,
        fontWeight:600,
        borderRadius:16,
        cursor:'pointer',
        border:'1px solid #fff',
        userSelect:'none',
        whiteSpace:'nowrap',
        '&:hover':{
            color:'#000',
            border:'1px solid #000'
        },
        '&:active':{
            scale:.95,
        },
        transition:'scale .2s ease-in-out'
    }
}