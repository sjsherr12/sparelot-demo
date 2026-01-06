import React, { useState, useEffect } from 'react';
import { Container, CircularProgress, Box, Typography, Rating, Link } from '@mui/material';
import MKBox from "components/MKBox";
import MKTypography from 'components/MKTypography';
import BadgeIcon from '@mui/icons-material/Badge';
import LinearProgress from '@mui/material/LinearProgress';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import StarIcon from '@mui/icons-material/Star';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import HelpIcon from '@mui/icons-material/Help';
import { useUserAuthState } from 'app/backend/user/auth/reactprovider';
import { useNavigate } from 'react-router-dom';
import MKButton from 'components/MKButton';
import colors from 'assets/theme/base/colors';
import { Helmet } from 'react-helmet-async';
import HostContentWrapper from 'app/utils/wrapper/host/content';

const StatusProgress = ({ listingQuality, approvalRate, bookings, hostRating }) => {
  const isApprovalRateMet = approvalRate > 70;
  const conditionsMet = [listingQuality, isApprovalRateMet, bookings, hostRating].filter(Boolean).length;
  const percentage = (conditionsMet / 4) * 100;

  return (
    <MKBox display="flex" alignItems="center">
      <MKBox position="relative" display="inline-flex" marginRight='32px'>
        <CircularProgress
          variant="determinate"
          value={100} 
          size={100}
          thickness={5}
          sx={{
            color: '#ebeced', 
            position: 'absolute',
          }}
        />
        <CircularProgress
          variant="determinate"
          value={percentage}
          size={100}
          thickness={5}
          sx={{
            color: 'info.main',
          }}
        />
        <MKBox
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <MKTypography variant="h6" fontSize="20px" sx={{fontWeight: '650', fontFamily: 'Montserrat, sans-serif', color:'#000'}}>
            {`${Math.round(percentage)}%`}
          </MKTypography>
        </MKBox>
      </MKBox>
      
      <MKBox ml={2}>
        <MKTypography variant="h6" sx={{fontWeight: '650', fontFamily: 'Montserrat, sans-serif', fontSize:'22px', color:'#000'}}>
          Status:
        </MKTypography>
        <MKTypography variant="body1" sx={{fontWeight: '600', fontFamily: 'Montserrat, sans-serif', fontSize:'18px', color:'#737373'}}>
          {`${conditionsMet}/4 categories met`}
        </MKTypography>
      </MKBox>
    </MKBox>
  );
};

const ListingAndAccountQuality = ({ setListingQuality }) => {
  const {user} = useUserAuthState();

  const conditions = [
    { title: "Verify Account", value: (user.emailVerified !== undefined && user.emailVerified === true) + 0, max: 1 },
    { title: "Add Profile Picture", value: (user.photoURL !== undefined) + 0, max: 1 },
    { title: "Upload Photos", value: 6, max: 6 },
    { title: "Short Bio", value: 35, max: 35 },
    { title: "Space Description", value: 40, max: 50 },
  ];

  useEffect(() => {
    // Check if all conditions are met
    const allConditionsMet = conditions.every(condition => condition.value >= condition.max);
    setListingQuality(allConditionsMet);
  }, [conditions, setListingQuality]);

  return (
    <MKBox sx={{ p: '15px 15px', border: '2px solid #acb3bc', borderRadius: '12px', mt: '18px' }}>
      <MKBox sx={{ display: 'flex', alignItems: 'center', mb: '6px' }}>
        <BadgeIcon style={{ height: '30px', width: 'auto', color: '#000', marginRight: '15px' }} />
        <MKTypography variant='h6' sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '660', fontSize: '18px', color: '#000' }}>
          Listing and Account Quality
        </MKTypography>
      </MKBox>
      <MKTypography variant='body1' sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '550', fontSize: '14px', color: '#737373', mb: '12px' }}>
        Verify account, add profile picture, upload 5+ photos, write short biography, include space description.
      </MKTypography>

      {conditions.map((condition, index) => (
        <MKBox key={index} sx={{mb: index === conditions.length - 1 ? '4px' : '18px'}}>
          <MKBox sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '6px' }}>
            <MKBox sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <MKTypography variant="body1" sx={{ color: '#737373', fontWeight: '550', fontFamily: 'Montserrat, sans-serif', fontSize:'16px' }}>
                {condition.title}
              </MKTypography>
            </MKBox>
            <MKTypography variant="body2" sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '550', color: '#737373' }}>
              {`${condition.value}/${condition.max}`}
            </MKTypography>
          </MKBox>
          <MKBox
            sx={{
              width:'100%',
              height:5,
              position:'relative',
              bgcolor:'#ebebeb',
              borderRadius:'10px'
            }}
          >
            <div style={{position:'absolute', top:0, left:0, height:5, width:`${(condition.value / condition.max) * 100}%`, backgroundColor:'#409c43', borderRadius:'10px'}}/>
          </MKBox>
        </MKBox>
      ))}
    </MKBox>
  );
};

