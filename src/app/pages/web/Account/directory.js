import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Box, Typography, IconButton, Grow, Fade } from '@mui/material';
import { ArrowForwardIosRounded } from '@mui/icons-material';
import account_web_routes from './routes';
import { isMobile } from 'react-device-detect';

const AccountHeaderDirectory = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);
    const [activeRouteWithSubroutes, setActiveRouteWithSubroutes] = useState(null);

    // Find the active route at any level of nesting
    const findActiveRoute = () => {
        for (const category of account_web_routes) {
            for (const route of category.routes) {
                // Check if this is the active route
                if (route.route === location?.pathname) {
                    return {
                        category,
                        route,
                        subroute: null
                    };
                }
                // Check subroutes if they exist
                if (route.subroutes) {
                    for (const subroute of route.subroutes) {
                        if (subroute.route === location?.pathname) {
                            return {
                                category,
                                route,
                                subroute
                            };
                        }
                    }
                }
            }
        }
        return null;
    };

    const activeRouteInfo = findActiveRoute();
    
    // Reset expansion state on route change
    useEffect(() => {
        setExpanded(false);
        setActiveRouteWithSubroutes(null);
    }, [location?.pathname]);

    if (!activeRouteInfo) return null;

    const { category, route, subroute } = activeRouteInfo;

    const handleRouteClick = (clickedRoute) => {
        if (clickedRoute.subroutes) {
            navigate(clickedRoute.subroutes[0].route);
        }
    };

    return (
        <Box sx={{ px:{lg:0,xl:1}, width: "100%", userSelect:'none', }}>
            <Typography
                sx={{
                    gap: expanded ? 1.5 : .5,
                    fontSize: {lg:'1.25rem',xl:'1.75rem'},
                    fontWeight: 450,
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <span
                    style={{
                        whiteSpace:'nowrap',
                    }}
                >
                    {category.title}
                </span>

                <IconButton
                    onClick={() => setExpanded(prev => !prev)}
                    sx={{
                        mx:expanded?0:1,
                        p: .75,
                        borderRadius: 16,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "background 0.2s ease-in-out",
                        bgcolor: expanded ? "#efefef" : 'transparent',
                        "&:hover": {
                            cursor: "pointer",
                            bgcolor: "#efefef",
                        },
                    }}
                >
                    <ArrowForwardIosRounded
                        sx={{
                            scale: .75,
                            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.25s ease",
                        }}
                    />
                </IconButton>

                <Box
                    sx={{
                        py:.5,
                        display: "flex",
                        gap: 1,
                        overflow: "hidden",
                        overflowX: 'auto',
                        maxWidth: expanded ? "fit-content" : "0px",
                        transition: "max-width 0.4s ease-in-out",
                    }}
                >
                    {category.routes.map((r) => {
                        const active = r === route;
                        return (
                            <Grow key={r.route || r.name} in={expanded} timeout={200}>
                                <Typography
                                    component={r.route || (r.subroutes && r.subroutes[0].route) ? Link : 'div'}
                                    to={r.route || (r.subroutes && r.subroutes[0].route)}
                                    onClick={() => r.subroutes && handleRouteClick(r)}
                                    sx={{
                                        ...Styles.Subroutes,
                                        color: active ? '#000' : '#737373',
                                        bgcolor: active ? '#efefef' : '#fff',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {r.name}
                                </Typography>
                            </Grow>
                        );
                    })}
                </Box>

                <span
                    style={{
                        color:'#737373',
                        whiteSpace:'nowrap',
                    }}
                >
                    {!expanded && route.name}
                </span>

                {/* Subroutes Expansion Button (only shown if current route has subroutes) */}
                {route.subroutes && (
                    <IconButton
                        onClick={() => setActiveRouteWithSubroutes(activeRouteWithSubroutes === route ? null : route)}
                        sx={{
                            mr: expanded?0:1,
                            ml:expanded?-1:1,
                            p: .75,
                            borderRadius: 16,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "0.2s",
                            bgcolor: activeRouteWithSubroutes === route ? "#efefef" : 'transparent',
                            "&:hover": {
                                cursor: "pointer",
                                bgcolor: "#efefef",
                            },
                        }}
                    >
                        <ArrowForwardIosRounded
                            sx={{
                                scale: .75,
                                transform: activeRouteWithSubroutes === route ? "rotate(180deg)" : "rotate(0deg)",
                                transition: "transform 0.25s ease",
                            }}
                        />
                    </IconButton>
                )}

                {/* Subroutes Expansion */}
                {route.subroutes && (
                    <Box
                        sx={{
                            py: .5,
                            display: "flex",
                            gap: 1,
                            overflow: "hidden",
                            overflowX: 'auto',
                            maxWidth: activeRouteWithSubroutes === route ? "fit-content" : "0px",
                            transition: "max-width 0.4s ease-in-out",
                        }}
                    >
                        {route.subroutes.map((sr) => {
                            const active = sr === subroute;

                            return (
                                <Grow key={sr.route} in={activeRouteWithSubroutes === route} timeout={200}>
                                    <Typography
                                        component={Link}
                                        to={sr.route}
                                        sx={{
                                            ...Styles.Subroutes,
                                            color: active ? '#000' : '#737373',
                                            bgcolor: active ? '#efefef' : '#fff',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {sr.name}
                                    </Typography>
                                </Grow>
                            )
                        })}
                    </Box>
                )}

                {/* Final Subroute Name */}
                {subroute && (
                    <Box sx={{ 
                        overflow: "hidden", 
                        display: "inline-block", 
                        maxWidth: !activeRouteWithSubroutes ? "fit-content" : "0px", 
                        transition: "max-width 0.3s ease-in-out" 
                    }}>
                        <Fade in={!activeRouteWithSubroutes} timeout={200}>
                            <span style={{ color: "#737373", whiteSpace: "nowrap" }}>
                                {subroute.name}
                            </span>
                        </Fade>
                    </Box>
                )}
            </Typography>
        </Box>
    );
};

export default AccountHeaderDirectory;

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