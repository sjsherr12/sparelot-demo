import React, { useEffect, useState } from 'react';
import MKBox from 'components/MKBox';
import MKTypography from 'components/MKTypography';
import MKButton from 'components/MKButton';
import { Container, Typography } from '@mui/material';
import DirectoryHeader from '../header';
import axios from 'axios';  // Import axios for making API requests
import { getFunctions, httpsCallable } from "firebase/functions";
import StripeLogo from 'assets/images/StripeLogo.webp';
import InfoIcon from '@mui/icons-material/Info';
import { LoadingSpinner, LoadingComponent } from "app/utils/loading/component";
import { useUserAuthState } from 'app/backend/user/auth/reactprovider';
import { getUser } from 'app/backend/db/user';
import isStandalone from 'isStandalone';
import { useLocation } from 'react-router-dom';

const helpfulLinks = [
    {
        name:'Hosting Essentials',
        href:'/help/hosting/hostingessentials/'
    },
    {
        name:'Hosting Payments',
        href:'/help/hosting/hostingpayments/'
    },
    {
        name:'Hosting Fees',
        href:'/help/hosting/hostingfees/'
    },
    {
        name:'Maximizing Your Earnings',
        href:'/help/hosting/maxearnings/'
    },
    {
        name:'Host Protection',
        href:'/help/hosting/hostprotection/'
    },
]

