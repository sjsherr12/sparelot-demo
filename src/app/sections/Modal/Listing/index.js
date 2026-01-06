import styled from "@emotion/styled";
import { faBookmark, faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArrowBack, ArrowForward, Close, IosShare, Share, Star } from "@mui/icons-material";
import { Container, Button } from "@mui/material";
import { useUserAuthState } from "app/backend/user/auth/reactprovider";
import { makeListingTitle } from "app/utils/listings/utils";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import { useRef } from "react";
import { useModal } from "../Parent/context";
import { userauth_actions, userauth_title } from "../actions";
import { Avatar } from "@mui/material";
import { makeListingAddress } from "app/utils/listings/utils";
import { makeUsernameAbbreviated } from "app/utils/listings/utils";
import create_chat_for_users from "app/backend/cloud/create_chat_for_users";
import { makeDateFormatted } from "app/utils/listings/utils";
import formatDateUTC from "app/utils/date/formatDateUTC";
import { makeTimestampFormatted } from "app/utils/listings/utils";
import { useNavigate } from "react-router-dom";

const { default: colors } = require("assets/theme/base/colors");

const Overlay = styled('div')(({ open }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.33)', // Semi-transparent background
  zIndex: 4,
  display: 'block',
  opacity: open ? 1 : 0,
  pointerEvents: open ? 'auto' : 'none',
  transition: 'all 0.25s ease-out',
}));

const IconButton = styled(MKBox)(({ left, circle }) => ({
  color: colors.white.main,
  fontSize: '25px',
  fontFamily: 'Montserrat, sans serif',
  backgroundColor: colors.info.main,
  display: 'flex',
  gap: 12,
  lineHeight: 1,
  padding: 8,
  borderRadius: circle ? 32 : 8,
  marginLeft: left ? 'auto' : 'none',
  width: 'fit-content',
  '&:hover': {
    cursor: 'pointer',
  },
}));

const ListingPopup = ({ listing, listing_uuid, host, open, onClose }) => {
  
  const navigate = useNavigate();
  const { openModal } = useModal();
  const containerRef = useRef(null);
  const {user, logout} = useUserAuthState();

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= (containerRef.current.offsetWidth + 1);
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += (containerRef.current.offsetWidth + 100);
    }
  };

  const rentSpace = () => {
    if (user !== null) {
      navigate(`/checkout/${listing.location.zip}/${listing_uuid}`)
    }
    else {
      openModal(userauth_title, userauth_actions)
    }
  }

  return (
    <>
      <Overlay 
        open={open} 
        id='overlay' 
        onClick={onClose}
      />
      <Container
        sx={{
          zIndex: { xs: 100, md: 4 },
          position: 'fixed', // Changed from 'fixed' to 'absolute'
          top: {xs:0, md:82}, // navbar height
          opacity: open ? 1 : 0,
          left: { xs: 0, md: '50%' },
          transform: { xs: '', md: 'translateX(-50%)' },
          pointerEvents: open ? 'auto' : 'none',
          transition: 'all 0.25s ease-out',
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: { xs: '#fff', md: '#00000000' },
          height:'100dvh',
          overflow: 'auto', // Allow scrolling inside the container
        }}
      >
        <MKBox
          sx={{
            width: { xs: '100%', md: '90%' },
            backgroundColor: '#fff',
            overflow: 'auto', // Allow scrolling inside the box
            maxHeight: '100%', // Ensure it doesn't overflow the container
          }}
        >
          <MKBox
            sx={{
              display: 'flex',
              gap: 2,
              my: 2,
              mx: { xs: 0, md: 2 },
            }}
          >
            <IconButton
              circle={true}
              onClick={onClose}
              sx={{
                display:{xs:'flex',md:'none'},
                mr:'auto',
              }}
            >
              <IosShare />
            </IconButton>
            <IconButton
              sx={{
                display:{xs:'none',md:'flex'}
              }}
            >
              <FontAwesomeIcon icon={faBookmark} />
              {'Save'}
            </IconButton>

            <IconButton
              sx={{
                display:{xs:'none',md:'flex'}
              }}
            >
              <FontAwesomeIcon icon={faLocationArrow} />
              {'Share'}
            </IconButton>

            <IconButton
              left={true}
              circle={true}
              onClick={onClose}
            >
              <Close />
            </IconButton>

          </MKBox>

          <MKBox sx={{ position: 'relative', width: '100%' }}>
            <MKBox
              ref={containerRef}
              sx={{
                position:'relative',
                display: 'flex',
                scrollSnapType: 'x mandatory',
                overflow: 'auto',
                scrollBehavior: 'smooth',
                '&::-webkit-scrollbar': { display: 'none' }, // Hide scrollbar for Webkit browsers
                '-ms-overflow-style': 'none', // Hide scrollbar for IE and Edge
                'scrollbar-width': 'none', // Hide scrollbar for Firefox
              }}
            >
              {listing.display.images.map((src, index) => (
                <MKBox
                  key={index}
                  sx={{
                    flex: '0 0 auto',
                    width: '100%',
                    aspectRatio: 16 / 9,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    scrollSnapAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius:{xs:4, md:0}
                  }}
                >
                  <img
                    src={src}
                    alt={`Slide ${index}`}
                    style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 8 }}
                  />
                  <MKBox
                    sx={{
                      borderRadius:3,
                      backgroundColor:'#d1d5da',
                      position:'absolute',
                      bottom:4,
                      right:4,
                      px:1,
                    }}
                  >
                    <MKTypography
                      sx={{
                        color:'#000',
                        fontSize:20,
                        fontWeight:600,
                        fontFamily:'Montserrat, sans serif',
                      }}
                    >
                      {`${index+1} of ${listing.display.images.length}`}
                    </MKTypography>
                  </MKBox>
                </MKBox>
              ))}
            </MKBox>

            <MKBox
              sx={{
                display:{xs:'none', md:'flex'},
              }}
            >
              <IconButton
                onClick={scrollLeft}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  mx: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  },
                }}
              >
                <ArrowBack
                />
              </IconButton>
              <IconButton
                onClick={scrollRight}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  right: 0,
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  mx: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  },
                }}
              >
                <ArrowForward />
              </IconButton>
            </MKBox>

          </MKBox>

          
        </MKBox>
      </Container>
    </>
  );
};

export default ListingPopup;
