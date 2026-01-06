import { Image } from "@mui/icons-material"
import { Container, Icon, Typography } from "@mui/material"
import MKBox from "components/MKBox"
import MKButton from "components/MKButton"
import HomeWorkIcon from '@mui/icons-material/HomeWork'
import ArticleIcon from '@mui/icons-material/Article'
import PaidIcon from '@mui/icons-material/Paid'
import Basement from 'assets/images/Basement.webp'
import Garage from 'assets/images/Garage.webp'
import Attic from 'assets/images/Attic.webp'
import Carport from 'assets/images/Carport.webp'
import ParkingLot from 'assets/images/ParkingLot.webp'
import Shed from 'assets/images/Shed.webp'
import Bedroom from 'assets/images/Bedroom.webp'
import UnpavedLot from 'assets/images/UnpavedLot.webp'
import HostExample from 'assets/images/HostExample.webp'
import TitleBackground from "app/sections/Extra/Display/TitleBg"
import React, { useState } from "react";
import colors from "assets/theme/base/colors"
import Navbar from "app/sections/Navbar"
import { home_actions } from "app/sections/Navbar/actions"
import { home_mobile_routes } from "app/sections/Navbar/routes"
import { home_web_routes } from "app/sections/Navbar/routes"
import EarningEstimator from 'app/pages/web/Hosting/EarningEstimator'
import * as c from 'const'
import { useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import Hr from "app/utils/Hr"

const spaceTypes = [
  {
    imgSrc: Basement,
    label: 'Basement'
  },
  {
    imgSrc: Garage,
    label: 'Garage'
  },
  {
    imgSrc: Attic,
    label: 'Attic'
  },
  {
    imgSrc: Carport,
    label: 'Carport'
  },
  {
      imgSrc: ParkingLot,
      label: 'Parking Lot'
    },
    {
      imgSrc: Shed,
      label: 'Shed'
    },
    {
      imgSrc: Bedroom,
      label: 'Bedroom'
    },
    {
      imgSrc: UnpavedLot,
      label: 'Unpaved Lot'
    }
];

const hostSteps = [
  {
    title:'List Your Space',
    icon:HomeWorkIcon,
    description:'Fill out information online about your space such as size, location, amenities, and price.',
  },
  {
    title:'Find a Renter',
    icon:ArticleIcon,
    description:'Promote your space through SpareLot, review, renter requests, and approve.',
  },
  {
    title:'Start Earning',
    icon:PaidIcon,
    description:'Schedule a start date with your renter through in-app messaging and get paid.',
  },
]

const Hosting = () => {

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

  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Hosting on SpareLot</title>
        <meta
          name="description"
          content="Become a SpareLot host and start making money on your unused space. You control who rents, what items are allowed, and when they can access the space."
        />
        <meta
          name="keywords"
          content="storage, parking, marketplace, rental space, parking spaces, storage solutions, rent parking, rent storage, car parking, vehicle storage, item storage, host unused space, rent out space, host space"
        />
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>

      <TitleBackground
                title="Don't Let Your Unused Space Go to Waste"
                imageUrl={HostExample}
                desktopContentHeight="750"
                AboveTitleContent={() => (
                    <Typography
                        variant='h2'
                        sx={{
                            my: 3,
                            color: '#fff',
                        }}
                    >
                        Hosting
                    </Typography>
                )}
            />
      
      <Container>
        <Typography variant='h2' color='black' sx={{
          fontSize:{xs:'30px', md:'55px'},
          fontWeight:'800px',
          mt:'50px',
          textAlign:'center',
          mb:'20px'
        }}>
          Become a Host in 3 Simple Steps
        </Typography>
        <Typography variant='h6' sx={{
          fontSize:{xs:'25px', md:'30px'},
          fontWeight:'620',
          textAlign:'center',
          mb:'50px', 
          color:'#737373'
        }}>
          Make money on the space you already own by storing vehicles and belongings. 
        </Typography>
        <Hr sx={{my:1}}/>
        <MKBox sx={{
          display: {xs:'block', md:'flex'},
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          mb:'70px'
        }}>
          {
            (hostSteps.map((step, idx) => (
              <MKBox sx={{textAlign: 'center', width: {xs:'100%', md:'30%'}, display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize:200}}>
                <Icon
                  color='info' sx={{
                    height:'235px',
                    width:'auto',
                  }}
                >
                  <step.icon fontSize='inherit'/>
                </Icon>
                <MKBox sx={{display: 'flex', alignItems: 'center', mt: '20px', mb: '16px'}}>
                  <MKBox sx={{fontSize:25, fontWeight:'750', display:'flex', alignItems:'center', justifyContent:'center', bgcolor:'#636363', color:'#fff', height:'40px', width:'40px', borderRadius:'8px', mr: '10px'}}>{idx+1}</MKBox>
                  <Typography variant='h6' sx={{fontSize:25, fontWeight:'700', color:'#636363', ml:'7px', }}>
                    {step.title}
                  </Typography>
                </MKBox>
                <Typography variant='body2' sx={{fontSize:17, fontWeight:'550', color:'#838282', }}>
                  {step.description}
                </Typography>
              </MKBox>
            )))
          }
        </MKBox>
        <Hr sx={{mt:-2,mb:6}}/>
        <MKBox sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
        }}>
            <MKButton color='info' sx={{
                width: '530px',
                height: {xs:'50px', md:'65px'},
                borderRadius: '15px',
                color: '#fff',
                fontSize: { xs: '20px', md: '30px' },
                fontWeight: 'bold',
            }} onClick={() => navigate('/create')}>
                List a Space
            </MKButton>
        </MKBox>

        <MKBox>
          <Typography variant='h2' color='black' sx={{
            fontSize:{xs:'40px', md:'55px'},
            
            fontWeight:'800px',
            textAlign:'center',
            mt:'50px',
            mb:'-10px'
          }}>
            You could earn
          </Typography>
          <EarningEstimator />
        </MKBox>

        <Typography variant='h2' color='black' sx={{
          fontSize:{xs:'30px', md:'50px'},
          
          mt:'90px',
          textAlign:'center',
          mb:'25px'
        }}>
          Rent Out Any Type of Extra Space
        </Typography>
        <Typography variant='h3' sx={{
          fontSize:{xs:'20px', md:'26px'},
          
          textAlign:'center',
          mb:'40px',
          color:'#636363',
          fontWeight:'640'
        }}>
          Don't let your unused space go to waste. List it with SpareLot and start earning monthly cash.
        </Typography>
        
        <MKBox sx={{
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            gap: '20px',
            mb:'35px'
        }}>
            {spaceTypes.map((space, index) => (
                <MKBox key={index} sx={{
                    textAlign: 'center',
                    width: { xs: '100%', sm: '48%', md: '23%' },
                    mb:1,
                }}>
                    <img src={space.imgSrc} alt={space.label} style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                        borderRadius: '12px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        marginBottom: '10px'
                    }} />
                    <Typography variant='h6' sx={{ fontSize: 22, fontWeight: '600', color: '#464647',  }}>
                        {space.label}
                    </Typography>
                </MKBox>
            ))}
        </MKBox>
        
      </Container>
    </>
  )
}

export default Hosting