const ApprovalRate = ({ approvalRate }) => {
  return (
    <MKBox sx={{ p: '15px 15px', border: '2px solid #acb3bc', borderRadius: '12px', mt: '18px' }}>
      <MKBox sx={{ display: 'flex', alignItems: 'center', mb: '6px' }}>
        <ThumbUpIcon style={{ height: '30px', width: 'auto', color: '#000', marginRight: '15px' }} />
        <MKTypography variant='h6' sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '660', fontSize: '18px', color: '#000' }}>
          Approval Rate
        </MKTypography>
      </MKBox>
      <MKTypography variant='body1' sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '550', fontSize: '14px', color: '#737373', mb: '12px' }}>
        Approve over 70% of renter reservation requests.
      </MKTypography>

      <MKTypography variant="h4" sx={{ fontWeight: '650', fontFamily: 'Montserrat, sans-serif', fontSize: '30px', color:'#000', mb:'8px' }}>
        {approvalRate !== null && approvalRate >= 0 ? `${approvalRate}%` : '—%'}
      </MKTypography>

      <MKTypography variant='body2' sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '550', fontSize: '12px', color: '#000', mb: '16px' }}>
        Current request approval rate
      </MKTypography>

      <Link href='/account/notifications/view'>
        <MKTypography
          variant="body1"
          sx={{ color: 'info.main', fontWeight: '550', fontFamily: 'Montserrat, sans-serif', cursor: 'pointer', fontSize:'16px' }}
        >
          See Notifications
        </MKTypography>
      </Link>
    </MKBox>
  );
};

const Bookings = ({ numberOfBookings }) => {
  return (
    <MKBox sx={{ p: '15px 15px', border: '2px solid #acb3bc', borderRadius: '12px', mt: '18px' }}>
      <MKBox sx={{ display: 'flex', alignItems: 'center', mb: '6px' }}>
        <EventAvailableIcon style={{ height: '30px', width: 'auto', color: '#000', marginRight: '15px' }} />
        <MKTypography variant='h6' sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '660', fontSize: '18px', color: '#000' }}>
          Bookings
        </MKTypography>
      </MKBox>
      <MKTypography variant='body1' sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '550', fontSize: '14px', color: '#737373', mb: '12px' }}>
        Have had at least one booking in the past or have one currently ongoing.
      </MKTypography>

      <MKTypography variant="h4" sx={{ fontWeight: '650', fontFamily: 'Montserrat, sans-serif', fontSize: '30px', color:'#000', mb:'8px' }}>
        {numberOfBookings}
      </MKTypography>

      <MKTypography variant='body2' sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '550', fontSize: '12px', color: '#000', mb: '16px' }}>
        Number of Bookings
      </MKTypography>

      <Link href='/hosting/listings/unpublished'>
        <MKTypography
          variant="body1"
          sx={{ color: 'info.main', fontWeight: '550', fontFamily: 'Montserrat, sans-serif', cursor: 'pointer', fontSize:'16px' }}
        >
          Begin a Listing
        </MKTypography>
      </Link>
    </MKBox>
  );
};

const HostRating = ({ hostRating }) => {
  const navigate = useNavigate();
  return (
    <MKBox sx={{ p: '15px 15px', border: '2px solid #acb3bc', borderRadius: '12px', mt: '18px' }}>
      <MKBox sx={{ display: 'flex', alignItems: 'center', mb: '6px' }}>
        <StarIcon style={{ height: '30px', width: 'auto', color: '#000', marginRight: '15px' }} />
        <MKTypography variant='h6' sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '660', fontSize: '18px', color: '#000' }}>
          Host Rating
        </MKTypography>
      </MKBox>
      <MKTypography variant='body1' sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '550', fontSize: '14px', color: '#737373', mb: '12px' }}>
        Maintain an average rating of 3.5 stars or higher.
      </MKTypography>

      <Rating
        name="half-rating-read"
        value={hostRating !== null && hostRating >= 0 ? hostRating : 0}
        precision={0.1}
        size='large'
        readOnly
      />
      <MKTypography variant="h4" sx={{ fontWeight: '650', fontFamily: 'Montserrat, sans-serif', fontSize: '30px', color:'#000' }}>
        {hostRating !== null && hostRating >= 0 ? hostRating.toFixed(1) : '—'}
      </MKTypography>

      <MKTypography variant='body2' sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '550', fontSize: '12px', color: '#000', mb: '16px' }}>
        Current average rating
      </MKTypography>

      <Link href='/hosting/operations/reviews'>
        <MKTypography
          variant="body1"
          sx={{ color: 'info.main', fontWeight: '550', fontFamily: 'Montserrat, sans-serif', cursor: 'pointer', fontSize:'16px' }}
        >
          See Reviews
        </MKTypography>
      </Link>
    </MKBox>
  );
};

