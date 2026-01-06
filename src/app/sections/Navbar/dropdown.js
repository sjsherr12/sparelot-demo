import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import MKBox from "components/MKBox";
import colors from "assets/theme/base/colors";
import { useModal } from "../Modal/Parent/context";
import { ArrowDownward, ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { Icon, Typography } from "@mui/material";
import { Children, useState } from "react";
import MKButton from "components/MKButton";
import { useUserAuthState } from "app/backend/user/auth/reactprovider";
import styled from "@emotion/styled";


const Overlay = styled(MKBox)(({open}) => ({
  display: open ? 'flex' : 'none',
  position:'fixed',
  top:0,
  left:0,
  zIndex:100,
  width:'100vw',
  height:'100dvh'
}))

const NavbarDropdown = ({
  name,
  icon,
  collapseStatus,
  light,
  href,
  onclick,

  route,
  collapse,

  modalTitle,
  modalChildren,

  children,
  Renderable,

  color,
  bgcolor,

  loggedIn,
  loggedInPage,

  isMobileNavbar,

  ...rest
}) => {
  const linkComponent = {
    component: "a",
    href,
    target: "_blank",
    rel: "noreferrer",
  };

  const routeComponent = {
    component: Link,
    to: route,
  };

  const { openModal } = useModal();
  const { user, logout } = useUserAuthState();

  const [childrenVisible, setChildrenVisible] = useState(false);

  const handleClick = () => {

    { onclick && onclick();}

    if (user !== null && loggedInPage !== null)
    {
      (window.location.href=loggedInPage);
      return;
    }

    { modalTitle && modalChildren &&
      openModal(modalTitle, modalChildren);
    }

    setChildrenVisible(!childrenVisible);
    
  }

  return (
    <>
      <style>
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
      </style>
      <MKBox sx={{display:'flex', justifyContent:'space-between'}}>
      <MKBox
        {...rest}
        padding={1}
        display="flex"
        alignItems="center"
        sx={{ 
          cursor: "pointer", 
          userSelect: "none",
          color:color,
          backgroundColor:bgcolor,
          marginRight:{xs:'0px', xl:'0px', xxl:'20px'},
          whiteSpace:'nowrap'
        }}
        {...(route && routeComponent)}
        {...(href && linkComponent)}
        onClick={handleClick}
      >
        {icon &&
          <Typography
            variant="body2"
            lineHeight={1}
            color={colors.text.main}
            sx={{ 
              alignSelf: "center", "& *": { verticalAlign: "middle" },
              fontSize: "20px",
            }}
          >
            {icon}
          </Typography>
        }

        {name &&
          <MKBox
            sx={{
              position:'relative',
              color:colors.background.theme,
            }}
          >
            <Typography
              color='inherit'
              lineHeight={1}
              sx={{
                color:'#000',
                padding:1, pb:0.5,
                fontSize:18,
                fontWeight:500,
              }}
            >
              {(user !== null && loggedIn !== null)?loggedIn:name}
              {
                children

                &&

                <Icon 
                  sx={{
                    color:'inherit',
                    mb:-0.5
                  }}
                >
                  {
                    childrenVisible
                    ?
                    <ArrowDropUp/>
                    :
                    <ArrowDropDown/>
                  }
                  
                </Icon>
              }
            </Typography>

            {
              children

              &&

              <MKBox
                sx={{
                  position:isMobileNavbar ? 'relative' : 'absolute',
                  top:isMobileNavbar ? 10 : 58,
                  left:-15,
                  width:200,
                  height:isMobileNavbar ? childrenVisible ? 'fit-content' : 0 : 'fit-content',
                  backgroundColor:'#fff',
                  opacity:childrenVisible?1:0,
                  pointerEvents:childrenVisible?'auto':'none',
                  zIndex:101,

                  transition:isMobileNavbar ? 'unset' : '0.25s all ease-out',
                  boxShadow:'rgba(0, 0, 0, 0.25) 0px 16px 16px',
                }}
              >
                {
                  (children.map((child, idx) => (
                    <>
                      <MKButton
                        sx={{
                          width:'100%',
                          borderRadius:0,
                          bgcolor:'#fff',
                          display:'flex',
                          textAlign:'left',
                          alignItems:'left',
                          justifyContent:'left',

                          textTransform:'none',

                          '&:hover':{ 
                            backgroundColor:'#eee',
                          }
                        }}
                        onClick={child.onclick}
                      >
                        <Typography
                          sx={{
                            textAlign:'left',
                            fontSize:'18px',
                            fontWeight:'480'
                          }}
                        >
                          {child.name}
                        </Typography>
                      </MKButton>
                    </>
                  )))
                }
              </MKBox>
            }
          </MKBox>
        }
      </MKBox>
      </MKBox>

      {
        Renderable

        &&

        <Renderable visible={childrenVisible}/>
      }
      {
        children

        &&
        
        <Overlay open={childrenVisible} onClick={() => setChildrenVisible(false)}></Overlay>
        }
    </>
  );
}

// Setting default values for the props of DefaultNavbarDropdown
NavbarDropdown.defaultProps = {
  children: false,
  collapseStatus: false,
  light: false,
  href: "",
  route: "",
};

// Typechecking props for the DefaultNavbarDropdown
NavbarDropdown.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  children: PropTypes.node,
  collapseStatus: PropTypes.bool,
  light: PropTypes.bool,
  href: PropTypes.string,
  route: PropTypes.string,
  collapse: PropTypes.bool.isRequired,
};

export default NavbarDropdown;