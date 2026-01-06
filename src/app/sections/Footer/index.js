import React, { useState } from 'react';
import { Avatar, Container, Grid, Icon, IconButton, Typography } from '@mui/material';
import { Instagram, Facebook, Face, LinkedIn } from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTiktok } from '@fortawesome/free-brands-svg-icons';
import MKBox from 'components/MKBox';
import colors from 'assets/theme/base/colors';
import './footer.css'
import logo from 'assets/logos/sparelot_llc_logo.png'
import SearchFlow from '../Modal/SearchFlow';
import Link from '@mui/material/Link';

const Footer = () => {
  
    const [searchTypes, setSearchTypes] = useState({
        Items: false,
        Parking: false,
        Trailer: false,
        RVorCamper: false,
        Boat: false,
        Oversized: false,
      });
  
      const [searchFlowActive, setSearchFlowActive] = useState(false);
  
    return (
    <>
    <MKBox
        sx={{
            backgroundColor:colors.background.theme,
            pt:{xs:'10px', md:'20px'},
            pb:'5px'
        }}
    >
        <Container sx={{display:"block"}}>
            <img src={logo} id="footer-logo"></img>
            <MKBox
                sx={{
                    display:{xs:'block', lg:"flex"},
                }}
            >
<MKBox
  id="background-container"
  sx={{
    display: 'grid',
    gridTemplateColumns: { 
      xs: 'minmax(60%, 1fr) 1fr', 
      lg: 'repeat(3, 1fr)' 
    },
    gap: 2, // Add spacing between grid items
    mb: { xs: '-15px', lg: '10px' },
    width: { xs: '100%', lg: '65%' },
  }}
>
  {[
    {
      id: "items",
      title: "Item Storage",
      links: [{ label: "Storage near me", type: { Items: true } }],
    },
    {
      id: "vehicles",
      title: "Vehicle Storage",
      links: [
        { label: "Car storage", type: { Cars: true } },
        { label: "Boat storage", type: { Boat: true } },
        { label: "RV storage", type: { RVorCamper: true } },
      ],
    },
    {
      id: "parking",
      title: "Parking",
      links: [
        { label: "Monthly parking", type: { Cars: true } },
        { label: "Long-term parking", type: { Cars: true } },
      ],
    },
    {
      id: "commercial",
      title: "Commercial",
      links: [
        { label: "Product inventory", type: { Items: true } },
        { label: "Warehouse storage", type: { Items: true } },
      ],
    },
    {
      id: "company",
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Become a host", href: "/hosting" },
        { label: "Press", href: "/press" },
        { label: "Partners", href: "/partners" },
      ],
    },
    {
      id: "support",
      title: "Support",
      links: [
        { label: "Help center", href: "/help" },
        { label: "Product feedback", href: "/feedback" },
        { label: "FAQs", href: "/help/faqs" },
      ],
    },
  ].map((section) => (
    <MKBox key={section.id} className="boxes">
      <Typography
        variant="h2"
        sx={{
          color: "#fff",
          fontSize: { xs: "20px", md: "28px" },
        }}
      >
        {section.title}
      </Typography>
      {section.links.map((link, index) =>
        link.href ? (
          <a key={index} href={link.href}>
            <Typography
              variant="h4"
              sx={{
                color: "#fff",
                fontWeight: "normal",
                fontSize: { xs: "15px", md: "18px" },
                mb: "6px",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {link.label}
            </Typography>
          </a>
        ) : (
          <Typography
            key={index}
            variant="h4"
            onClick={() => {
              setSearchTypes(link.type);
              setSearchFlowActive(true);
            }}
            sx={{
              color: "#fff",
              fontWeight: "normal",
              fontSize: { xs: "15px", md: "18px" },
              mb: "6px",
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            {link.label}
          </Typography>
        )
      )}
    </MKBox>
  ))}
</MKBox>


                <MKBox
                    id="side-info"
                    sx={{
                        flexGrow:1,
                        width:{xs:'100%', lg:'35%'},
                    }}
                >
                    <Typography variant='h2' sx={{ color: '#fff', fontSize: { xs: '26px', md: '31px' }, mb:{xs:'-8px', md:'0px'} }}>
                        Search. Store. Save
                    </Typography>
                    <Typography variant='h5' sx={{color: '#fff', fontSize: { xs: '16px', md: '18px' }, fontWeight:'500'}}>
                        Founded in 2024, SpareLot is a peer-to-peer storage and parking marketplace. We connect renters looking for safe, convenient, and affordable storage with trusted hosts seeking to utilize their extra space.
                    </Typography>

                    <MKBox
                        sx={{
                            display:'none',
                            my:2.5,
                        }}
                    >
                        <MKBox
                            onClick={()=>{}}
                            sx={{

                                '&:hover':{
                                    cursor:'pointer',
                                },
                                mr:1.5
                            }}
                        >
                            <img height='42px' draggable={false} src='https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg'/>
                        </MKBox>

                        <MKBox
                            onClick={()=>{}}
                            sx={{

                                '&:hover':{
                                    cursor:'pointer',
                                }
                            }}
                        >
                            <img height='42px' draggable={false} src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1920px-Google_Play_Store_badge_EN.svg.png'/>
                        </MKBox>
                    </MKBox>
                </MKBox>
            </MKBox>

            <hr></hr>

            <MKBox
                id="footer-bottom"
                sx={{
                    whiteSpace:'nowrap',
                    display:'inline-flex',
                    width:'100%',
                }}

            >
                <MKBox
                    sx={{
                        width:'100%'
                    }}
                >
                    <MKBox
                        sx={{
                            display:'flex',
                            color:colors.white.main,
                            width:'100%',
                            mt:'2px'
                        }}
                    >
                        <MKBox
                            sx={{
                                color:colors.white.main,
                                display:'flex',
                                alignItems:'center',
                            }}
                        >
                            <Typography variant='h6' sx={{fontSize:{xs:'14px', md:'16px'}, fontWeight:'530',}}>© {new Date().getFullYear()} SpareLot LLC</Typography>
                            <Link href="/terms-of-service" sx={{display:{xs:'none',md:'flex'}}}>
                                <Typography variant='h6' sx={{textDecoration: 'none', '&:hover': { textDecoration: 'underline' }, fontSize:'16px', fontWeight:'530'}}>Terms of Service</Typography>
                            </Link>
                            <Link href="/privacy-policy" sx={{display:{xs:'none',md:'flex'}}}>
                                <Typography variant='h6' sx={{textDecoration: 'none', '&:hover': { textDecoration: 'underline' }, fontSize:'16px', fontWeight:'530'}}>Privacy</Typography>
                            </Link>
                        </MKBox>

                        <Icon
                            onClick={() => window.open('https://www.linkedin.com/company/sparelot/')}
                            sx={{
                                ml:'auto',
                                color:'#fff',
                                borderRadius:2,
                                width:'fit-content',
                                height:'fit-content',
                                '&:hover':{
                                    cursor:'pointer',
                                }
                            }}
                        >
                            <LinkedIn fontSize='large'/>
                        </Icon>

                        <Icon
                            onClick={() => window.open('https://www.instagram.com/sparelotstorage/')}
                            sx={{
                                ml:1,
                                color:'#fff',
                                borderRadius:2,
                                width:'fit-content',
                                height:'fit-content',
                                '&:hover':{
                                    cursor:'pointer',
                                }
                            }}
                        >
                            <Instagram fontSize='large'/>
                        </Icon>

                        <Icon
                            onClick={() => window.open('https://www.facebook.com/profile.php?id=61562946756662/')}
                            sx={{
                                ml:1,
                                color:'#fff',
                                borderRadius:2,
                                width:'fit-content',
                                height:'fit-content',
                                '&:hover':{
                                    cursor:'pointer',
                                }
                            }}
                        >
                            <Facebook fontSize='large'/>
                        </Icon>

                        <Icon
                            onClick={() => window.open('https://www.tiktok.com/@sparelot')}
                            sx={{
                                mt:.7,
                                ml:1.5,
                                scale:1.5,
                                width: 'fit-content',
                                height: 'fit-content',
                                '&:hover': {
                                cursor: 'pointer',
                                },
                            }}
                            >
                            <FontAwesomeIcon icon={faTiktok} />
                        </Icon>

                    </MKBox>
                </MKBox>
            </MKBox>
        </Container>
    </MKBox>
    {searchFlowActive && <SearchFlow open={searchFlowActive} onClose={() => setSearchFlowActive(false)} init_searchtypes={searchTypes}/>}
    </>
  );
};

export default Footer;
