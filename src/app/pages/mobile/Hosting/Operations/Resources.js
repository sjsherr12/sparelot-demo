import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import { option_routes } from "app/sections/Options/routes";
import { footer_option_routes_renter } from "app/sections/Options/routes";
import MKBox from "components/MKBox";
import MKButton from 'components/MKButton';
import { Box, Container, Typography, useMediaQuery } from "@mui/material";
import ResourcePic from 'assets/images/ResourcePic.webp';
import ResourcePic1 from 'assets/images/ResourcePic1.webp';
import ResourcePic2 from 'assets/images/ResourcePic2.webp';
import ResourcePic3 from 'assets/images/ResourcePic3.webp';
import ResourcePic4 from 'assets/images/ResourcePic4.webp';
import ResourcePic5 from 'assets/images/ResourcePic5.webp';
import ResourcePic6 from 'assets/images/ResourcePic6.webp';

import { Helmet } from 'react-helmet-async';
import HostContentWrapper from 'app/utils/wrapper/host/content';
import HostingEssentials from 'app/pages/web/Help/FAQs/HostingEssentials';
import HostingPayments from 'app/pages/web/Help/Hosting/HostingPayments';
import MaxEarnings from 'app/pages/web/Help/Hosting/MaxEarnings';
import HostEligibility from 'app/pages/web/Help/Hosting/HostEligibility';
import CreateListing from 'app/pages/web/Help/Hosting/CreateListing';
import ManageListing from 'app/pages/web/Help/Hosting/ManageListing';
import ReservationCancellationHosts from 'app/pages/web/Help/Hosting/ReservationCancellationHosts';
import AdaptiveModal from 'app/sections/Modal/Adaptive';
import isStandalone from 'isStandalone';

const now = (new Date()).getTime()

// Define the HostResource component
const HostResource = ({ imageSrc, title, subtitle, route, Component }) => {
  const [open, setOpen] = useState(false);
  const isMobile = isStandalone()

  return (
    <>
      <MKBox
        component={isMobile ? Box : Link}
        to={route}
        target='_blank'
        onClick={() => {
          if (isMobile) {
            setOpen(true)
          }
        }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          borderRadius: '18px',
          padding: '10px',
          marginBottom: '15px', // adds spacing between each HostResource component
          position: 'relative',
          height:125,
          transition:'.15s ease',
          '&:hover':{
            bgcolor:'#f0f0f0',
          },
          transition:'.15s ease',
          boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)', // Optional hover effect for better UI
        }}
      >
        <MKBox
          component="img"
          src={imageSrc}
          alt={title}
          sx={{
            objectFit:'cover',
            borderRadius: '16px 0 0 16px', // rounded on the left side, straight on the right
            height: '100%', // adjust height as needed
            width: '115px', // adjust width as needed
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
          }}
        />
        <MKBox sx={{ marginLeft: '125px',}}> {/* Adjusted margin to account for the image width */}
          <Typography variant="h4" sx={{
            fontWeight: 650,
            fontSize:'1rem',
            color: '#000',
            mb:'10px'
          }}>
            {title}
          </Typography>
          <Typography variant="body1" sx={{
            fontWeight: 550,
            fontSize:'.75rem',
            color: '#737373',
          }}>
            {subtitle}
          </Typography>
        </MKBox>
      </MKBox>

      <AdaptiveModal
        title={title}
        open={open}
        onClose={() => setOpen(false)}
        sideSwipeMobile={{
          customExtension: `host_resource_${title.replaceAll(' ', '_')}_${now}`
        }}
      >
        <Component />
      </AdaptiveModal>
    </>
  );
};

const HostResources = () => {
  const resources = [
    { imageSrc: ResourcePic, title: "Hosting Essentials", subtitle: "All essentials of being a host on SpareLot in one place.", route: "/help/hosting/hostingessentials/", Component: HostingEssentials },
    { imageSrc: ResourcePic1, title: "Hosting Payments", subtitle: "Find when, where, and how hosts receive renter payouts.", route: "/help/hosting/hostingpayments/", Component: HostingPayments, },
    { imageSrc: ResourcePic2, title: "Maximizing Your Earnings", subtitle: "Learn how to get the most out of your space.", route: "/help/hosting/maxearnings/", Component: MaxEarnings, },
    { imageSrc: ResourcePic3, title: "Host Eligibility", subtitle: "Who can become a host and which spaces you can rent.", route: "/help/hosting/hosteligibility", Component: HostEligibility, },
    { imageSrc: ResourcePic4, title: "Creating a Listing", subtitle: "How to navigate the listing process and start earning.", route: "/help/hosting/createlisting", Component: CreateListing },
    { imageSrc: ResourcePic5, title: "Managing a Listing", subtitle: "How to properly take care of and promote a listing.", route: "/help/hosting/managelisting", Component: ManageListing, },
    { imageSrc: ResourcePic6, title: "Reservation Cancellation", subtitle: "What happens in the case of a cancellation—by renter or host.", route: "/help/hosting/reservationcancellationhosts", Component: ReservationCancellationHosts },
  ];

  return (
    <HostContentWrapper>
      <Helmet>
        <title>SpareLot | Host Resources</title>
        <meta name="description" content="Find resources for hosts to utilize." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Box
        sx={{
          mb:2,
          gap:2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            mt:1,
            gap:2,
            width:'100%',
            display:'grid',
            gridTemplateColumns:{xs:'repeat(1, 1fr)',lg:'repeat(2, 1fr)', xl:'repeat(3, 1fr)'}
          }}
        >
        {resources.map((resource, index) => (
          <HostResource
            key={index}
            imageSrc={resource.imageSrc}
            title={resource.title}
            subtitle={resource.subtitle}
            route={resource.route}  // Pass the route to each HostResource
            Component={resource.Component}
          />
        ))}
        </Box>
      </Box>
    </HostContentWrapper>
  );
};

export default HostResources;
