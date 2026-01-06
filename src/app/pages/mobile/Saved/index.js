import React, { useState, useEffect } from 'react';
import MKBox from 'components/MKBox';
import MKTypography from 'components/MKTypography';
import MKButton from 'components/MKButton';
import { Box, Container, Icon, Typography, useMediaQuery } from '@mui/material';
import ListingCard from "app/sections/Options/Card/Listing";
import { getUser } from 'app/backend/db/user';
import { useUserAuthState } from 'app/backend/user/auth/reactprovider';
import { useNavigate } from 'react-router-dom';
import { getListing } from 'app/backend/db/public_listings/utils';
import colors from 'assets/theme/base/colors';
import { Helmet } from 'react-helmet-async';
import theme from 'assets/theme';
import { BookmarkAddOutlined } from '@mui/icons-material';
import { LoadingSpinner, LoadingComponent } from "app/utils/loading/component";
import Filler from 'app/sections/Filler';
import isStandalone from 'isStandalone';
import { isMobile } from 'react-device-detect';

const SavedListings = () => {
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(true);
  const {user, userImpl, forceReloadUserImpl} = useUserAuthState();
  const [saved, setSaved] = useState([]);
  const isMobile = useMediaQuery('(max-width:991px)')

  const onUnsave = (listingId) => {
    setSaved((prevSaved) => prevSaved.filter(s => s?.id !== listingId))
  }

  useEffect(() => {
    const get_saved = async () => {
      setLoading(true);
      if (user) {
        await forceReloadUserImpl();
        if (userImpl?.extra?.saved?.length) {
          setSaved([]);
          const to_set = await Promise.all(
            userImpl.extra.saved.map(async (sl_id) => {
              const ls = await getListing(sl_id);
              if (ls?.listing && ls?.host) {
                return {
                  listing: ls?.listing,
                  host: ls?.host,
                  id: sl_id,
                };
              }
              return null
            })
          );
          setSaved(to_set);
        }        
      }
      setLoading(false)
    }
    get_saved()
  }, [reload])

  const AdaptiveContainer = isMobile ? Box : Container;

  return (
    <>
      <Helmet>
        <title>SpareLot | Saved Listings</title>
        <meta name="description" content="See your saved listings in one place." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <AdaptiveContainer
          sx={{
              display: 'flex',
              minHeight:'inherit',
              flexDirection: 'column',
              pt:isStandalone()?12:0,
              pb:2,
          }}
      >
        <Box
            sx={{
                mb:2,
                px:{xs:2,lg:0},
                pt:{xs:0,lg:3},
                pb:{xs:0,lg:1},
                height: {xs:75,lg:'fit-content'},
                display: 'flex',
                fontSize: 20,
                position:isStandalone() ? 'absolute':'relative',
                top:0,
                left:0,
                zIndex:1,
                bgcolor:'#fff',
                width:'100%',                
                alignItems: 'center',
                borderBottom: '1px solid #ededed',
            }}
          >
            <Typography variant="h3">Saved Spaces</Typography>
          </Box>
          {loading &&
            <Box
              sx={{
                my:'auto',
              }}
            >
              <LoadingSpinner />
            </Box>
          }
          {!loading && saved.length <= 0 &&
            <Box
              sx={{
                width:'100%',
                px: 2,
              }}
            >
              <Filler
                  LargeIcon={BookmarkAddOutlined}
                  title={'You have no saved spaces.'}
                  desc={'Use saved spaces to easily store listings you like and compare them to others!'}
              />
            </Box>
          }
          {!loading && saved.length > 0 && <>
            <Box
                sx={{
                    px:{xs:2,lg:0},
                    mt:1,
                    gap:4,
                    display:'flex',
                    flexDirection:'column',
                }}
            >
                <Typography
                    sx={{
                        color:'#000',
                        fontWeight:450,
                        fontSize:'1rem'
                    }}
                >
                    Use saved spaces to easily store listings you like and compare them to others. Click on any listing below to see its details and book the space.
                </Typography>

                <Box
                  sx={{
                      display: 'grid',
                      gridTemplateColumns: {xs:'repeat(1, 1fr)', md:'repeat(2, 1fr)', lg:'repeat(2, 1fr)', xl:'repeat(3, 1fr)', xxl:'repeat(4, 1fr)'},
                      gap:2,
                      width:'inherit',
                  }}
              >
                  {saved.map((it, idx) => {
                    if (it?.listing && it?.host) {
                      return (
                        <ListingCard
                          key={idx}
                          listing={it?.listing}
                          listing_uuid={it?.id}
                          userimpl={userImpl}
                          host={it?.host}
                          customWidth="100%"
                          onUnsave={onUnsave}
                        />
                      )
                    }
                    return null
                  })}
              </Box>
            </Box>
          </>}
      </AdaptiveContainer>
    </>
  );
};

export default SavedListings;
