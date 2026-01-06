import React, { useState } from 'react';
import { Box, Container, Typography, useMediaQuery } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import SignupLogo from 'assets/logos/SignupLogo.png';
import SignUp from 'app/sections/Modal/UserAuth/SignUp';
import HomeFrontPic from 'assets/images/RVParking2.jpg'
import colors from 'assets/theme/base/colors';

const SignupPage = () => {

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

  return (<>
    <Helmet>
        <title>Login - SpareLot</title>
        <meta
            name="description"
            content="Log in to your existing SpareLot account or create a new SpareLot account to join the community."
        />
        <meta
            name="keywords"
            content="storage, parking, marketplace, rental space, parking spaces, storage solutions, rent parking, rent storage, car parking, vehicle storage, item storage, log in, SpareLot login, log into account"
        />
        <script type="application/ld+json">
            {JSON.stringify(organizationSchema)}
        </script>
    </Helmet>

    <div 
        style={{
            display:'flex', 
            maxWidth:'100vw', 
            minHeight:'inherit', 
            backgroundImage:`url(${HomeFrontPic})`,
            backgroundPosition:"center",
            backgroundSize:'cover',
        }}
    >
      <Box
        id="login-section"
        sx={{
            width:{xs:'100%', lg:700},
            p:{xs:3,sm:4,md:6,lg:8, xl:10},
            bgcolor:'#fff',
            overflowX:'hidden',
            overflowY:'auto',
            display:'flex',
            flexDirection:'column',
            gap:1,
        }}
      >
        <img
          src={SignupLogo}
          style={{
              width:55,
              height:55,
          }}
        />
        <Typography
          variant='h3'
          sx={{
              mt:2,
          }}
        >
          Create Account
        </Typography>
        <Typography
          sx={{
              mb:2,
              fontSize:16,
              fontWeight:480,
          }}
        >
          Sign up to find practical storage options near you.
        </Typography>
        <SignUp />
        <Typography
          sx={{
              mt:3,
              fontSize:15,
              fontWeight:500,
              display:'flex',
              gap:1,
              alignSelf:'center',
          }}
        >
          Already have an account?
          <a
            href="/login"
            style={{
                cursor:'pointer',
                color:colors.info.main,
                textDecoration:'underline',
            }}
          >
            Log In →
          </a>
        </Typography>
      </Box>
    </div>
  </>)
};

export default SignupPage;
