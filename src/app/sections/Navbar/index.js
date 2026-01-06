import { Fragment, useState, useEffect } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";
import Menu from "@mui/icons-material/Menu"
import Close from "@mui/icons-material/Close"
import { Box, IconButton } from '@mui/material';

import MKBox from "components/MKBox";
import MKButton from "components/MKButton";

import breakpoints from "assets/theme/base/breakpoints";

import colors from "assets/theme/base/colors"
import NavbarDropdown from "./dropdown";
import NavbarMobile from "./webMobile";
import { useModal } from "../Modal/Parent/context";
import { useUserAuthState } from "app/backend/user/auth/reactprovider";
import { userauth_actions, userauth_title } from "../Modal/actions";
import { Avatar, Button, styled } from "@mui/material";
import { Person } from "@mui/icons-material";
import AccountChildren from "./dynamic";
import { HostOptionButton } from "app/pages/mobile/Hosting/common";

const Navbar = ({
  actions,
  web_routes,
  mobile_routes,
  shadow,
  imglogo,
  backgroundColor,
}) => {

  const location = useLocation();
  const navigate = useNavigate();
  const {user, logout} = useUserAuthState();
  const [mobileView, setMobileView] = useState(false);
  const [mobileNavbar, setMobileNavbar] = useState(false);

  const custom_impl_map = {
    'custom_impl_checkout' : () => navigate(-1)
  }

  const renderNavbarItems = web_routes ? web_routes.map((web_route, idx) => (
    <NavbarDropdown
      key={idx}
      name={web_route.name}
      icon={web_route.icon}
      href={web_route.href}
      onclick={web_route.onclick}
      color={web_route.nav_text_color}

      modalTitle={web_route.modalTitle}
      modalChildren={web_route.modalChildren}

      children={web_route.children}
      Renderable={web_route.Renderable}

      loggedIn={web_route.loggedIn?web_route.loggedIn:null}
      loggedInPage={web_route.loggedInPage?web_route.loggedInPage:null}
    />
  )) : ( <></>);

  const { openModal } = useModal();

  const handleClick = (action) => {

    if (typeof action.onclick === 'string') {
      custom_impl_map[action.onclick]();
      return;
    }
    if (user !== null && action.loggedIn) {
      window.location.href=action.loggedInPage;
      return; // very specific case, doesnt allow popups
    }
    { action.onclick && action.onclick();}

    { action.modalTitle && action.modalChildren &&
      openModal(action.modalTitle, action.modalChildren);
    }
  }

  useEffect(() => {
    const resize = () => {
      setMobileView(window.innerWidth < breakpoints.values.xl);
    }

    window.addEventListener("resize", resize);
    resize();
    return () => window.removeEventListener("resize", resize);
  }, []);

  const Wrapper = Box;

  return (
    <>
      <MKBox
        sx={{
          width:'100%',
          height:82,
          backgroundColor:'#fff',
        }}
      />
      <MKBox
        shadow= {shadow && !mobileNavbar ? "md" : "none"}
        
        sx={{
          width:'100%',
          color: colors.text.focus,
          backgroundColor: '#fff',
          position: 'fixed', 
          top: 0,
          minHeight:82,
          left:0,
          zIndex: 1000,
          display:'flex', justifyContent:'center',
          alignItems:'center',
          borderBottom:'1px solid #ededed',
        }}
      >
        <Wrapper sx={{backgroundColor:'#fff', width:'100%', px:2.5,}}>
          <MKBox display="flex" justifyContent="space-between" alignItems="center">
            <MKBox
              component='a'
              href='/'
              lineHeight={1}
              py={1.5}
              mr={{xs:0.5, xl:1, xxl:2}}
              sx={{
                cursor:'pointer',
                width:205,
                display:'flex',
              }}
            >
              <img src={imglogo} width='188px' height='auto' draggable={false}/>
            </MKBox>
            <MKBox
              sx={{
                color:"inherit",
                display:{ xs: "none", lg: "flex" },
                mb:0.5,
                mr:"auto",
              }}
            >
              {renderNavbarItems}
            </MKBox>

            <MKBox 
              sx={{
                gap:2,
                ml:{ xs: "auto", md:'auto', lg: 2, }, 
                display:{xs:"none", lg:"flex"},
                alignItems:'center'
              }}
            >
              {actions.map((action, idx) => (
                <HostOptionButton
                  component={Link}
                  onClick={()=>{handleClick(action)}}
                  color={action.color}

                  sx={{
                    fontSize:14,
                    height:'100%',
                  }}
                >
                  {(user !== null && action.loggedIn !== undefined) ? action.loggedIn : action.label }
                </HostOptionButton>
              ))}

              {
                user

                ?

                <AccountChildren/>

                :

                <HostOptionButton
                  component={Link}
                  onClick = {() => {
                    openModal(userauth_title, userauth_actions)
                  }}
                  color='info'
                  sx={{
                    fontSize:14,
                    height:'100%',
                  }}
                >
                  Login
                </HostOptionButton>
              }

            </MKBox>
            
              <IconButton edge='end' fontSize="inherit" onClick={() => setMobileNavbar(!mobileNavbar)} sx={{display:{xs:'inline-block', lg:'none'},zIndex:1000}}>{mobileNavbar ? <Close style={{height:'32px', width:'auto', color:'#000', position:'relative', top:4}}/> : <Menu style={{height:'32px', width:'auto', color:'#000', position:'relative', top:4}}/>}</IconButton>
          </MKBox>
          </Wrapper>
      </MKBox>
      <MKBox bgColor={backgroundColor} >
            {mobileView && <NavbarMobile routes={mobile_routes} open={mobileNavbar} setOpen={setMobileNavbar}/>}
          </MKBox>
    </>
  )
}

export default Navbar;