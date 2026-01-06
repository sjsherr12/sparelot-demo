import { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

import Collapse from "@mui/material/Collapse";
import MuiLink from "@mui/material/Link";

import MKBox from "components/MKBox";
import { Container, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {IconButton} from "@mui/material";

import NavbarDropdown from "./dropdown";

import InfoIcon from '@mui/icons-material/Info';
import FeedIcon from '@mui/icons-material/Feed';
import HandshakeIcon from '@mui/icons-material/Handshake';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import HelpIcon from '@mui/icons-material/Help';

import MessageIcon from '@mui/icons-material/Message';
import InventoryIcon from '@mui/icons-material/Inventory';
import BookmarkIcon from '@mui/icons-material/Bookmark';

import SearchIcon from '@mui/icons-material/Search';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HomeIcon from '@mui/icons-material/Home';

import { useUserAuthState } from "app/backend/user/auth/reactprovider";
import SearchFlow from "../Modal/SearchFlow";
import colors from "assets/theme/base/colors";
import { HostOptionButton } from "app/pages/mobile/Hosting/common";
import Hr from "app/utils/Hr";

function NavbarMobile({ routes, open, setOpen}) {

  const [renderableVisible, setRenderableVisible] = useState(false);

  const {user} = useUserAuthState();
  const navigate = useNavigate();

  const [companyOpen, setCompanyOpen] = useState(false);
  const toggleCompanyOpen = () => {
    setCompanyOpen(!companyOpen);
  }

  const [resourcesOpen, setResourcesOpen] = useState(false);
  const toggleResourcesOpen = () => {
    setResourcesOpen(!resourcesOpen);
  }

  const [accountInfoOpen, setAccountInfoOpen] = useState(false);
  const toggleAccountInfoOpen = () => {
    setAccountInfoOpen(!accountInfoOpen);
  }

  
  const main_options = [
    {
      name:'Company',
      cond:true,
      open:companyOpen,
      toggle:() => {
        setCompanyOpen(!companyOpen)
      },
      routes:[
        {
          name:'About Us',
          icon:InfoIcon,
          href:'/about'
        },
        {
          name:'Press Stories',
          icon:FeedIcon,
          href:'/press'
        },
        {
          name:'Partners and Affiliates',
          icon:HandshakeIcon,
          href:'/partners',
        },
      ]
    },
    {
      name:'Resources',
      cond:true,
      open:resourcesOpen,
      toggle:() => {
        setResourcesOpen(!resourcesOpen)
      },
      routes:[
        {
          name:'Help Center',
          icon:HelpCenterIcon,
          href:'/help'
        },
        {
          name:'Feedback and Reviews',
          icon:ThumbUpAltIcon,
          href:'/feedback'
        },
        {
          name:'Frequently Asked Questions',
          icon:HelpIcon,
          href:'/help/faqs',
        },
      ]
    },
    {
      name:'Account',
      cond:user,
      open:accountInfoOpen,
      toggle:() => {
        setAccountInfoOpen(!accountInfoOpen)
      },
      routes:[
        {
          name:'Messages',
          icon:MessageIcon,
          href:'/messages'
        },
        {
          name:'Rental Spaces',
          icon:InventoryIcon,
          href:'/account/rentals/active'
        },
        {
          name:'Saved Listings',
          icon:BookmarkIcon,
          href:'/saved',
        },
      ]
    },
  ]

  const sub_options = [
    {
      name:'Log In',
      cond:!user,
      icon:AccountCircleIcon,
      href:'/login',
      bgcolor:'info'
    },
    {
      name:'Sign Up',
      cond:!user,
      icon:AccountBoxIcon,
      href:'/signup',
      bgcolor:'info'
    },
    {
      name:'Become a Host',
      cond:!user,
      icon:HomeIcon,
      href:'/hosting',
      bgcolor:'sparelot',
    },
    {
      name:'Profile',
      cond:user,
      icon:AccountCircleIcon,
      href:'/account',
      bgcolor:'info'
    },
    {
      name:'Switch to Hosting',
      cond:user,
      icon:SwapHorizontalCircleIcon,
      href:'/hosting/operations/earnings',
      bgcolor:'sparelot'
    },
  ]

  useEffect(() => {
    if (open) {
      // Disable scrolling
      document.body.style.overflow = 'hidden';
    } else {
      // Enable scrolling
      document.body.style.overflow = 'auto';
    }

    // Cleanup function to restore scroll when component unmounts or open changes
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  return (
    <>
      <MKBox sx={{ position: 'fixed', width: '100%', overflow: 'visible', display:renderableVisible ? 'none' : 'block', top:0, left:0, zIndex:100 }}> {/* Ensure this parent has no padding or margin */}
        <Collapse 
          in={Boolean(open)} 
          timeout="auto" 
          unmountOnExit 
          sx={{
            mt:8,
            width:'100%',
            bgcolor: '#fff', 
            zIndex: 1000, 
          }}
        >
          <MKBox 
            bgcolor="#fff" 
            height='100dvh' 
            sx={{
              pt:2,
              width: '100%',
            }}
          >
            <Container>
              {main_options.map((opt, idx) => (<>
                {opt.cond &&
                  <MKBox
                    sx={{
                        borderBottom:'1px solid #d4d4d4',
                        cursor: 'pointer',
                        pb:opt.open?2:1,
                        my:2,
                    }}
                    onClick={opt.toggle}
                  >
                    <MKBox>
                      <MKBox display="flex" alignItems="center">
                          <Typography variant="h5" sx={{ flex: 1, userSelect:'none',  fontSize:20, color:'#000', fontWeight:'660'}}>
                            {opt.name}
                          </Typography>
                          <IconButton edge='end' sx={{ marginLeft: 'auto' }}>
                            <ExpandMoreIcon sx={{ 
                              transform: opt.open ? 'rotate(180deg)' : 'rotate(0)', 
                              transition: 'transform 0.3s ease',
                              height:'30px',
                              width:'auto',
                              color:'#858585'
                            }}/>
                          </IconButton>
                      </MKBox>

                      <Collapse in={opt.open} timeout="auto" unmountOnExit>
                        {opt.routes.map((route, idx) => (
                          <MKBox 
                            sx={{
                              display:'flex', 
                              alignItems:'center', 
                              mt:1.5, 
                              borderRadius:2, 
                              '&:hover': {
                                bgcolor:'#f7f8fa'
                              }
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              window.location.href=route?.href;
                              setOpen(false);
                            }}
                          >
                            <MKBox sx={{width:35, height:35, bgcolor:'#e6e8eb', borderRadius:2, alignItems:'center', justifyContent:'center', display:'flex', mr:2}}>
                              <route.icon style={{color:'#2e89ff', height:'20px', width:'auto'}}/>
                            </MKBox>
                            <Typography variant="body1" sx={{  fontSize:'18px', color:'#3e3e3f', fontWeight:'550' }}>
                              {route.name}
                            </Typography>
                          </MKBox>
                        ))}
                      </Collapse>
                    </MKBox>
                  </MKBox>
                }
              </>))}
              <MKBox onClick={() => setRenderableVisible(true)} sx={{
                mb: 2,
                cursor: 'pointer',
                borderRadius:'14px',
                py:'14px',
                border:'2px solid #d4d4d4',
                display:'flex',
                px:'16px',
                alignItems:'center'
              }}>
                <MKBox sx={{width:'42px', height:'42px', bgcolor:'#e6e8eb', borderRadius:'8px', alignItems:'center', justifyContent:'center', display:'flex', mr:'16px'}}>
                  <SearchIcon style={{color:'#2e89ff', height:'30px', width:'auto'}}></SearchIcon>
                </MKBox>
                <Typography variant='h6' sx={{ fontSize:'24px', color:'#000', fontWeight:'660'}}>
                  Find Storage
                </Typography>
              </MKBox>
              <Hr />
              {sub_options.map((opt, idx) => (
                <MKBox
                  sx={{
                    display:'flex',
                    flexDirection:'column',
                    width:'100%',
                  }}
                >
                  {opt.cond &&
                    <HostOptionButton 
                      color={opt.bgcolor}
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href=opt?.href;
                        setOpen(false);
                      }}
                      sx={{
                        mt:1.5,
                      }}
                    >
                      <opt.icon sx={{color:'#fff', height:20, width:'auto', mr:1,}}/>
                        {opt.name}
                    </HostOptionButton>
                  }
                </MKBox>
              ))}
            </Container>
          </MKBox>
        </Collapse>
      </MKBox>
      {renderableVisible && <SearchFlow open={renderableVisible} onClose={() => setRenderableVisible(false)}/>}
    </>
  );
}

// Typechecking props for the NavbarMobile
NavbarMobile.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])).isRequired,
  open: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
};

export default NavbarMobile;