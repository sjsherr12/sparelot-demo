import React, { useState } from 'react';
import Navbar from "app/sections/Navbar";
import { home_actions } from "app/sections/Navbar/actions";
import { home_mobile_routes } from "app/sections/Navbar/routes";
import { home_web_routes } from "app/sections/Navbar/routes";
import colors from "assets/theme/base/colors";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import { Container, Card, CardContent, Typography } from "@mui/material";
import Neighborhood from "assets/images/Neighborhood2.webp";
import MobileNeighborhood from 'assets/images/Neighborhood.webp';
import MobileHouseParking from 'assets/images/HouseParking3.webp';
import HouseParking from "assets/images/HouseParking2.webp";
import RVParking from "assets/images/RVParking.webp";
import MobileRVParking from "assets/images/RVParking3.webp";
import MobileFrontHousePic from 'assets/images/FrontHousePic.webp';
import HouseFront from "assets/images/HouseFront.webp";
import SearchFlow from "app/sections/Modal/SearchFlow";
import * as c from 'const';
import { Helmet } from 'react-helmet-async';

const cardData = [
  { title: "Search", subtitle: "Browse thousands of listings across the country for a space that fits your storage needs." },
  { title: "Store", subtitle: "Submit a reservation request and hear back before your start date. All hosts are contact verified." },
  { title: "Save", subtitle: "Enjoy big savings and more convenient access compared to traditional storage facilities." }
];

