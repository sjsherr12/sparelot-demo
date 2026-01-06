const { BookmarkBorder, ArrowBackIos, ArrowForwardIos, Star, LocationOn, VerifiedUser, QuestionMark, Help } = require("@mui/icons-material");
const { IconButton, Skeleton, Icon, Avatar, Tooltip, Rating, Box, Typography } = require("@mui/material");
const { default: MKBox } = require("components/MKBox");
const { useRef, useState, useEffect, useMemo } = require("react");

const ImageCounter = ({ currentIndex, totalImages }) => {
    return (
      <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          borderRadius: '4px',
          padding: '4px 8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontFamily:'Inter',
            color: '#FFFFFF',
            fontSize: '0.875rem',
            fontWeight: 500,
          }}
        >
          {currentIndex + 1} / {totalImages}
        </Typography>
      </Box>
    );
  };

const ListingImageCarousel = ({listing}) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [listingPopupOpen, setListingPopupOpen] = useState(false);
    const [hovered, setHovered] = useState(false);
    const swipeStartX = useRef(null);

    if (!listing) {
        return (
            <>
                <Skeleton
                    variant='rectangular'
                    width='100%'
                    height={250}
                    animation='pulse'
                    borderRadius={4}
                />
            </>
        )
    }
  
    const handleNext = () => {
      if (currentImage < listing?.display?.images?.length - 1) {
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
        if (currentImage < listing?.display?.images?.length - 1) {
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
    return (
        <div>
            <MKBox
                sx={{ position: 'relative', paddingTop:{xs:'100%',lg:'50%'}, overflowX: 'hidden', mt:{xs:0,md:2,}, borderRadius:{xs:0,md:3}}}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
            >
                <>
                    {listing?.display?.images?.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`Image ${index}`}
                            draggable={false}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: `${(index - currentImage) * 100}%`, // Adjust position based on the current image index
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                transition: 'left 0.25s ease-in-out', // Smooth transition
                            }}
                        />
                    ))}
                    {hovered && currentImage > 0 && (
                        <IconButton
                        onClick={handlePrev}
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
                            <ArrowBackIos sx={{ ml: 0.66 }} />
                        </IconButton>
                    )}
                    {hovered && currentImage < listing?.display?.images?.length - 1 && (
                        <IconButton
                        onClick={handleNext}
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
<ImageCounter 
  currentIndex={currentImage} 
  totalImages={listing.display.images.length} 
/>
                </>
            </MKBox>
        </div>
    )
}

export default ListingImageCarousel;