const PaymentInfo = () => {
  const [error, setError] = useState(null);       // To handle any errors
  const [loading, setLoading] = useState(false);
  const {location} = useLocation();
  const [userImpl, setUserImpl] = useState(null);
  const {user} = useUserAuthState();

  // Function to create the Stripe account link
  const createStripeAccountLink = async () => {
        setLoading(true);
        const functions = getFunctions();
        const createLink = httpsCallable(functions, 'createStripeAccountLink');
        try {
            const result = await createLink();  // You can pass data here if needed
            const { url } = result.data;
        
            // Calculate screen position for centering the window
            const width = 700;
            const height = 800;
            const left = (window.screen.width - width) / 2;
            const top = (window.screen.height - height) / 2 - 40;
            setLoading(false);
            // Open the Stripe onboarding page in a centered popup window
            window.location.href = url;
        } catch (error) {
            alert("Error creating Stripe account link:", error);
            setLoading(false);
        }
    };

    // Define the method to open the Stripe dashboard
    const openStripeDashboard = () => {
        if (userImpl?.stripeAccountId) {
        const dashboardUrl = `https://dashboard.stripe.com/${userImpl.stripeAccountId}`;
        window.open(dashboardUrl, '_blank');
        } else {
        console.error("Stripe Account ID is not available.");
        }
    };  

    useEffect(() => {
        const get_userImpl = async () => {
            setLoading(true);
            if (user?.uid) {
                const userImplRes = await getUser(user.uid);
                setUserImpl(userImplRes);
            }
            setLoading(false);
        }
        get_userImpl();
    }, [user])

    return (
        <>
        <Container sx={{
            display: 'flex',
            justifyContent: 'center',
        }}>
            <MKBox sx={{ width: '100%' }}>
                <DirectoryHeader
                    title='Payment Information'
                    parent='Account'
                    parentPath='/account/'
                    secondChild='Payments'
                    sx={{
                        display:location?.pathname==='/account/payments'?'flex':'none',
                    }}
                />
                <MKTypography variant='body1' sx={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize:'17px',
                    fontWeight:'550',
                    color:'#737373',
                    mb:'22px'
                }}>
                    Here, hosts can connect their payment information with Stripe to start receiving monthly revenue. 
                </MKTypography>

                <MKBox sx={{display:'flex',flexDirection:'column', gap:2}}>
                    <MKBox sx={{
                        width:'100%',
                        display:'flex',
                        flexDirection:'column',
                        border:'1px solid #ababab',
                        px:{xs:'20px', md:'80px'},
                        py:2,
                        borderRadius:'18px',
                        mr:{xs:'0px', md:'auto'}
                    }}>
                        {/* Display error message if there is one */}
                        {error && <MKTypography color="error">{error}</MKTypography>}

                        <MKBox sx={{display:'flex', justifyContent:'center', flexDirection:'column', flexGrow:1}}>
                            {userImpl?.stripeAccountId ? (
                                <>
                                    {/* Display Stripe Account Info if exists */}
                                    <MKTypography variant='h5' sx={{
                                        fontFamily: 'Montserrat, sans-serif',
                                        fontWeight: '620',
                                        color: '#000',
                                        textAlign: 'center',
                                        mb: '6px'
                                    }}>
                                        Stripe Account Connected!
                                    </MKTypography>
                                    <MKTypography variant='body1' sx={{
                                        fontFamily: 'Montserrat, sans-serif',
                                        fontSize: '16px',
                                        color: '#737373',
                                        textAlign: 'center',
                                        mb: '12px'
                                    }}>
                                        Account ID: {userImpl.stripeAccountId}
                                    </MKTypography>
                                    <MKButton
                                        onClick={openStripeDashboard}
                                        color='info'
                                        sx={{
                                            fontFamily: 'Montserrat, sans-serif',
                                            textTransform: 'none',
                                            fontSize: { xs: '14px', md: '16px' },
                                            fontWeight: '560',
                                            mb: 2,
                                        }}
                                    >
                                        {'Go to Stripe Dashboard'}
                                    </MKButton>
                                </>
                            ) : (
                                <>
                                    {/* Stripe Connect Button if no account info */}
                                    <MKTypography variant='body1' sx={{
                                        fontFamily: 'Montserrat, sans-serif',
                                        fontSize:'18px',
                                        fontWeight:'620',
                                        color:'#000',
                                        mb:'12px',
                                        textAlign:'center',
                                    }}>
                                        Add payment information to start accepting money for hosting
                                    </MKTypography>
                                    <MKTypography variant='body1' sx={{
                                        fontFamily: 'Montserrat, sans-serif',
                                        fontSize:{xs:'14px', md:'16px'},
                                        fontWeight:'500',
                                        color:'#737373',
                                        mb:'12px',
                                        textAlign:'center'
                                    }}>
                                        SpareLot partners with Stripe to help you receive payments and keep your personal bank and financial information secure.
                                    </MKTypography>
                                    {!loading && (
                                        <MKButton
                                            onClick={createStripeAccountLink}
                                            color='info'
                                            sx={{
                                                fontFamily: 'Montserrat, sans-serif',
                                                textTransform:'none',
                                                fontSize:{xs:'14px', md:'16px'},
                                                fontWeight:'560',
                                                mb:2,
                                            }}
                                        >
                                            {'Connect Payment Information'}
                                        </MKButton>
                                    )}
                                    {loading && (
                                        <>
                                            <LoadingComponent/>
                                            <div style={{width:'100%', height:20}}/>
                                        </>
                                    )}
                                </>
                            )}
                        </MKBox>
                        
                        {/* Stripe logo section */}
                        <MKBox sx={{
                            display: 'flex',
                            alignSelf: 'flex-start',
                            ml: { xs: 0, md: '-55px' },
                            position:'relative',
                            bottom:-8
                        }}>
                            <MKTypography variant='body1' sx={{
                                mr:'3px',
                                fontFamily: 'Montserrat, sans-serif',
                                fontSize:'14px',
                                fontWeight:'450'
                            }}>
                                Powered by 
                            </MKTypography>
                            <img src={StripeLogo} style={{height:'22px', width:'auto'}}></img>
                        </MKBox>
                    </MKBox>

                    <MKBox sx={{
                        mb:2,
                        width:'100%',
                        display:'flex',
                        flexDirection:{xs:'column',md:'row'},
                        gap:2,
                    }}>
                        <MKBox sx={{
                            width:'100%',
                            display:'flex',
                            flexDirection:'column',
                            gap:1,
                            border:'1px solid #ababab',
                            borderRadius:4,
                            p:2,
                        }}>
                            <Typography
                                sx={{
                                    pb:'3px',
                                    mb:1,
                                    color:'#000',
                                    fontSize:'1.25rem',
                                    fontWeight:550,
                                    borderBottom:'1px solid #ababab'
                                }}
                            >
                                Helpful Links
                            </Typography>
                                
                            {helpfulLinks.map((link, idx) => (
                                <a href={link.href} target='_blank' key={idx}>
                                    <Typography
                                        sx={{
                                            color:'#2e89ff',
                                            fontSize:'1rem',
                                        }}
                                    >
                                        {link.name}
                                    </Typography>
                                </a>
                            ))}
                        </MKBox>

                        <MKBox sx={{
                            borderRadius:'16px',
                            p:'20px 20px',
                            bgcolor:'#d8d8d8',
                        }}>
                            <MKBox sx={{display:'flex'}}>
                                <InfoIcon style={{color:'#000', height:'22px', width:'auto', marginRight:'9px'}}/>
                                <MKTypography variant='body1' sx={{
                                    fontFamily: 'Montserrat, sans-serif',
                                    fontSize:'16px',
                                    fontWeight:'500',
                                    color:'#000',
                                }}>
                                    Each host payout is subject to a small 4.0% processing fee of the gross booking amount. This small fee helps keep our platform running smoothly for all hosts and renters.
                                </MKTypography>
                            </MKBox>
                        </MKBox>
                    </MKBox>
                </MKBox>
            </MKBox>
        </Container>
        </>
    );
};

export default PaymentInfo;
