import { Fragment, useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Container from "@mui/material/Container";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import AccountChildren from "../Navbar/dynamic";
import SignupLogo from 'assets/logos/SignupLogo.png';
import colors from "assets/theme/base/colors";
import breakpoints from 'assets/theme/base/breakpoints';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Collapse, Typography, Box} from '@mui/material';
import { HostOptionButton } from "app/pages/mobile/Hosting/common";
import Hr from "app/utils/Hr";
import host_routes from "./routes";

const HostNavbar = () => {
    const navigate = useNavigate();
    const [selectedNav, setSelectedNav] = useState(''); // Default selected path
    const location = useLocation();
    const [mobileView, setMobileView] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
  
    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };
  
    const handleNavigate = (route) => {
      toggleMenu(); // Close menu after selecting an option
      navigate(route);
    };

    const handleNavClick = (path) => {
        setSelectedNav(path);
        navigate(path);
    };

    useEffect(() => {
        const resize = () => {
          setMobileView(window.innerWidth < breakpoints.values.lg);
        }
    
        window.addEventListener("resize", resize);
        resize();
        return () => window.removeEventListener("resize", resize);
    }, []);

    return (
        <>
            <MKBox
                sx={{
                    width: '100%',
                    height:menuOpen?'100dvh':80,
                    backgroundColor: '#fff',
                }}
            />
            <MKBox
                sx={{
                    top: 0,
                    left: 0,
                    zIndex:999,
                    width: '100%',
                    minHeight: 82,
                    display: 'flex',
                    position: 'fixed',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    color: colors.text.focus,
                    justifyContent: 'center',
                    boxShadow:'0px 0px 12px rgba(0,0,0,.2)',
                }}
            >
                <Box sx={{width:'100%', px:2,}}>
                    {!mobileView && (
                        <MKBox sx={{ backgroundColor: '#fff', width: '100%', display: 'flex', alignItems: 'center', gap:2, }}>
                        <MKBox
                            lineHeight={1}
                            py={1.5}
                            mr={2}
                            onClick={() => window.location.href='/'}
                            sx={{
                                cursor: 'pointer',
                                width: { xs: 44, md: 50 },
                            }}
                        >
                            <img src={SignupLogo} width='50px' height='auto' draggable={false} alt=''/>
                        </MKBox>
                        
                        <MKBox sx={{ display: 'flex', gap:2,mr:'auto'}}>
                            {host_routes.map((route, idx) => {
                                const active = route.subroutes.some(sub => sub.route === location?.pathname)
                                return (
                                    <Typography
                                        key={idx}
                                        sx={{
                                            ...Styles.DesktopCategories,
                                            color:active?'#333':'#737373',
                                            bgcolor:active?'rgba(46,137,255,0.15)':'#fff',
                                        }}
                                        onClick={() => handleNavClick(route.route)}
                                    >
                                        {route.title}
                                    </Typography>
                                )
                            })}
                        </MKBox>

                        <HostOptionButton
                            color='sparelot'
                            onClick={() => {
                                window.location.href='/'
                            }}
                            sx={{
                                fontSize:14,
                                height:'100%',
                            }}
                        >
                            Switch to Renting
                        </HostOptionButton>

                        <MKBox sx={{alignItems:'center'}}>
                            <AccountChildren />
                        </MKBox>
                    </MKBox>
                    )}
                    {mobileView && (
                        <>
                        <MKBox sx={{ backgroundColor: '#fff', width: '100%', display: 'flex', alignItems: 'center',}}>
                            <MKBox
                                lineHeight={1}
                                py={1.5}
                                mr='auto'
                                onClick={() => navigate('/')}
                                sx={{
                                    cursor: 'pointer',
                                    width: { xs: 44, md: 50 },
                                }}
                            >
                                <img src={SignupLogo} width='50px' height='auto' draggable={false} alt='SpareLot logo' />
                            </MKBox>
                            <MKBox position="relative">
                            <IconButton
                                onClick={toggleMenu}
                                edge="end"
                                color="inherit"
                                aria-label="menu"
                                sx={{ zIndex: 9999, cursor: 'pointer' }}
                            >
                                {menuOpen ? <CloseIcon style={{height:'32px', width:'auto', color:'#000'}}/> : <MenuIcon style={{height:'32px', width:'auto', color:'#000',}}/>}
                            </IconButton>
                        </MKBox>
                        </MKBox>
                        <Collapse in={menuOpen} timeout="auto" unmountOnExit sx={{position:'absolute', top:'105%', width:'100%', bgcolor:'#fff' }}>
                            <MKBox
                            bgcolor="#fff" // Grey-ish white background
                            height='100dvh' // Animate height
                            sx={{width:{xs:'93.5%', sm:'91.2%', md:'93.3%'},}}
                            >
                                <MKBox display="flex" flexDirection="column" py={3} sx={{ height:'100dvh'}}>
                                    <MKBox sx={{height:'86.6dvh', display:'flex', flexDirection:'column',}}>
                                        <MKBox>
                                            {host_routes.map((route, idx) => {
                                                const active = route.subroutes.some(sub => sub.route === location?.pathname)
                                                return (
                                                    <HostOptionButton
                                                        key={idx}
                                                        color={active ? 'sparelot': 'light'}
                                                        onClick={() => handleNavigate(route.route)}
                                                        sx={{
                                                            mb:1.5,
                                                            width:'100%',
                                                        }}
                                                    >
                                                        {route.title}
                                                    </HostOptionButton>
                                                )
                                                
                                            })}
                                            
                                            <Hr sx={{mt:.5,mb:2}} />

                                            <HostOptionButton
                                                color='info'
                                                onClick={() => window.location.href='/account'}
                                                sx={{
                                                    mb:1.5,
                                                    width:'100%',
                                                }}
                                            >
                                                Your Account
                                            </HostOptionButton>
                                            <HostOptionButton
                                                color='sparelot'
                                                onClick={() => window.location.href='/'}
                                                sx={{
                                                    mb:1,
                                                    width:'100%',
                                                }}
                                            >
                                                Switch to Renting
                                            </HostOptionButton>
                                        </MKBox>
                                    </MKBox>
                                </MKBox>
                            </MKBox>
                        </Collapse>
                        </>
                    )}
                </Box>
            </MKBox>
        </>
    );
}

export default HostNavbar;

const Styles = {
    DesktopCategories: {
        px:2,
        py:1,
        fontSize:14,
        fontWeight:600,
        borderRadius:16,
        cursor:'pointer',
        border:'2px solid #fff',
        userSelect:'none',
        '&:hover':{
            color:'#333',
            border:'2px solid rgba(46,137,255,0.15)'
        },
        '&:active':{
            scale:.95,
        },
        transition:'scale .2s ease-in-out'
    }
}