const About = () => {

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

  const [searchFlowOpen, setSearchFlowOpen] = useState(false);

  // Function to handle the button click
  const handleFindSpaceClick = () => {
    setSearchFlowOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>About SpareLot</title>
        <meta
          name="description"
          content="SpareLot is a storage and parking marketplace that connects renters searching for storage and parking to hosts looking to rent out their unused space."
        />
        <meta
          name="keywords"
          content="storage, parking, marketplace, rental space, parking spaces, storage solutions, rent parking, rent storage, car parking, vehicle storage, item storage, about us, about, about SpareLot, SpareLot company"
        />
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>
      <Container>
        <MKBox sx={{
            display: {xs:'block', xxl:'flex'},
            alignItems: "center",
            justifyContent: {xs:'center', xxl:'space-between'},
            height: {xs: 'auto', xxl: '590px'}, 
            mt:{xs:'20px', xxl:'80px'}
          }}
        >
          <MKBox sx={{
              display: "flex",
              flexDirection: "column",
              width:{xs:'100%', xxl:'45%'},
              alignItems:'flex-start',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            <MKBox
            component="img"
            src={MobileNeighborhood}
            alt="About SpareLot"
            sx={{
              display: { xs: 'flex', xxl: 'none' }, // Hide on mobile, show on medium and larger,
              width: '100%',
              height:'auto',
              borderRadius: '20px',
              mb:'18px'
            }}
          />
            <Typography variant="h1" sx={{
        
                color: '#000',
                fontSize: {xs:'40px', xxl:'76px'},
                fontWeight: '790',
                mb: {xs:'18px', xxl:'-28px'},
                textAlign:'left'
            }}>
              About SpareLot
            </Typography>
            <Typography variant="h4" sx={{
        
                color: '#000',
                fontSize: {xs:'22px', xxl:'31px'},
                fontWeight: '600',
                mb: {xs:'22px', xxl:'-15px'},
            }}>
              SpareLot is a peer-to-peer storage and parking marketplace, connecting people with unused space to those searching for convenient storage and parking.
            </Typography>
            <Typography variant="body1" sx={{
        
                color: '#6b6a6a',
                fontSize: {xs:'16px', xxl:'21px'},
                fontWeight: '540',
                mb: {xs:'58px', xxl:'5px'},
            }}>
              At SpareLot, we aim to revolutionize the way people think about storage and parking by providing a flexible, community-driven platform that maximizes space usage.
            </Typography>
            <MKButton color='info' onClick={handleFindSpaceClick} sx={{
                width:'100%',
                height:{xs:'48px', xxl:'60px'},
        
                fontSize:{xs:'20px', xxl:'24px'},
                fontWeight: '600',
                borderRadius: '15px',
                textTransform:'none'
            }}>
              Find a Space
            </MKButton>
          </MKBox>

          <MKBox
            component="img"
            src={Neighborhood}
            alt="About SpareLot"
            sx={{
              display: { xs: 'none', xxl: 'flex' }, // Hide on mobile, show on medium and larger
              height: '590px',
              width: 'auto',
              borderRadius: '20px',
            }}
          />
        </MKBox>
      </Container>
      
      <MKBox sx={{
                backgroundColor: '#f5f5f5', 
                padding: '50px 20px', 
                mt:{xs:'50px', xxl:'100px'},
                mb: {xs:'30px', xxl:'100px'},
        }}>
          <Container>
          <MKBox 
  sx={{
    display: 'flex',
    flexDirection: { xs: 'column', xxl: 'row' }, // Stack cards in a column on mobile
    gap: { xs: '20px', xxl: '16px' }, // Increase gap on mobile
    justifyContent: { xs: 'center', xxl: 'space-between' }, // Center cards on mobile
  }}
>
  {cardData.map((card, index) => (
    <Card
      key={index}
      sx={{
        flex: 1,
        height: { xs: 'auto', xxl: '240px' }, // Adjust height for mobile
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '25px',
        p:{xs:'20px 15px'},
        width: { xs: '100%', xxl: 'auto' }, // Full width on mobile
        maxWidth: { xs: '100%', xxl: 'auto' }, // Prevent overflow on mobile
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          sx={{
    
            fontSize: { xs: '34px', xxl: '40px' }, // Adjust font size for mobile
            fontWeight: '700',
            mb: { xs: '10px', xxl: '17px' }, // Adjust margin-bottom for mobile
            color: '#051d40',
          }}
        >
          {card.title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
    
            fontWeight: '550',
            color: '#6c6b6b',
            fontSize: { xs: '18px', xxl: '20px' }, // Adjust font size for mobile
          }}
        >
          {card.subtitle}
        </Typography>
      </CardContent>
    </Card>
  ))}
</MKBox>

          </Container>
      </MKBox>

      <Container>
        <MKBox sx={{
            display: { xs: 'block', xxl: 'flex' },
            alignItems:'flex-start',
            justifyContent: { xs: 'center', xxl: 'space-between' },
            mt: { xs: '40px', xxl: '100px' }, // Adjust margin-top for mobile
            mb: { xs: '40px', xxl: '115px' }, // Adjust margin-bottom for mobile
            height: { xs: 'auto', xxl: '560px' }, // Auto height on mobile to fit content
          }}
        >
          <MKBox sx={{display:{xs:'none', xxl:'flex'}, height:'520px', mr:'auto'}}>
          <img src={HouseParking} alt="Our Story and Origins" style={{
              height: "100%",
              width:{xs:'100%', xxl:'auto'},
              borderRadius: '20px',
            }}
          />
          </MKBox>
          <MKBox
            component="img"
            src={MobileHouseParking}
            alt="About SpareLot"
            sx={{
              display: { xs: 'flex', xxl: 'none' }, // Hide on mobile, show on medium and larger,
              width: '100%',
              height:'auto',
              borderRadius: '20px',
              mb:'18px'
            }}
          />

<MKBox 
    sx={{
      display: "flex",
      flexDirection: "column",
      maxWidth: { xs: '100%', xxl: '55%' }, // Adjust maxWidth for mobile
      height:{xs:'auto', xxl:'520px'}, 
      justifyContent: 'space-between', // Center content vertically
      px: { xs: '10px', xxl: '0' }, // Padding on mobile for better spacing
      mb:{xs:'30px', xxl:'115px'}
    }}
  >
    <Typography 
      variant="h1" 
      sx={{

        color: '#000',
        fontSize:'58px', // Adjust font size for mobile
        fontWeight: '750',
        mb:'22px', // Margin-bottom for mobile
        display:{xs:'none', xxl:'flex'}
      }}
    >
      Our Story and Origins
    </Typography>
    <Typography variant='h1' sx={{
      color: '#000',
      fontSize:'38px', // Adjust font size for mobile
      fontWeight: '750',
      mb:'16px', // Margin-bottom for mobile
      display:{xs:'flex', xxl:'none'}
    }}>
      Our Story
    </Typography>
    <Typography 
      variant="body1" 
      sx={{

        color: '#5a5a5a',
        fontSize: { xs: '16px', xxl: '22px' }, // Adjust font size for mobile
        fontWeight: '550',
      }}
    >
      Established in suburban Metro Detroit in 2024, SpareLot originated out of an idea between two students looking for parking. When our school ran out of spots, we recognized a significant demand that remained unsatisfied. As we searched for a solution, we saw nearby houses and buildings with consistently empty space that no one seemed to notice. If we could find a way to allow the owners of these properties to list their spaces, both parties would benefit—students get parking and homeowners get consistent passive income. Later, we recognized that the same exchange could be applied to the multi-billion dollar storage market, along with items, vehicles, and spaces of nearly any scale. From that seed of thought, SpareLot was built into the online storage and parking marketplace platform that it is today. 
    </Typography>
          </MKBox>
        </MKBox>

        <MKBox
  sx={{
    display: { xs: 'block', xxl: 'flex' },
    alignItems: 'center',
    justifyContent: { xs: 'center', xxl: 'space-between' },
    height: { xs: 'auto', xxl: '560px' },
    mb: { xs: '30px', xxl: '115px' },
    flexDirection: { xs: 'column', xxl: 'row' },
  }}
>
<MKBox
            component="img"
            src={MobileRVParking}
            alt="About SpareLot"
            sx={{
              display: { xs: 'flex', xxl: 'none' }, // Hide on mobile, show on medium and larger,
              width: '100%',
              height:'auto',
              borderRadius: '20px',
              mb:'18px'
            }}
          />
  <MKBox
    sx={{
      display: 'flex',
      flexDirection: 'column',
      maxWidth: { xs: '100%', xxl: '60%' },
      height: { xs: 'auto', xxl: '100%' },
      justifyContent: 'space-between',
      mb: { xs: '40px', xxl: '0' },
    }}
  >
    <Typography
      variant="h1"
      sx={{

        color: '#000',
        fontSize: { xs: '38px', xxl: '58px' },
        fontWeight: '750',
        mb: { xs: '10px', xxl: '2px' },
      }}
    >
      What We Do
    </Typography>
    <Typography
      variant="h3"
      sx={{
        color: '#000',
        fontSize: { xs: '28px', xxl: '38px' },
        fontWeight:{xs:'650', xxl:'700'},
        lineHeight: '40px',
        mb: '10px',
      }}
    >
      Renters
    </Typography>
    <Typography
      variant="body1"
      sx={{

        color: '#5a5a5a',
        fontSize: { xs: '16px', xxl: '22px' },
        fontWeight: '550',
        mb:{xs:'5px', xxl:'0px'}
      }}
    >
      We help people find storage for everything from items to cars, RVs, boats, and more. By choosing SpareLot, renters can browse available listings, compare prices, and book spaces with trusted hosts that meet their specific storage needs. All of this while providing safe, convenient, and affordable storage options across the country.
    </Typography>
    <Typography
      variant="h3"
      sx={{
        color: '#000',
        fontSize: { xs: '28px', xxl: '38px' },
        fontWeight:{xs:'650', xxl:'700'},
        lineHeight: '40px',
        mb: '10px',
        mt:'10px'
      }}
    >
      Hosts
    </Typography>
    <Typography
      variant="body1"
      sx={{

        color: '#5a5a5a',
        fontSize: { xs: '16px', xxl: '22px' },
        fontWeight: '550',
      }}
    >
      Our platform allows individuals, organizations, and businesses to list spaces ranging from garages to unpaved lots and start earning consistent, passive cash. By signing up, hosts can easily list available spaces, manage bookings, and find renters suited to their space.
    </Typography>
  </MKBox>

    <MKBox sx={{display:{xs:'none', xxl:'flex'}, height:'550px'}}>
      <img
        src={RVParking}
        alt="Our Story and Origins"
        style={{
          height: { xs: '0', xxl: '100%' }, // Hide image on mobile
          width: { xs: '0', xxl: 'auto' }, // Hide image on mobile
          borderRadius: '20px',
          objectFit: 'cover', // Ensure image covers the container properly
        }}
      />
    </MKBox>
</MKBox>



        <MKBox
  sx={{
    display: { xs: 'block', xxl: 'flex' },
    alignItems: 'center',
    justifyContent: { xs: 'center', xxl: 'space-between' },
    mt: { xs: '40px', xxl: '115px' },
    height: { xs: 'auto', xxl: '740px' },
    mb: { xs: '30px', xxl: '50px' },
    flexDirection: { xs: 'column', xxl: 'row' },
  }}
>
<MKBox
            component="img"
            src={MobileFrontHousePic}
            alt="About SpareLot"
            sx={{
              display: { xs: 'flex', xxl: 'none' }, // Hide on mobile, show on medium and larger,
              width: '100%',
              height:'auto',
              borderRadius: '20px',
              mb:'18px'
            }}
          />
  <MKBox sx={{display:{xs:'none', xxl:'flex'}, height:'735px'}}>
    <img
      src={HouseFront}
      alt="Our Story and Origins"
      style={{
        display: { xs: 'none', xxl: 'block' }, // Hide image on mobile
        height: { xs: '0', xxl: '100%' },
        width: { xs: '0', xxl: 'auto' },
        borderRadius: '20px',
        objectFit: 'cover', // Ensure image covers the container properly
        marginBottom: { xs: '20px', xxl: '0' } // Add margin bottom on mobile for spacing
      }}
    />
  </MKBox>

  <MKBox
    sx={{
      display: 'flex',
      flexDirection: 'column',
      maxWidth: { xs: '100%', xxl: '65%' },
      height: { xs: 'auto', xxl: '100%' },
      justifyContent: 'space-between',
    }}
  >
    <Typography
      variant="h1"
      sx={{

        color: '#000',
        fontSize: { xs: '38px', xxl: '58px' },
        fontWeight: '750',
        mb: { xs: '20px', xxl: '5px' },
      }}
    >
      Our Values
    </Typography>

    {[
      {
        number: '1',
        title: 'Community Empowerment',
        description: 'We believe in the power of community. By connecting people who need storage with those who have space to spare, we foster a sharing economy that benefits everyone involved.'
      },
      {
        number: '2',
        title: 'Trust and Security',
        description: 'Trust is the cornerstone of our platform. We implement robust security measures to protect our users\' information and ensure safe transactions. Our verification processes are designed to build and maintain trust between hosts, renters, and SpareLot.'
      },
      {
        number: '3',
        title: 'Accessibility',
        description: 'Our platform is built to be accessible to everyone. We strive to make storage solutions affordable and available to individuals from all walks of life. SpareLot is always here to help.'
      },
      {
        number: '4',
        title: 'Customer Centric',
        description: 'Customer satisfaction is at the heart of everything we do. We listen to our users to continuously improve our platform based on their feedback. From the SpareLot team, thank you users!'
      }
    ].map((item, index) => (
      <MKBox key={index} sx={{ mb: { xs: '20px', xxl: '5px' }, }}>
        <MKBox sx={{ display: 'flex', alignItems: 'center', mb: '10px',  }}>
          <MKBox
            sx={{
              fontSize: { xs: '18px', xxl: '20px' },
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: '#2e89ff',
              color: '#fff',
              height: '32px',
              width: '32px',
              borderRadius: '8px',
              mr: { xs: '10px', xxl: '20px' },
            }}
          >
            {item.number}
          </MKBox>
          <Typography
            variant="h3"
            sx={{
              color: '#000',
              fontSize: { xs: '21px', xxl: '32px' },
              fontWeight:{xs:'650', xxl:'700'},
              lineHeight: '32px',
              mb: '0px',
            }}
          >
            {item.title}
          </Typography>
        </MKBox>
        <Typography
          variant="body1"
          sx={{
    
            color: '#5a5a5a',
            fontSize: { xs: '16px', xxl: '20px' },
            fontWeight: '550',
          }}
        >
          {item.description}
        </Typography>
      </MKBox>
    ))}
  </MKBox>
</MKBox>

        {searchFlowOpen && <SearchFlow open={searchFlowOpen} onClose={() => setSearchFlowOpen(false)}/>}
      </Container>
    </>
  );
};

export default About;
