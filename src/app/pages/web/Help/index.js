import Navbar from "app/sections/Navbar";
import * as c from "const"
import MKBox from "components/MKBox";
import { home_web_routes, home_mobile_routes } from "app/sections/Navbar/routes";
import { home_actions } from "app/sections/Navbar/actions";
import colors from "assets/theme/base/colors";
import TitleBackground from "app/sections/Extra/Display/TitleBg";
import SearchBar from "app/sections/Search/SearchBar";
import { Container, Button } from "@mui/material";
import { Help, HelpOutline } from "@mui/icons-material";
import { Icon } from "@mui/material";
import IconicGrid from "app/sections/Options/Card/Iconic";
import { useState } from "react";
import MKButton from "components/MKButton";
import { help_card_routes } from "./routes";
import HomeSearch from 'assets/images/HomeSearch.webp';
import MKTypography from "components/MKTypography";
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import SearchBarHelp from "app/sections/Search/SearchBarHelp";

const HelpPage = () => {

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Corporation",
        "name": "SpareLot",
        "url": "https://sparelot.com",
        "logo": "https://sparelot.com/Images/SpareLotLogo.png",  
        "description": "SpareLot is a storage and parking marketplace that connects renters searching for storage and parking to hosts looking to rent out their unused space.",
        "areaServed": "US",
        "sameAs": [
          "https://www.facebook.com/sparelot",
          "https://www.tiktok.com/@sparelot",
          "https://www.linkedin.com/company/sparelot",
          "https://www.instagram.com/sparelotstorage"
        ]
    };
    const helpCenterSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "SpareLot Help Center",
        "description": "Find articles on renting, hosting, security, accounts, and other topics. Get answers to frequently asked questions.",
        "url": "https://sparelot.com/help",
        "about": {
          "@type": "Organization",
          "name": "SpareLot",
          "url": "https://sparelot.com"
        }
    };
      

    const navigate = useNavigate();
    return (
        <>
            <Helmet>
                <title>SpareLot Help Center</title>
                <meta
                    name="description"
                    content="Find help articles about renting, hosting, security, accounts, and more. Get quick answers to your most common questions."
                />
                <meta
                    name="keywords"
                    content="storage, parking, marketplace, rental space, parking spaces, storage solutions, rent parking, rent storage, car parking, vehicle storage, item storage, help, help page, SpareLot help, help center"
                />
                <script type="application/ld+json">
                    {JSON.stringify(organizationSchema)}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify(helpCenterSchema)}
                </script>
            </Helmet>

            <MKBox sx={{overflow:'hidden'}}>

                <TitleBackground
                    title="SpareLot is Here to Help"
                    imageUrl={HomeSearch}
                    subtitle={`Provide a description or keywords related to your issue, and we will search for a relevant help article.`}
                    BelowTitleContent={() => <SearchBarHelp placeholder="How can we help?" AdornmentIcon={Help}/>}
                    desktopContentHeight="700"
                />

                <Container>
                    <IconicGrid
                        cardsPerLine={3}
                        cardInfo={help_card_routes}
                    />

                    <MKTypography sx={{
                        mt:{xs:'50px', md:'70px'},
                        fontFamily: 'Montserrat, sans serif',
                        fontSize:{xs:'37px', md:'50px'},
                        color:'#000',
                        fontWeight:'730',
                        mb:'5px'
                    }}>
                        Featured Articles
                    </MKTypography>
                    <MKBox>
                        <MKBox sx={{mb:'20px'}}>
                            <Link to="/help/faqs/aboutsparelot/" style={{ textDecoration: 'none' }}>
                                <MKTypography
                                sx={{
                                    fontFamily: 'Montserrat, sans-serif',
                                    color: '#000', 
                                    cursor: 'pointer', 
                                    textDecoration:'underline',
                                    fontWeight:'620',
                                    fontSize:'25px',
                                    mb:'5px',
                                    '&:hover': {
                                        color:'#2e89ff'
                                    },
                                }}
                                >
                                About SpareLot
                                </MKTypography>
                            </Link>
                            <MKTypography sx={{
                                fontFamily: 'Montserrat, sans-serif',
                                color: '#656464', 
                                fontWeight:'530',
                                fontSize:'20px'
                            }}>
                                Learn about what SpareLot is as a platform, how it works, and the values that drive our business.
                            </MKTypography>
                            <hr style={{marginTop:'20px'}}></hr>
                        </MKBox>
                        <MKBox sx={{mb:'20px'}}>
                            <Link to="/help/faqs/rentingessentials/" style={{ textDecoration: 'none' }}>
                                <MKTypography
                                sx={{
                                    fontFamily: 'Montserrat, sans-serif',
                                    color: '#000', 
                                    cursor: 'pointer', 
                                    textDecoration:'underline',
                                    fontWeight:'620',
                                    fontSize:'25px',
                                    mb:'5px',
                                    '&:hover': {
                                        color:'#2e89ff'
                                    },
                                }}
                                >
                                Renting Essentials
                                </MKTypography>
                            </Link>
                            <MKTypography sx={{
                                fontFamily: 'Montserrat, sans-serif',
                                color: '#656464', 
                                fontWeight:'530',
                                fontSize:'20px'
                            }}>
                                Discover the user essentials before renting a SpareLot space to ensure a good experience.
                            </MKTypography>
                            <hr style={{marginTop:'20px'}}></hr>
                        </MKBox>
                        <MKBox sx={{mb:'20px'}}>
                            <Link to="/help/faqs/hostingessentials/" style={{ textDecoration: 'none' }}>
                                <MKTypography
                                sx={{
                                    fontFamily: 'Montserrat, sans-serif',
                                    color: '#000', 
                                    cursor: 'pointer', 
                                    textDecoration:'underline',
                                    fontWeight:'620',
                                    fontSize:'25px',
                                    mb:'5px',
                                    '&:hover': {
                                        color:'#2e89ff'
                                    },
                                }}
                                >
                                Hosting Essentials
                                </MKTypography>
                            </Link>
                            <MKTypography sx={{
                                fontFamily: 'Montserrat, sans-serif',
                                color: '#656464', 
                                fontWeight:'530',
                                fontSize:'20px'
                            }}>
                                Discover the host essentials before hosting a SpareLot space to ensure a good experience.
                            </MKTypography>
                            <hr style={{marginTop:'20px'}}></hr>
                        </MKBox>
                        <MKBox sx={{mb:'20px'}}>
                            <Link to="/help/faqs/sparelotfees/" style={{ textDecoration: 'none' }}>
                                <MKTypography
                                sx={{
                                    fontFamily: 'Montserrat, sans-serif',
                                    color: '#000', 
                                    cursor: 'pointer', 
                                    textDecoration:'underline',
                                    fontWeight:'620',
                                    fontSize:'25px',
                                    mb:'5px',
                                    '&:hover': {
                                        color:'#2e89ff'
                                    },
                                }}
                                >
                                SpareLot Fees
                                </MKTypography>
                            </Link>
                            <MKTypography sx={{
                                fontFamily: 'Montserrat, sans-serif',
                                color: '#656464', 
                                fontWeight:'530',
                                fontSize:'20px'
                            }}>
                                Understand the fees that SpareLot takes and why we take them.
                            </MKTypography>
                            <hr style={{marginTop:'20px'}}></hr>
                        </MKBox>
                        <MKBox sx={{mb:'20px'}}>
                            <Link to="/help/faqs/accountsetup/" style={{ textDecoration: 'none' }}>
                                <MKTypography
                                sx={{
                                    fontFamily: 'Montserrat, sans-serif',
                                    color: '#000', 
                                    cursor: 'pointer', 
                                    textDecoration:'underline',
                                    fontWeight:'620',
                                    fontSize:'25px',
                                    mb:'5px',
                                    '&:hover': {
                                        color:'#2e89ff'
                                    },
                                }}
                                >
                                Account Setup
                                </MKTypography>
                            </Link>
                            <MKTypography sx={{
                                fontFamily: 'Montserrat, sans-serif',
                                color: '#656464', 
                                fontWeight:'530',
                                fontSize:'20px'
                            }}>
                                See how you can create an account on SpareLot and verify it using your email.
                            </MKTypography>
                        </MKBox>
                    </MKBox>
                </Container>
                <MKBox sx={{
                    backgroundColor: '#f5f5f5', 
                    padding:{xs:'40px 5px', md:'50px 20px'}, 
                    mt:{xs:'60px', md:'80px'},
                    mb:'40px'
                }}>
                    <Container sx={{display:'flex', flexDirection:'column' ,alignItems:'center', justifyContent:'center'}}>
                        <MKTypography sx={{
                            fontFamily: 'Montserrat, sans serif',
                            fontSize:{xs:'31px', md:'40px'},
                            color:'#000',
                            fontWeight:'700',
                            textAlign:'center',
                            mb:{xs:'14px', md:'18px'}
                        }}>
                            Have a Suggestion?
                        </MKTypography>
                        <MKTypography sx={{
                            fontFamily: 'Montserrat, sans-serif',
                            color: '#656464', 
                            fontWeight:'560',
                            fontSize:{xs:'19px', md:'23px'},
                            textAlign:'center',
                            mb:{xs:'18px', md:'25px'}
                        }}>
                            Visit our feedback page to leave the SpareLot team a suggestion and review.
                        </MKTypography>
                        <MKButton color='info' onClick={() => navigate('/feedback/')} sx={{
                            p:'12px 40px',
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight:'600',
                            fontSize:{xs:'16px', md:'18px'},
                            borderRadius:'14px',
                            textTransform:'none'
                        }}>
                            SpareLot Feedback Page
                        </MKButton>
                        <MKTypography variant='body1' sx={{
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight:'500',
                            color:'#737373',
                            fontSize:'15px',
                            mt:4
                        }}>
                            Need support? Contact admin@sparelot.com
                        </MKTypography>
                    </Container>
                </MKBox>

            </MKBox>
        </>
    )
}

export default HelpPage;