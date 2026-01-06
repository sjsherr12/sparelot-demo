import React, { useState, useEffect, useRef } from 'react';
import { Avatar, Backdrop, Fade, Icon, IconButton, Modal, useMediaQuery } from '@mui/material';
import { Star, LocationOn, BookmarkBorder, ArrowForwardIos, ArrowBackIos, Bookmark, MoreVert, Favorite, FavoriteBorder } from '@mui/icons-material';
import MKBox from 'components/MKBox';
import MKTypography from 'components/MKTypography';
import MKButton from 'components/MKButton';
import ListingPopup from 'app/sections/Modal/Listing';
import { makeListingTitle } from 'app/utils/listings/utils';
import { makeListingAddress } from 'app/utils/listings/utils';
import { makeUsernameAbbreviated } from 'app/utils/listings/utils';
import { useAnimate } from 'framer-motion';
import { useUserAuthState } from 'app/backend/user/auth/reactprovider';
import { arrayRemove, arrayUnion, doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import './style.css'
import Listing from 'app/pages/web/Listing';
import { useMoreOptions } from 'app/sections/More';
import theme from 'assets/theme';
import ListingModal from './modal';
import { MoreOptionsMenu } from 'app/sections/More';
import { PublishMenuItem } from 'app/sections/More';
import { UnpublishMenuItem } from 'app/sections/More';
import { DeleteMenuItem } from 'app/sections/More';
import { CancelReservationMenuItem } from 'app/sections/More';
import { ContactMenuItem } from 'app/sections/More';
import isStandalone from 'isStandalone';

const ListingCard = ({
  disabled,
  listing, 
  listing_uuid,
  reservationId,
  host,
  hostId,
  chatId,
  userimpl, 
  customWidth,
  customImageHeight, 
  dontShowSaveButton, 
  dontShowHostInfo, 
  onSave,
  onUnsave,
  isInPopupMode, 
  isDraftListing, 
  disableMultiImage, 
  popupModalListing,
  showMoreOptions,
  showPublishOption,
  showUnpublishOption,
  showDeleteDraftOption,
  showDeleteListingOption,
  showCancelReservationOption,
  showContactOption,
}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [hovered, setHovered] = useState(false);
  const swipeStartX = useRef(null);// Initialize with useRef
  const [saved, setSaved] = useState(false);
  const [listingModal, setListingModal] = useState(false);
  const isMobile = useMediaQuery(`(max-width:768px)`)
  const {user} = useUserAuthState();
  const [moreOptionsMenu, setMoreOptionsMenu] = useState(false);
  const [menuAlign, setMenuAlign] = useState(null);


  const handleNext = () => {
    if (currentImage < listing?.display?.images.length - 1) {
      setCurrentImage(currentImage + 1);
      return;
    }
  };

  const handlePrev = () => {
    if (currentImage > 0) {
      setCurrentImage(currentImage - 1);
    }
  };

  const handleTouchStart = (event) => {
    swipeStartX.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event) => {
    if (swipeStartX.current === null) return;

    const touchEndX = event.changedTouches[0].clientX;
    const swipeThreshold = 1; // Increase this value to make the swipe slower

    if (swipeStartX.current - touchEndX > swipeThreshold) {
      if (currentImage < listing?.display?.images.length - 1) {
        setCurrentImage(currentImage + 1);
      }
    }

    if (swipeStartX.current - touchEndX < -swipeThreshold) {
      if (currentImage > 0) {
        setCurrentImage(currentImage - 1);
      }
    }

    swipeStartX.current = null; // Reset after swipe
  };

  useEffect(() => {
    if (user && userimpl && userimpl.extra?.saved?.includes(listing_uuid)) {
      setSaved(true);
    }
  }, [user, userimpl, listing_uuid]);

  const toggleSaveListing = async (event) => {
    event.stopPropagation(); // Prevents the outer onClick from firing
    if (user && userimpl) {
      const isSaved = saved;

      setSaved(!isSaved); // Optimistically update UI

      try {
        if (isSaved) {
          // If listing is already saved, unsave it
          await setDoc(doc(getFirestore(), 'users', user.uid), {
            extra: {
              saved: arrayRemove(listing_uuid),
            },
          }, { merge: true });

          if (onUnsave) {
            onUnsave(listing_uuid);
          }

        } else {
          // If listing is not saved, save it
          await setDoc(doc(getFirestore(), 'users', user.uid), {
            extra: {
              saved: arrayUnion(listing_uuid),
            },
          }, { merge: true });

          if (onSave) {
            onSave(listing_uuid)
          }
        }
      } catch (error) {
        alert(`Error ${isSaved ? 'unsaving' : 'saving'} listing:`, error);
        setSaved(isSaved); // Revert UI update if there's an error
      }
    }
  };

  return (<>
    <MKBox
      sx={{
        minWidth:customWidth || { xs: '100%', md: 'calc(100% - 2px)', lg: 'calc(100% - 4px)' },
        maxWidth:customWidth || { xs: '100%', md: 'calc(100% - 2px)', lg: 'calc(100% - 4px)' },
        boxShadow: 2, // Slight shadow initially
        transition: 'box-shadow 0.3s ease-in-out', // Smooth shadow transition
        '&:hover': { boxShadow: 4, cursor:'pointer' }, // Increase shadow on hover
        borderRadius: '8px', // Outer border radius
      }}
    >
      <MKBox
        sx={{
          width:'100%',
          borderRadius: '8px',
          userSelect: 'none',
          position: 'relative',
        }}
      >
        <MKBox
          sx={{ position: 'relative', width:'inherit', height:customImageHeight || 250, borderRadius: '8px 8px 0px 0px', overflow: 'hidden' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onTouchStart={disableMultiImage ? null : handleTouchStart}
          onTouchMove={disableMultiImage ? null : handleTouchMove}
        >
          <>
            {listing?.display?.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index}`}
            draggable={false}
            style={{
              position: 'absolute',
              top: 0,
              left: `${(index - currentImage) * 100}%`, // Adjust position based on the current image index
              width: 'inherit',
              height:'inherit',
              objectFit: 'cover',
              transition: 'left 0.25s ease-in-out', // Smooth transition
              cursor:'pointer',
              transition:'all .5s ease',
            }}
            className="scale-on-hover"
            onClick={disabled ? null : () => {
              if (popupModalListing || isStandalone() || isMobile) {
                setListingModal(true);
              }
              else {
                window.open((showPublishOption || showDeleteDraftOption) ? `/draft/${listing_uuid}` : `/listing/${listing_uuid}`)
              }
            }}
          />
        ))}
        {!disableMultiImage && hovered && (
          <IconButton
          onClick={(event) => {
            event.stopPropagation(); // Prevents the outer onClick from firing
            handlePrev(); // Your save logic here
          }}
            sx={{
              position: 'absolute',
              left: 4,
              top: '50%',
              fontSize: 15,
              transform: 'translateY(-50%) scale(1)',
              zIndex: 2,
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255,255,255)',
              color: 'white',
              width: 30,
              height: 30,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255)',
                transform: 'translateY(-50%) scale(1.025)',
              },
            }}
          >
            <ArrowBackIos sx={{ ml: 0.5 }} />
          </IconButton>
        )}
        {!disableMultiImage && hovered && (
          <IconButton
          onClick={(event) => {
            event.stopPropagation(); // Prevents the outer onClick from firing
            handleNext(); // Your save logic here
          }}
            sx={{
              position: 'absolute',
              right: 4,
              top: '50%',
              fontSize: 15,
              transform: 'translateY(-50%) scale(1)',
              zIndex: 2,
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255,255,255)',
              color: 'white',
              width: 30,
              height: 30,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255)',
                transform: 'translateY(-50%) scale(1.025)',
              },
            }}
          >
            <ArrowForwardIos sx={{ justifySelf: 'center' }} />
          </IconButton>
        )}
        
        {!disableMultiImage &&
        <MKBox
          sx={{
            position: 'absolute',
            bottom: 8,
            alignItems: 'center',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <MKBox
            sx={{
              gap: 0.5,
              padding: 0.5,
              borderRadius: 32,
              display: 'flex',
              width: 'fit-content',
              backgroundColor: 'rgba(0,0,0,.66)',
            }}
          >
            {listing?.display?.images.map((_, index) => (
              <MKBox
                key={index}
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: index === currentImage ? '#fff' : 'rgba(255,255,255,0.5)',
                }}
              />
            ))}
              </MKBox>
            </MKBox>}
          </>
          
          {!dontShowHostInfo &&
          <>
            <MKBox
              sx={{
                position: 'absolute',
                top: 6,
                left: 6,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                p:.5,
                pr:1.25,
                borderRadius: 4,
                height:30,
              }}
            >
              <Avatar 
                src={host?.profile?.avatar} 
                sx={{ 
                  width: 24, 
                  height: 24, 
                  borderRadius: 4, 
                  '& img': {
                    width:'100%',
                    height:'100%',
                    objectFit:'cover'
                  } 
                }}
              />
              <MKTypography
                variant="body2"
                color="white"
                sx={{ display: 'flex', alignItems: 'center', fontFamily: 'Inter', fontWeight: 550, fontSize: '.75rem' }}
              >
                {makeUsernameAbbreviated(host)}
              </MKTypography>
            </MKBox>

            {user && (
                <IconButton
                sx={{
                  position: 'absolute',
                  top: 6,
                  right: 6,
                  width: 32,
                  height: 32,
                  backgroundColor: saved ? '#2e89ff' : '#fff',
                  padding: '4px',
                  borderRadius: 4,
                  display: dontShowSaveButton ? 'none' : 'flex',
                  '&:hover':{
                    backgroundColor: saved ? '#286ec8' : '#e5e5e5'
                  }
                }}
                onClick={toggleSaveListing}
              >
                {saved ? <Bookmark style={{ color: '#fff' }} /> : <BookmarkBorder style={{ color: '#000' }} />}
              </IconButton>
            )}
          </>
          }
        </MKBox>

        <MKButton
          disabled={disabled}
          sx={{
            padding: 2,
            px:isInPopupMode?0:2,
            textAlign: 'left',
            width: '100%',
            borderRadius: '0px 0px 8px 8px',
          }}
          onClick={disabled ? null : () => {
            if (popupModalListing || isStandalone() || isMobile) {
              setListingModal(true);
            }
            else {
              window.open((showPublishOption || showDeleteDraftOption) ? `/draft/${listing_uuid}` : `/listing/${listing_uuid}`)
            }
          }}
          color='none'
        >
          <MKBox
            sx={{
              width:'100%',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display:'flex',
              justifyContent: 'left',
              flexDirection:'column',
            }}
          >
            <MKTypography variant="h6" sx={{ fontWeight: '750',  color:'#000', fontSize:'22px' }}>
              {makeListingTitle(listing)}
            </MKTypography>
            <MKTypography variant="h6" color="textSecondary" sx={{  color:'#737373', fontWeight:500, }}>
              {`$${listing?.logistics?.price} / Month`}
            </MKTypography>
            <MKTypography
              sx={{
                display: 'flex',
                alignItems: 'center',

                height:isInPopupMode ? 0 : "unset",
              }}
            >
              <LocationOn sx={{ fontSize: 16, marginRight: '4px', color:'#737373', }} />
              <MKTypography
                variant="body2"
                color="textSecondary"
                sx={{
                  
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color:'#737373',
                  fontWeight:400,
                  fontSize:'15px'
                }}
              >
                {makeListingAddress(listing)}
              </MKTypography>
            </MKTypography>
          </MKBox>
        </MKButton>

        <IconButton
          sx={{
            boxShadow:2,
            bgcolor:'#fff',
            '&:hover':{bgcolor:'#fff'},
            '&:focus':{bgcolor:'#fff'},
            display:showMoreOptions?'flex':'none',
            position:'absolute',
            top:4,
            right:4,
            width:30,
            height:30,
          }}
          onClick={(e) => {
            setMenuAlign(e.currentTarget)
            setMoreOptionsMenu(true);
          }}
        >
          <MoreVert />
        </IconButton>
      </MKBox>
    </MKBox>

    <ListingModal
      listing={listing}
      host={host}
      listingId={listing_uuid}
      open={listingModal}
      setOpen={setListingModal}
      isDraft={showPublishOption || showDeleteDraftOption}
    />

    {showMoreOptions && 
      <MoreOptionsMenu
        open={moreOptionsMenu}
        onClose={() => setMoreOptionsMenu(false)}
        menuAlign={menuAlign}
      >
        {showPublishOption &&
          <PublishMenuItem
            draftId={listing_uuid}
            disabled={!user?.uid || listing?.host !== user?.uid}
          />
        }
        {showUnpublishOption &&
          <UnpublishMenuItem
            listingId={listing_uuid}
            disabled={!user?.uid || listing?.host !== user?.uid}
          />
        }
        {showDeleteDraftOption &&
          <DeleteMenuItem
            draftId={listing_uuid}
            disabled={!user?.uid || listing?.host !== user?.uid}
          />
        }
        {showDeleteListingOption &&
          <DeleteMenuItem
            listingId={listing_uuid}
            disabled={!user?.uid || listing?.host !== user?.uid}
          />
        }
        {showCancelReservationOption &&
          <CancelReservationMenuItem
            reservationId={reservationId}
            isRenterCancelling={listing?.host !== user?.uid}
            disabled={!user?.uid}
          />
        }
        {showContactOption &&
          <ContactMenuItem
            chatId={chatId}
            hostId={hostId}
            userId={user?.uid}
            disabled={!user?.uid || listing?.host === user?.uid}
          />
        }
      </MoreOptionsMenu>
    }
  </>);
};

export default ListingCard;