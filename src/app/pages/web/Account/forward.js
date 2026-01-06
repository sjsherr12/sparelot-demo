import { ArrowForwardIosRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Icon, useMediaQuery } from "@mui/material";
import { Sheet } from "react-modal-sheet";
import isStandalone from "isStandalone";
import colors from "assets/theme/base/colors";
import AdaptiveModal from "app/sections/Modal/Adaptive";

const ForwardRoute = ({ rtInf, isActive, descriptionText, sx}) => {
    const isMobile = useMediaQuery('(max-width:991px)')
    const {location} = useLocation();
    const activeChild = !isMobile && rtInf?.subroutes?.some((sbrt) => sbrt?.route === location?.pathname);
    const [exp, setExp] = useState(activeChild);
    const navigate = useNavigate();

    return (
        <>
            <Box
                title={rtInf?.isNotARoute?'':`${rtInf?.desc}.`}
                component={!isStandalone() && rtInf?.route && !rtInf?.subroutes ? Link : Box}
                to={rtInf?.route}
                onClick={() => {
                    if (isStandalone() && rtInf?.route) {
                        navigate(rtInf?.route)
                    }
                    if (rtInf?.subroutes) setExp(!exp);
                }}
                sx={{
                    gap: 2,
                    px:2.5,
                    py:{xs:1.5,lg:1.75},
                    '&:hover': {
                        cursor: rtInf?.isNotARoute?'auto':'pointer',
                        bgcolor:rtInf?.isNotARoute?'#fff':'#efefef',
                    },
                    '&:active': {
                        scale: {xs:0.98,lg:1},
                        transition: 'all 0.2s ease-in',
                    },
                    scale: 1, // Ensure transition applies when returning to this state
                    transition: 'all 0.2s ease-in-out', // Change ease-in to ease-in-out for a smoother return
                    borderRadius:3,
                    boxShadow:isActive&&'0px 2px 6px rgba(0,0,0,.25)',
                    display: 'flex',
                    alignItems: 'center',
                    userSelect: rtInf?.isNotARoute?'auto':'none',
                    ...sx,
                }}
            >
                <Icon
                    sx={{
                        scale: 1.2,
                        color: rtInf?.color || '#000',
                        height: 'fit-content',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <rtInf.icon />
                </Icon>
                <Box sx={{ mr: 1 }}>
                    <Typography
                        sx={{
                            width: 'fit-content',
                            fontSize: 16,
                            fontWeight: 500,
                            lineHeight: '22px',
                            color: rtInf?.color || '#000',
                            whiteSpace:'nowrap',
                        }}
                    >
                        {rtInf?.name}
                    </Typography>
                    <Typography
                        sx={{
                            display:{xs:descriptionText||rtInf?.isNotARoute?'flex':'none',lg:rtInf?.isNotARoute?'flex':'none'},
                            overflow: 'hidden',
                            fontSize: 14,
                            fontWeight: 400,
                            lineHeight: '18px',
                            color: '#737373',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        {rtInf?.desc}
                    </Typography>
                </Box>
                <Icon
                    sx={{
                        ml: 'auto',
                        display: rtInf?.isNotARoute?'none':'flex',
                        alignItems: 'center',
                        color: '#737373',
                        transform: {xs:'rotate(0deg)',lg:exp ? 'rotate(90deg)' : 'rotate(0deg)'},
                        transition: 'transform 0.05s ease-in-out',
                    }}
                >
                    <ArrowForwardIosRounded />
                </Icon>
            </Box>

            <Box
                sx={{
                    ml: 4,
                    mb:exp*1,
                    p:exp*.5,
                    pr:0,
                    gap:exp*.5,
                    borderRadius:exp && '0px 0px 0px 16px',
                    opacity:exp+0,
                    display:{xs:'none',lg:rtInf?.subroutes?'flex':'none'},
                    flexDirection:'column',
                    borderLeft:exp && '1px solid #ededed',
                    borderBottom:exp && '1px solid #ededed',
                    overflow: 'hidden',
                    maxHeight: exp ? '500px' : '0px',
                    transition: 'all 0.1s ease-in-out',
                }}
            >
                {rtInf?.subroutes?.map((rt, idx) => (
                    <ForwardRoute key={idx} rtInf={rt} />
                ))}
            </Box>

            <AdaptiveModal
                open={exp && isMobile}
                onClose={() => setExp(false)}
                title={rtInf?.name}
                sx={{
                    p:0
                }}
            >
                <Box
                    sx={{
                        pb:10,
                    }}
                >
                    {rtInf?.subroutes?.map((rt, idx) => (
                        <ForwardRoute
                            key={idx} 
                            rtInf={rt} 
                            descriptionText 
                            sx={{
                                borderRadius:0,
                                borderBottom:'1px solid #ededed !important',
                            }}
                        />
                    ))}
                </Box>
            </AdaptiveModal>
        </>
    );
};

export default ForwardRoute;