const EliteHostAdvantages = () => {
  const advantages = [
    {
      icon: <AdminPanelSettingsIcon sx={{ color: '#2e89ff', height:'35px', width:'auto' ,marginRight: '14px' }} />,
      title: "Elite Host Badge",
      subtitle: "The Elite Host badge will appear on your profile and listings, setting you apart from other hosts. It serves as a cue to renters that you are a reliable host. "
    },
    {
      icon: <SavedSearchIcon sx={{ color: '#2e89ff', height:'35px', width:'auto', marginRight: '15px' }} />,
      title: "Higher Search Rankings",
      subtitle: "The listings of Elite Hosts will appear towards the top in search rankings, making it easier for renters to find your space. Additionally, renters will be able to filter for only Elite Hosts. "
    },
    {
      icon: <HelpIcon sx={{ color: '#2e89ff', height:'35px', width:'auto', marginRight: '15px' }} />,
      title: "Tools and Support",
      subtitle: "Elite Hosts will receive exclusive tools to manage and promote their listings as well as priority support. You will be able to directly contact SpareLot’s support team. "
    },
  ];

  return (
    <MKBox>
      <MKTypography variant='h4' sx={{ fontWeight: '710', fontFamily: 'Montserrat, sans-serif', fontSize:'26px', color:'#000', mb: '8px', mt:'25px' }}>
        Elite Host Advantages
      </MKTypography>
      <MKTypography variant='h4' sx={{ fontWeight: '570', fontFamily: 'Montserrat, sans-serif', fontSize: '14px', color: '#737373', mb: '16px' }}>
        Being an Elite Host on SpareLot comes with specific advantages that will help you find more renters, rent your space faster, and ultimately generate more cash.
      </MKTypography>
      {advantages.map((advantage, index) => (
        <MKBox sx={{mb:'24px'}}>
          <MKBox key={index} sx={{ display: 'flex', alignItems: 'center', mb: '5px' }}>
            {advantage.icon}
            <MKTypography variant='h6' sx={{ fontWeight: '650', fontFamily: 'Montserrat, sans-serif', fontSize: '21px', color: '#000' }}>
              {advantage.title}
            </MKTypography>
          </MKBox>
          <MKTypography variant='body2' sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '570', fontSize: '14px', color: '#737373' }}>
              {advantage.subtitle}
          </MKTypography>
        </MKBox>
      ))}
    </MKBox>
  );
};

const HostEliteHost = () => {
  const [listingQuality, setListingQuality] = useState(false);
  const [approvalRate, setApprovalRate] = useState(null);
  const [numberOfBookings, setNumberOfBookings] = useState(0);
  const [hostRating, setHostRating] = useState(5);
  const {user, userImpl} = useUserAuthState();
  useEffect(() => {
    setHostRating(5.0) // needs to be replaced
  }, [])
  return (
    <HostContentWrapper>
      <Helmet>
        <title>SpareLot | Elite Host</title>
        <meta name="description" content="See how to become an Elite Host on SpareLot." />
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
        <MKBox sx={{ width:{xs:'100%',lg:'50%'} }}>
          <Typography variant='h4' sx={{ fontWeight: '570', fontSize: '14px', color: '#737373' }}>
            The Elite Host program is a hosting status that provides exceptional hosts with specific hosting advantages. Requirements to become an elite host and info about how close to those requirements you are will be released in a later update. <span style={{color:colors.info.main}}>Check back later for more.</span>
          </Typography>
        </MKBox>
        {/* <MKButton disabled sx={{display:'block'}}>
          <MKTypography variant='h4' sx={{ fontWeight: '710', fontFamily: 'Montserrat, sans-serif', fontSize:'26px', color:'#000', mb: '12px', textAlign:'start' }}>
            Requirements
          </MKTypography>
          <StatusProgress 
            listingQuality={listingQuality}
            approvalRate={approvalRate}
            bookings={numberOfBookings > 0}
            hostRating={hostRating >= 3.5}
          />
          <ListingAndAccountQuality setListingQuality={setListingQuality} />
          <ApprovalRate approvalRate={approvalRate} />
          <Bookings numberOfBookings={numberOfBookings} />
          <HostRating hostRating={hostRating} />
        </MKButton>
        <hr style={{marginTop:'30px'}}></hr>
        <MKBox>
          <EliteHostAdvantages></EliteHostAdvantages>
        </MKBox> */}
      </Box>
    </HostContentWrapper>
  );
}

export default HostEliteHost;
