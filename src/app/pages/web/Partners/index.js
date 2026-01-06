import React, { useState, useEffect, useRef } from 'react';
import TitleBackground from "app/sections/Extra/Display/TitleBg";
import Navbar from "app/sections/Navbar";
import { home_actions } from "app/sections/Navbar/actions";
import { home_mobile_routes } from "app/sections/Navbar/routes";
import { home_web_routes } from "app/sections/Navbar/routes";
import colors from "assets/theme/base/colors";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import HomeDriveway from 'assets/images/HousePic.webp';
import { Container, Card, CardContent, Grid, Typography } from "@mui/material";

// Affiliates: "How it Works" section
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import HandshakeIcon from '@mui/icons-material/Handshake';
import PaymentsIcon from '@mui/icons-material/Payments';

// Ambassadors: "Ambassador Perks" section
import LockOpenIcon from '@mui/icons-material/LockOpen';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

import * as c from 'const';
import { Helmet } from 'react-helmet-async';

const Partners = () => {

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

    const [activeTab, setActiveTab] = useState('affiliates');
    const [sliderStyle, setSliderStyle] = useState({});
    const tabsRef = useRef({});

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        const section = document.getElementById(tab);
        
        // Subtract pixels from the final scroll position to scroll a bit less
        const yOffset = -90; // Adjust this value as needed (positive scrolls up, negative scrolls down)
        const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
    
        window.scrollTo({ top: y, behavior: 'smooth' });
    };
    

    useEffect(() => {
        if (tabsRef.current[activeTab]) {
            const tabElement = tabsRef.current[activeTab];
            const tabRect = tabElement.getBoundingClientRect();
            const containerRect = tabElement.parentElement.getBoundingClientRect();

            setSliderStyle({
                left: `${tabRect.left - containerRect.left + 12}px`, // Centering adjustment
                width: `${tabRect.width - 20}px`, // Slightly less width
            });
        }
    }, [activeTab]);

    // Data for Affiliate cards
    const affiliateData = [
        { 
            icon: <CheckBoxIcon sx={{ height:'160px', width:'auto', color: colors.info.main }} />, 
            title: 'Join', 
            description: 'Tell us about your company and how it aligns with the SpareLot philosophy. If you\'re a match, we\'ll reach out to work together.' 
        },
        { 
            icon: <HandshakeIcon sx={{ height:'160px', width:'auto', color: colors.info.main }} />, 
            title: 'Share', 
            description: 'Promote SpareLot through articles, newsletters, ads, social media, and more. You’ll learn in advance about unique discounts.' 
        },
        { 
            icon: <PaymentsIcon sx={{ height:'160px', width:'auto', color: colors.info.main }} />, 
            title: 'Earn', 
            description: 'Every time a user signs up and either lists their first space or reserves their first space using your link, receive commission.' 
        }
    ];

    // Data for Ambassador cards
    const ambassadorData = [
        { 
            icon: <LockOpenIcon sx={{ height:'160px', width:'auto', color: colors.info.main }} />, 
            title: 'Exclusive Perks', 
            description: "Hear first about new features, limited deals, and events. You'll get a unique promotional code to share to your audiences. " 
        },
        { 
            icon: <TrendingUpIcon sx={{ height:'160px', width:'auto', color: colors.info.main }} />, 
            title: 'Community Growth', 
            description: "Meet fellow ambassadors, chat directly with the SpareLot, and partner with a growing brand to establish yourself in the industry. "
        },
        { 
            icon: <LocalAtmIcon sx={{ height:'160px', width:'auto', color: colors.info.main }} />, 
            title: 'Share and Earn', 
            description: "Get rewarded for every lead that converts into a reservation or listing on SpareLot. The more you share, the more you earn!"
        }
    ];

    return (
        <>
            <Helmet>
                <title>SpareLot Partners - Affiliates and Ambassadors</title>
                <meta
                    name="description"
                    content="Apply to become a SpareLot affiliate or ambassador today. Earn percentage commissions by recommending friends, family, followers."
                />
                <meta
                    name="keywords"
                    content="storage, parking, marketplace, rental space, parking spaces, storage solutions, rent parking, rent storage, car parking, vehicle storage, item storage, partners, affiliates, affiliate partners, SpareLot partners"
                />
                <script type="application/ld+json">
                    {JSON.stringify(organizationSchema)}
                </script>
            </Helmet>

            <TitleBackground
                title="Build Connections Through Shared Spaces"
                imageUrl={HomeDriveway}
                desktopContentHeight="750"
                AboveTitleContent={() => (
                    <Typography
                        variant='h2'
                        sx={{
                            my: 1,
                            color: '#fff',
                            
                            fontSize:{xs:'28px', xl:'44px'},
                            fontWeight:{xs:'630', xl:'680'},
                            mb:{xs:'16px', xl:'10px'}
                        }}
                    >
                        Affiliates and Ambassadors
                    </Typography>
                )}
            />
            <Container>
                <MKBox sx={{
                    marginTop: '30px',
                    position: 'relative',
                    borderBottom: '2px solid #ccc',
                    height: '75px',
                    display:{xs:'none', xl:'flex'},
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                }}>
                    <MKBox
                        sx={{
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent:'left',
                            flexGrow: 1,
                            position: 'relative',
                        }}
                    >
                        <Typography sx={{
                            fontSize: '40px',
                            fontWeight: '800',
                            color: '#000',
                            marginBottom: '10px', // Align bottom with tabs
                            marginRight: '20px',
                            
                            display:{xs:'none', xl:'flex'}
                        }}>
                            Partners
                        </Typography>
                        <MKBox
                            ref={(el) => tabsRef.current['affiliates'] = el}
                            onClick={() => handleTabClick('affiliates')}
                            sx={{
                                padding: '14px 30px',
                                cursor: 'pointer',
                                fontWeight: activeTab === 'affiliates' ? 'bold' : 'normal',
                                color: activeTab === 'affiliates' ? '#000' : '#737373',
                                fontSize: {xs:15, xl:27},
                                fontWeight: '680',
                                position: 'relative',
                                
                            }}
                        >
                            Affiliates
                        </MKBox>
                        <MKBox
                            ref={(el) => tabsRef.current['ambassadors'] = el}
                            onClick={() => handleTabClick('ambassadors')}
                            sx={{
                                padding: '14px 20px',
                                cursor: 'pointer',
                                fontWeight: activeTab === 'ambassadors' ? 'bold' : 'normal',
                                color: activeTab === 'ambassadors' ? '#000' : '#737373',
                                fontSize: {xs:15, xl:27},
                                fontWeight: '680',
                                position: 'relative',
                                
                            }}
                        >
                            Ambassadors
                        </MKBox>
                        <MKBox
                            sx={{
                                position: 'absolute',
                                bottom: '0',
                                left: sliderStyle.left,
                                width: sliderStyle.width,
                                height: '3px',
                                backgroundColor: '#000',
                                transition: 'left 0.3s ease, width 0.3s ease',
                                zIndex: 0,
                            }}
                        />
                    </MKBox>
                    <a href="/SpareLot LLC - Partner Application Terms (1).pdf" target="_blank">
                        <MKButton color='info' sx={{
                            width: '130px',
                            borderRadius: '25px',
                            
                            fontWeight: '600',
                            alignSelf: 'end',
                            mb:'12px',
                            fontSize:{xs:12, xl:20},
                        }}>
                            Apply
                        </MKButton>
                    </a>
                </MKBox>
            </Container>
            <Container>
                <MKBox id="affiliates" sx={{
                    marginTop:{xs:'38px', xl:'50px'},
                    width:'100%',
                    }}>
                    <Typography variant="h2" sx={{
                        textAlign:'center',
                        fontSize:{xs:'42px', xl:'52px'},
                        fontWeight:{xs:'710', xl:'750'},
                        color: '#000',
                        
                    }}>
                        Affiliates
                    </Typography>
                    <Typography variant='body1' sx={{
                        
                        textAlign:'center',
                        fontSize:{xs:'19px', xl:'22px'},
                        fontWeight:'600',
                        color:'#525252',
                        mt:{xs:'18px', xl:'25px'},
                    }}>
                        SpareLot affiliates include businesses, organizations, and institutions that help connect communities and expand the storage revolution. Apply now to start earning commissions. If you're a program match, we'll reach out.
                    </Typography>  
                </MKBox>
            </Container>
            {/* How it Works Section */}
            <MKBox sx={{
                backgroundColor: '#f5f5f5', 
                padding:{xs:'40px 10px', xl:'60px 20px'}, 
                mt:{xs:'50px', xl:'70px'},
            }}>
                <Container>
                    <Typography variant='h3' sx={{
                        
                        textAlign:'center',
                        fontSize:{xs:'34px', xl:'38px'},
                        fontWeight:'700',
                        color:'#000',
                        mb:{xs:'34px', xl:'40px'},
                    }}>
                        How it Works
                    </Typography>
                    <Grid container spacing={4}>
                        {affiliateData.map((item, index) => (
                            <Grid item xs={12} sm={6} xl={4} key={index}>
                                <Card sx={{ textAlign: 'center', padding: '14px', height: '100%', alignItems:'center', }}>
                                    {item.icon}
                                    <Typography variant="h4" sx={{ mt: 2, mb: 1, fontWeight: '730', color:'#000',  fontSize:'30px'}}>
                                        {item.title}
                                    </Typography>
                                    <CardContent>
                                        <Typography variant="body1" sx={{fontWeight: '580', color:'#6a6a6a',  fontSize:{xs:'18px', xl:'19px'}}}>
                                            {item.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <MKBox sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                    <a href="/SpareLot LLC - Partner Application Terms (1).pdf" target="_blank">
                        <MKButton color='info' sx={{
                            width:{xs:'250px', xl:'330px'},
                            height:{xs:'50px', xl:'55px'},
                            borderRadius: '18px',
                            
                            fontSize:{xs:'22px', xl:'24px'},
                            fontWeight: '600',
                            mt:{xs:'50px', xl:'55px'},
                        }}>
                            Apply Now
                        </MKButton>
                    </a>
                    </MKBox>
                </Container>
            </MKBox>
            <Container>
                <MKBox id="ambassadors" sx={{
                    marginTop:{xs:'50px', xl:'80px'},
                    width:'100%',
                    }}>
                    <Typography variant="h2" sx={{
                        textAlign:'center',
                        fontSize:{xs:'42px', xl:'52px'},
                        fontWeight:{xs:'710', xl:'750'},
                        color: '#000',
                        
                    }}>
                        Ambassadors
                    </Typography>
                    <Typography variant='body1' sx={{
                        
                        textAlign:'center',
                        fontSize:{xs:'19px', xl:'22px'},
                        fontWeight:'600',
                        color:'#525252',
                        mt:{xs:'18px', xl:'25px'},
                    }}>
                        SpareLot ambassadors include individuals, content creators, and influencers who enjoy finding efficient storage solutions. Ambassadors serve as an extension of SpareLot and represent our brand through social media promotion, community engagement, and events. 
                    </Typography> 
                </MKBox>
            </Container>
            <MKBox sx={{
                backgroundColor: '#f5f5f5', 
                padding:{xs:'40px 10px', xl:'60px 20px'}, 
                mt:{xs:'50px', xl:'70px'},
                mb:{xs:'25px', xl:'50px'}
            }}>
                <Container>
                    <Typography variant='h3' sx={{
                        
                        textAlign:'center',
                        fontSize:{xs:'34px', xl:'38px'},
                        fontWeight:'700',
                        color:'#000',
                        mb:{xs:'34px', xl:'40px'},
                    }}>
                        Ambassador Perks
                    </Typography>
                        <Grid container spacing={4}>
                            {ambassadorData.map((item, index) => (
                                <Grid item xs={12} sm={6} xl={4} key={index}>
                                    <Card sx={{ textAlign: 'center', padding: '14px', height: '100%', alignItems:'center', }}>
                                        {item.icon}
                                        <Typography variant="h4" sx={{ mt: 2, mb: 1, fontWeight: '730', color:'#000',  fontSize:'30px'}}>
                                            {item.title}
                                        </Typography>
                                        <CardContent>
                                            <Typography variant="body1" sx={{fontWeight: '580', color:'#6a6a6a',  fontSize:{xs:'18px', xl:'19px'}}}>
                                                {item.description}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    <MKBox sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                        <a href="/SpareLot LLC - Partner Application Terms (1).pdf" target="_blank">
                            <MKButton color='info' sx={{
                            width:{xs:'250px', xl:'330px'},
                            height:{xs:'50px', xl:'55px'},
                            borderRadius: '18px',
                            
                            fontSize:{xs:'22px', xl:'24px'},
                            fontWeight: '600',
                            mt:{xs:'50px', xl:'55px'},
                            }}>
                                Apply Now
                            </MKButton>
                        </a>
                    </MKBox>
                </Container>
            </MKBox>
        </>
    );
};

export default Partners;
