import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import ListingCard from '../../Card/Listing';
import Container from '@mui/material/Container'; // Assuming you are using Material-UI Container
import useVisibility from 'app/sections/Hooks/useVisibility';
import MKBox from 'components/MKBox';
import { ArrowBackIos, ArrowForwardIos, ArrowLeft, ArrowRight } from '@mui/icons-material';
import MKButton from 'components/MKButton';
import { Icon, IconButton, Skeleton, Typography, useMediaQuery } from '@mui/material';
import colors from 'assets/theme/base/colors';
import breakpoints from 'assets/theme/base/breakpoints';
import { useSearchResultsState } from 'app/pages/web/Explore/context';
import { useUserAuthState } from 'app/backend/user/auth/reactprovider';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import { getListings } from 'app/backend/db/public_listings/utils';
import './style.css'
import { LoadingSpinner } from 'app/utils/loading/component';
import { LoadingComponent } from 'app/utils/loading/component';

const ListingsCarousel = ({ title, description, zipCode, overrideListings}) => {
  const [currentListingIndex, setCurrentListingIndex] = useState(0);

  const {user, userImpl} = useUserAuthState();

  const isSmaller = useMediaQuery('(max-width: 1400px)');

  const isWindowMobile = window.visualViewport.width < breakpoints.values.md
  const listingVisualWidth = 350;
  const fullListingWidth = listingVisualWidth + 16;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {listings, initListingsFromCurrentLocation, previousSearch} = useSearchResultsState();

  const searchByCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          window.location.href = `/explore?lat=${latitude}&lng=${longitude}`
        },
      );
    }
  }

  const forward = () => {
    if (currentListingIndex < isSmaller ? listings.length - 2 : listings.length - 4) {
      setCurrentListingIndex(isSmaller ? currentListingIndex + 2 : currentListingIndex + 4)
    }
  }

  const backward = () => {
    if (currentListingIndex >= 1) {
      setCurrentListingIndex(isSmaller ? currentListingIndex - 2 : currentListingIndex - 4)
    }
  }

  useEffect(() => {
    const load_listings = async () => {
      setLoading(true);
      const res = await initListingsFromCurrentLocation()
      setLoading(false);
    }
    load_listings();
  }, []); // Fetch listings whenever zipCode changes

  return (
    <>
      <Container sx={{overflow: 'hidden', position: 'relative', width: '100%', my:4, pb:'10px'}}>
        <MKBox
          sx={{
            display:'flex',
            alignItems:'bottom',
            pb:'10px',
            mb:2
          }}
        >
          <div style={{display:'block'}}>
            <Typography
              variant='h1'
              sx={{
                color:'#000',

                fontSize:{xs:'28px', md:'42px'},
                mb:.5,
              }}
            >
              {title}
            </Typography>
            <Typography
              sx={{
                fontSize:'20px',
                color:'#000',

              }}
            >
              {description}
            </Typography>
          </div>

          <MKBox
            sx={{
              ml:'auto',
              alignItems:'center',
              display:{xs:'none', md:'flex'},
              gap:1.5,
              mt:'auto'
            }}
          >
            <IconButton
              sx={{
                border:currentListingIndex <= 0 ? '1px solid #b7b7b7' : '1px solid #737373',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                width:35,
                height:35,
                '&:hover':{
                  bgcolor:'#eee',
                },
              }}
              onClick={backward}
              disabled={currentListingIndex <= 0}
            >
              <ArrowBackIos
                sx={{
                  color:currentListingIndex <= 0 ? '#aaa' : '#000',
                  ml:1,
                }}
                fontSize="small"
              />
            </IconButton>
            <IconButton
              sx={{
                border:currentListingIndex >= (isSmaller ? listings.length - 2 : listings.length - 4)? '1px solid #b7b7b7' : '1px solid #737373',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                width:35,
                height:35,
                '&:hover':{
                  bgcolor:'#eee',
                },
              }}
              onClick={forward}
              disabled={currentListingIndex >= (isSmaller ? listings.length - 2 : listings.length - 4)}
            >
              <ArrowForwardIos
                sx={{
                  color:currentListingIndex >= (isSmaller ? listings.length - 2 : listings.length - 4)? '#aaa' : '#000',
                  ml:.2,
                }}
                fontSize="small"
              />
            </IconButton>
          </MKBox>
        </MKBox>
        <div 
          style={{ 
            paddingLeft:'2px',
            display:'flex', 
            gap:'16px',
            overflowX: isWindowMobile ? 'auto' : 'unset', // Enable horizontal scrolling
            transition: isWindowMobile ? '' : 'transform 0.5s ease-in-out', 
            transform: isWindowMobile ? `` : `translateX(-${currentListingIndex * fullListingWidth}px)`,
            paddingBottom:'10px',
            WebkitOverflowScrolling: 'touch', // Smooth scrolling on mobile
          }}
        >
          {
            loading ?

            <>
              {[0,0,0,0].map((_, idx) => (
                <Skeleton
                  variant='rectangular'
                  sx={{
                    minWidth:350,
                    minHeight:370,
                    width:'50%',
                    borderRadius:4,
                  }}
                />
              ))}
            </>

            :

            <>
              {
                listings.length
                ?
                (
                  <>
                    {listings.slice(0, 7).map((_, idx) => (
                      <ListingCard
                        key={idx}
                        listing={_.listing}
                        listing_uuid={_.id}
                        host={_.host}
                        customWidth={isWindowMobile ? '80vw' : listingVisualWidth}
                        userimpl={userImpl}
                        disableMultiImage={true}
                      />
                    ))}
                  </>
                )
                :
                (<></>)
              }
            </>
          }
        
          <MKBox onClick={searchByCurrentLocation}
            sx={{
              width: 350,
              border: '2px solid #e1e3e5',
              borderRadius: '8px',
              p: '32px 46px',
              display:loading?'none':'flex',
              justifyContent: 'flex-end',  // Aligns vertically to the bottom
              alignItems: 'flex-start',    // Aligns horizontally to the left
              flexDirection:'column',
              cursor:'pointer',
              '&:hover': {
                border:'2px solid #468fed',
                bgcolor:'#fafcff'
              },
            }}
          >
            <MKBox sx={{display:'flex', alignItems:'center', gap:1, minWidth:listingVisualWidth}}>
              <Typography
                variant='h6'
                sx={{

                  fontSize: '22px',
                  fontWeight: 610,
                  color: '#000',
                }}
              >
                Show More
              </Typography>
              <ArrowForwardIosIcon style={{height:'20px', color:'#000'}}></ArrowForwardIosIcon>
            </MKBox>
          </MKBox>
        </div>
      </Container>
    </>
  );
};

export default ListingsCarousel;