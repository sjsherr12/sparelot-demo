import styled from "@emotion/styled";
import { faBookmark, faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArrowBack, ArrowBackIos, ArrowForward, Close, Inventory2Outlined, LocationOn, LocationOnOutlined, NearMe, Search } from "@mui/icons-material";
import { Container, Button, IconButton, InputBase, FormHelperText, useMediaQuery, Icon, TextField, Typography, Modal, Fade, Box } from "@mui/material";
import { storage_type_routes } from "app/sections/Options/routes";
import { makeListingTitle } from "app/utils/listings/utils";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import { useEffect, useReducer, useRef, useState } from "react";
import { isValidNumber, isValidZipCode } from "../UserAuth/SignUp/utils";
import { useFetcher, useLocation, useNavigate } from "react-router-dom";
import InputAdornment from '@mui/material/InputAdornment';
import { useTheme } from "@emotion/react";
import { LoadingComponent } from "app/utils/loading/component";
import isStandalone from "isStandalone";
import { LoadingSpinner } from "app/utils/loading/component";
import conditionalNavigation from "conditionalNavigation";

const { default: colors } = require("assets/theme/base/colors");

const SearchFlow = ({ open, onClose, init_searchtype, insideNavbar}) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const searchParamaters = new URLSearchParams(location.search)

    const [storageType, setStorageType] = useState(searchParamaters.get('storageType') || init_searchtype || '')
    const [search, setSearch] = useState(searchParamaters.get('search') || '')
    const lat = searchParamaters.get('lat')
    const lng = searchParamaters.get('lng')

    const onSearch = () => {
        setLoading(true);
        if (search) {
            conditionalNavigation(navigate, `/explore?search=${search}`.concat(`&storageType=${storageType}`))
        }
        else if (lat && lng) {
            conditionalNavigation(navigate, `/explore?lat=${lat}&lng=${lng}`.concat(`&storageType=${storageType}`))
        }
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && window.location?.pathname === '/') {
            onSearch();
        }
    })

    return (
        <Modal
            sx={{
                zIndex:100000,
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                top:isStandalone()?0:82,
            }}
            BackdropProps={{
                style: {
                    backgroundColor:'rgba(0,0,0,0)'
                }
            }}
            open={open}
            closeAfterTransition
        >
            <Fade in={open} enter={200} exit={200}
            >
                <Box
                    sx={{
                        width:'100%',
                        display:'flex',
                        flexDirection:'column',
                        height:'100%',
                        bgcolor:'#fff',
                        maxHeight:`calc(100dvh - ${isStandalone()?0:82})`
                    }}
                >
                    <Container
                        sx={{
                            py:2,
                            gap:2,
                            width:'100%',
                            height:'100%',
                            maxHeight:{xs:'calc(100% - 125px)', lg:'calc(100% - 75px)'},
                            overflowY:'auto',
                            display:'flex',
                            flexDirection:'column',
                        }}
                    >
                        <Box
                            sx={Styles.Module}
                        >
                            <Box
                                sx={{
                                    display:'flex',
                                    alignItems:'center',
                                }}
                            >
                                <Typography
                                    sx={{
                                        color:'#333',
                                        fontSize:'1.5rem',
                                        fontWeight:600,
                                    }}
                                >
                                    Where?
                                </Typography>
                                <LocationOnOutlined 
                                    sx={{
                                        mb:.5,
                                        ml:'auto',
                                        color:'#333',
                                    }}
                                />
                            </Box>
                            <TextField
                                autoFocus
                                placeholder='Search by location...'
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value)
                                }}
                                InputProps={{
                                    style:{
                                        fontSize:'1.2rem',
                                        fontWeight:500,
                                    },
                                    startAdornment: (
                                        <InputAdornment
                                            sx={{
                                                mr:.5,
                                                display:'flex',
                                                alignItems:'center',
                                                justifyContent:'center',
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="24" height="24">
                                                <circle cx="12" cy="12" r="8" stroke="#ababab" stroke-width="1.5" fill="none"/>
                                                <line x1="18" y1="18" x2="26" y2="26" stroke="#ababab" stroke-width="1.5"/>
                                            </svg>
                                        </InputAdornment>
                                    )
                                }}
                                inputProps={{
                                    style: {
                                        paddingLeft:6,
                                        paddingRight:6,
                                        paddingTop:12,
                                        paddingBottom:12,
                                    }
                                }}
                                sx={{
                                    width:'100%',
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius:3,
                                    },
                                    '& .MuiOutlinedInput-input': {
                                        borderRadius:3,
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': { borderRadius:3, }
                                }}
                            />
                        </Box>
                        <Box
                            sx={Styles.Module}
                        >
                            <Box
                                sx={{
                                    display:'flex',
                                    alignItems:'center',
                                }}
                            >
                                <Typography
                                    sx={{
                                        color:'#333',
                                        fontSize:'1.5rem',
                                        fontWeight:600,
                                    }}
                                >
                                    What?
                                </Typography>
                                <Inventory2Outlined 
                                    sx={{
                                        mb:.5,
                                        ml:'auto',
                                        color:'#333',
                                    }}
                                />
                            </Box>


                            <Box
                                sx={{
                                    gap:2,
                                    display:'grid',
                                    gridTemplateColumns:'repeat(2, 1fr)'
                                }}
                            >
                                {storage_type_routes.map((rt, idx) => {
                                    const active = storageType === rt?.name;

                                    return (
                                        <Box
                                            sx={{
                                                gap:1,
                                                px:2,
                                                py:1,
                                                display:'flex',
                                                flexDirection:'column',
                                                borderRadius:3,
                                                border:`2px solid ${active?colors.info.main:'#ededed'}`,
                                                userSelect:'none',
                                                cursor:'pointer',
                                            }}
                                            onClick={() => setStorageType(rt.name)}
                                        >
                                            <Icon
                                                sx={{
                                                    width:30,
                                                    height:30,
                                                    display:'flex',
                                                    alignItems:'center',
                                                    justifyContent:'center',
                                                    color:active?colors.info.main:'#ababab',
                                                }}
                                            >
                                                {rt.icon}
                                            </Icon>
                                            <Typography
                                                sx={{
                                                    color:active?colors.info.main:'#ababab',
                                                }}
                                            >
                                                {rt.name.replaceAll('or', '/')}
                                            </Typography>
                                        </Box>
                                    )
                                })}
                            </Box>
                        </Box>
                    </Container>
                    <Box
                        sx={Styles.Bottom}
                    >
                        <Button
                            sx={{
                                ...Styles.ActionButton,
                                bgcolor:'#efefef !important',
                                color:'#737373 !important',
                            }}
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={loading}
                            sx={{
                                ...Styles.ActionButton,
                                bgcolor:`${loading ? '#fff' : colors.info.main} !important`,
                                border:loading&&'1px solid #ababab',
                                color:'#fff !important',
                            }}
                            onClick={onSearch}
                        >
                            {loading ?
                                <LoadingSpinner compact />

                                :
                                
                                <>
                                    <Search sx={{mr:1,scale:1.5}}/>Search 
                                </>
                            }
                            
                        </Button>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
};

export default SearchFlow;

const Styles = {
    Module: {
        p:3,
        gap:2,
        width:'100%',
        display:'flex',
        flexDirection:'column',
        borderRadius:4,
        boxShadow:'0px 6px 12px rgba(0,0,0,0.1)'
    },
    Bottom: {
        gap:2,
        p:2,
        pb:{xs:6,lg:2},
        width:'100%',
        minHeight:{xs:125,lg:75},
        maxHeight:{xs:125,lg:75},
        bgcolor:'#fff',
        boxShadow:16,
        display:'flex',
        alignItems:'center',
        justifyContent:{xs:'unset',lg:'space-between'},
    },
    ActionButton: {
        px:2,
        py:1.5,
        width:{xs:'100%',lg:'fit-content'},
        fontWeight:550,
        fontSize:'1rem',
    },
}