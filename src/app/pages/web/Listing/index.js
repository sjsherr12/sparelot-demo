import { Helmet } from "react-helmet-async";
import ListingHelmetSchema from "./schema";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getListing } from "app/backend/db/public_listings/utils";
import { useUserAuthState } from "app/backend/user/auth/reactprovider";
import { arrayRemove, arrayUnion, collection, doc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { Avatar, Box, Button, Container, Icon, IconButton, ImageList, ImageListItem, Modal, Skeleton, Typography, useMediaQuery } from "@mui/material";
import Hr from "app/utils/Hr";
import MKButton from "components/MKButton";
import { makeListingTitleExtended } from "app/utils/listings/utils";
import { makeListingAddress } from "app/utils/listings/utils";
import { ArrowBackIosNew, AssignmentInd, AssignmentIndOutlined, AutoAwesomeMosaicOutlined, Favorite, FavoriteBorder, LocationOnOutlined, MoreHoriz, PhotoAlbum, PhotoLibraryOutlined, ThreePOutlined, ArrowBackIosNewRounded, ArrowForwardIosRounded } from "@mui/icons-material";
import {motion} from 'framer-motion'
import colors from "assets/theme/base/colors";
import { MoreOptionsMenu } from "app/sections/More";
import { ShareMenuItem } from "app/sections/More";
import { ReportMenuItem } from "app/sections/More";
import { PublishMenuItem } from "app/sections/More";
import { DeleteMenuItem } from "app/sections/More";
import { UnpublishMenuItem } from "app/sections/More";
import AdaptiveModal from "app/sections/Modal/Adaptive";
import { ListingAccessingInfo, ListingHostInfoDisplay, ListingSpecificationsDisplay } from "./sections";
import { makeUsernameAbbreviated } from "app/utils/listings/utils";
import { makeTimestampFormatted } from "app/utils/listings/utils";
import { LoadingSpinner } from "app/utils/loading/component";
import create_chat_for_users from "app/backend/cloud/create_chat_for_users";
import { useModal } from "app/sections/Modal/Parent/context";
import { userauth_title } from "app/sections/Modal/actions";
import { userauth_actions } from "app/sections/Modal/actions";
import Checkout from "../Checkout";
import ReservationSection from "./reserve";
import * as L from 'leaflet'
import UserProfileSheet from "app/sections/Modal/Profile";
import React from 'react';
import { makeListingTitle } from "app/utils/listings/utils";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import isStandalone from "isStandalone";

const AdornedTypography = ({
    StartIcon,
    EndIcon,
    children,
    sx,
    psx,
}) => (
    <Box
        sx={{
            gap:1,
            display:'flex',
            alignItems:'center',
            ...psx,
        }}
    >
        {StartIcon && <StartIcon sx={sx}/>}
        <Typography
            sx={sx}
        >
            {children}
        </Typography>
        {EndIcon && <EndIcon sx={sx}/>}
    </Box>
)

const Listing = ({
    customListingInfo,
    customListingId,
    customHostInfo,
    onClickBack,
    isDraft,
    scrollContainerRef,
}) => {
    const navigate = useNavigate();
    const {openModal} = useModal();
    const {listingId: paramLID} = useParams();
    const {user, userImpl, forceReloadUserImpl} = useUserAuthState();
    const listingId = customListingId || paramLID;
    const [listing, setListing] = useState(null);
    const [host, setHost] = useState(null);
    const isMobile = useMediaQuery('(max-width:991px)')
    const isXL = useMediaQuery('(min-width:1400px)')
    const [map, setMap] = useState(null)
    const [loading, setLoading] = useState(false);
    const [isSaved, setIsSaved] = useState(userImpl?.extra?.saved?.includes(listingId));
    const [calendarView, setCalendarView] = useState(false);
    const [dateOverlapCounts, setDateOverlapCounts] = useState({})

    const [moreOptionsMenu, setMoreOptionsMenu] = useState(false);
    const [menuAlign, setMenuAlign] = useState(null);
    const [isViewingImageList, setIsViewingImageList] = useState(false);
    const [viewingHostProfile, setViewingHostProfile] = useState(false)

    const saveCurrentListing = async (event) => {
        event.stopPropagation(); // Prevents the outer onClick from firing
        if (user && userImpl) {
            const saved = isSaved;
        
            setIsSaved(!saved); // Optimistically update UI
    
            try {
                if (saved) {
                    // If listing is already saved, unsave it
                    await setDoc(doc(getFirestore(), 'users', user.uid), {
                        extra: {
                            saved: arrayRemove(listingId),
                        },
                    }, { merge: true });
        
                } else {
                    // If listing is not saved, save it
                    await setDoc(doc(getFirestore(), 'users', user.uid), {
                        extra: {
                            saved: arrayUnion(listingId),
                        },
                    }, { merge: true });
                }
            } catch (error) {
                alert(`Error ${isSaved ? 'unsaving' : 'saving'} listing:`, error);
                setIsSaved(saved); // Revert UI update if there's an error
            }
        }
    };

    useEffect(() => {
        if (user && userImpl && userImpl.extra?.saved?.includes(listingId)) {
            setIsSaved(true);
        }
    }, [user, userImpl, listingId]);

    useEffect(() => {
        const get_listing_info = async () => {
            if (!customListingInfo && !customHostInfo) {
                setLoading(true);
                const listing_res = await getListing(listingId);
                if (listing_res === null || listing_res.listing === null || listing_res.host === null) {
                    if (onClickBack) {
                        onClickBack();
                    }
                    else {
                        navigate('/')
                    }
                    return;
                }
                setHost(listing_res.host)
                setListing(listing_res.listing)

                if (listing_res?.host?.extra?.blocked?.includes(user?.uid)) {
                    if (onClickBack) {
                        onClickBack();
                    }
                    else {
                        navigate('/')
                    }
                }
                setLoading(false);
            }
            else {
                setHost(customHostInfo)
                setListing(customListingInfo)

                if (customHostInfo?.extra?.blocked?.includes(user?.uid)) {
                    if (onClickBack) {
                        onClickBack();
                    }
                    else {
                        navigate('/')
                    }
                }
            }

            if (user) {
                await forceReloadUserImpl();
                setIsSaved(userImpl?.extra?.saved?.includes(listingId))
            }

            const start_of_today = new Date().setUTCHours(0, 0, 0, 0);
            const reservationsRef = collection(getFirestore(), 'reservations');

            // Fetch reservations for the same listing that are approved and relevant for future dates
            const q = query(
                reservationsRef,
                where('status', '==', 2), // Approved reservations
                where('listing', '==', listingId),
                where('endDate', '>=', start_of_today) // Only consider ongoing or future reservations
            );

            const querySnapshot = await getDocs(q);

            const fetchedReservations = querySnapshot.docs.map((doc) => ({
                startDate: new Date(doc.data().startDate),
                endDate: new Date(doc.data().endDate),
            }));
            
            // Calculate date-wise overlapping counts
            const dateOverlapCounts = {}; // { '2024-11-16': count }
            
            fetchedReservations.forEach(({ startDate, endDate }) => {
                // Normalize the start and end dates to midnight
                const normalizedStartDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
                const normalizedEndDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
            
                let currentDate = new Date(normalizedStartDate);
                while (currentDate <= normalizedEndDate) {
                    const dateKey = currentDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD
                    dateOverlapCounts[dateKey] = (dateOverlapCounts[dateKey] || 0) + 1;
            
                    // Move to the next day, ensuring no time drift
                    currentDate.setDate(currentDate.getDate() + 1);
                }
            });

            setDateOverlapCounts(dateOverlapCounts);
        }
        get_listing_info();
    }, [])

    useEffect(() => {
        const set_map_info = async () => {
            const lat = listing?.location?.latitude;
            const lng = listing?.location?.longitude;
        
            // Initialize map only if it does not exist and lat/lng are defined
            if (!loading && !map && lat && lng) {
                let user_lat = 0;
                let user_lng = 0;
                if (navigator.geolocation) {
                    await new Promise((resolve, reject) => {
                        navigator.geolocation.getCurrentPosition(
                            (position) => {
                                user_lat = position.coords.latitude;
                                user_lng = position.coords.longitude;
                                resolve();
                            },
                            (error) => {
                                console.log('Geolocation error:', error.message);
                                resolve();
                            }
                        );
                    });
                }

                const mapInstance = L.map('listing_map', {
                    center: [lat, lng],
                    zoom: 12,
                    maxZoom: 12,
                });
                setMap(mapInstance);

                L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(mapInstance);
        
                const locationMarker = L.divIcon({
                    className: '',
                    html: `<div class="parent-loc"><div class="child-loc"></div></div>`,
                    iconSize: [50, 50],
                    iconAnchor: [50, 16],
                    popupAnchor: [0, -16],
                });
                
                L.marker([lat, lng]).addTo(mapInstance).bindTooltip('Listing', {permanent:false, direction:'right'})

                if (user_lat && user_lng) {
                    L.marker([user_lat, user_lng], {icon:locationMarker}).addTo(mapInstance)
                }
            }
        }
        set_map_info();
    }, [map, listing, loading]);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const [containerWidth, setContainerWidth] = useState(0);
    const containerRef = useRef(null);
    const startX = useRef(0);
    const currentTranslate = useRef(0);
    const prevTranslate = useRef(0);
    const animationRef = useRef(null);
    const isDragging = useRef(false);

    const [dragOffset, setDragOffset] = useState(0); // for re-rendering

    const getPositionX = (event) => event.touches[0].clientX;

    const handleTouchStart = (event) => {
    if (!isStandalone()) return;

    isDragging.current = true;
    startX.current = getPositionX(event);
    animationRef.current = requestAnimationFrame(animation);
    };

    const handleTouchMove = (event) => {
        if (!isStandalone() || !isDragging.current) return;
      
        const currentX = getPositionX(event);
        const deltaX = currentX - startX.current;
        const maxDrag = 100;
      
        if (currentImageIndex === 0 && deltaX > 0) {
          currentTranslate.current = Math.min(deltaX, maxDrag);
        } else if (
          currentImageIndex === listing?.display?.images.length - 1 &&
          deltaX < 0
        ) {
          currentTranslate.current = Math.max(deltaX, -maxDrag);
        } else {
          currentTranslate.current = prevTranslate.current + deltaX;
        }
      };
      

    const handleTouchEnd = () => {
    if (!isStandalone()) return;

    cancelAnimationFrame(animationRef.current);
    isDragging.current = false;

    const movedBy = currentTranslate.current - prevTranslate.current;

    const threshold = 100; // px
    if (movedBy < -threshold && currentImageIndex < listing?.display?.images.length - 1) {
        setCurrentImageIndex((prev) => prev + 1);
    } else if (movedBy > threshold && currentImageIndex > 0) {
        setCurrentImageIndex((prev) => prev - 1);
    }

    // Snap back to current image
    currentTranslate.current = 0;
    prevTranslate.current = 0;
    setDragOffset(0);
    };

    const animation = () => {
    setDragOffset(currentTranslate.current);
    if (isDragging.current) {
        requestAnimationFrame(animation);
    }
    };

    useEffect(() => {
        const updateWidth = () => {
          if (containerRef.current) {
            setContainerWidth(containerRef.current.offsetWidth);
          }
        };
      
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
      }, []);
      

    return (
        <>
            <ListingHelmetSchema />

            <Container
                sx={{
                    pb:12,
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'center',
                }}
            >
                <Box
                    sx={{
                        width:'100%',
                    }}
                >
                    <Box
                        sx={{
                            display:'flex',
                            flexDirection:{
                                xs: isStandalone() ? 'column-reverse' : 'column',
                                lg:'column'
                            },
                            width:'100%',
                        }}
                    >
                        <Box
                            sx={{
                                pt:4,
                                pb:isStandalone() ? 0 : 4,
                                display:'flex',
                                alignItems:'center',
                            }}
                        >
                            <Box
                            >
                                <Typography
                                    sx={{
                                        fontSize:{xs:'1.4rem',lg:'2rem'},
                                        color:'#333',
                                        fontWeight:650,
                                    }}
                                >
                                    {loading ? (
                                        <Skeleton
                                            width={200}
                                            height={'100%'}
                                            animation='wave'
                                        />
                                    ) : (
                                        <>
                                            {listing?.logistics?.height?makeListingTitleExtended(listing) : makeListingTitle(listing)}
                                        </>
                                    )}
                                </Typography>

                                <AdornedTypography
                                    StartIcon={LocationOnOutlined}
                                    sx={{
                                        color:'#737373',
                                        fontSize:{xs:'.75rem',lg:'1rem'},
                                        fontWeight:450,
                                    }}
                                >
                                    {loading ? (
                                        <Skeleton
                                            width={225}
                                            height={'100%'}
                                            animation='wave'
                                        />
                                    ) : (
                                        <>
                                            {makeListingAddress(listing)}
                                        </>
                                    )}
                                </AdornedTypography>
                            </Box>

                            <Box
                                sx={{
                                    gap:{xs:1,lg:2},
                                    ml:'auto',
                                    display:'flex',
                                    alignItems:'center',
                                }}
                            >
                                <motion.div
                                    whileTap={{ scale: 0.9 }} 
                                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                                    onClick={(e) => {
                                        if (user) {
                                            saveCurrentListing(e);
                                        }
                                        else {
                                            openModal(userauth_title, userauth_actions)
                                        }
                                    }}
                                >
                                    {isMobile ? (
                                        <IconButton
                                            color={isSaved?'error':'default'}
                                            size='medium'
                                            sx={{
                                                border:`2px solid ${isSaved ? colors.error.main : '#ededed'}`,
                                            }}
                                        >
                                            {isSaved ? <Favorite color="error" /> : <FavoriteBorder />}
                                        </IconButton>
                                    ) : (
                                        <Button
                                            startIcon={isSaved ? <Favorite color="error" /> : <FavoriteBorder />}
                                            sx={{
                                                border:`2px solid ${isSaved ? colors.error.main : '#ededed'}`,
                                                borderRadius:8,
                                                fontSize:'1rem',
                                                width:120,
                                                py:1.7,
                                                fontWeight:500,
                                                color:`${isSaved?colors.error.main : '#737373'} !important`
                                            }}
                                        >
                                            {isSaved ? "Saved" : "Save"}
                                        </Button>
                                    )}
                                </motion.div>

                                <IconButton
                                    size={isMobile ? 'medium' : 'large'}
                                    sx={{
                                        border:'2px solid #ededed',
                                    }}
                                    onClick={(e) => {
                                        setMenuAlign(e.currentTarget);
                                        setMoreOptionsMenu(true);
                                    }}
                                >
                                    <MoreHoriz />
                                </IconButton>
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                width:{
                                    xs: isStandalone() ? '100vw' : '100%',
                                    lg: '100%'
                                },
                                mx:{
                                    xs: isStandalone() ? 'calc((100% - 100vw) / 2)' : 0,
                                    lg: 0
                                },
                                height: { xs: 400, lg: 400, xl: 500 },
                                display: { xs: 'grid', lg: 'flex' },
                                flexDirection: { lg: 'row' },
                                borderRadius: 3 * (!isStandalone() + 0),
                                overflow: 'hidden',
                                position: 'relative',
                            }}
                            >
                            {/* Left - Large Square Image */}
                            <Box
                                sx={{
                                width: { lg: '50%' },
                                height: '100%',
                                display: { xs: 'none', lg: 'block' },
                                mr: 1,
                                overflow: 'hidden',
                                cursor: 'pointer',
                                position: 'relative', // Added to create proper stacking context
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: 'rgba(0, 0, 0, 0.12)',
                                    opacity: 0,
                                    transition: 'opacity 0.3s ease-in-out',
                                    pointerEvents: 'none', // So clicks pass through
                                },
                                '&:hover::after': {
                                    opacity: 1,
                                },
                                }}
                                onClick={() => setIsViewingImageList(true)}
                            >
                                {loading ? (
                                <Skeleton 
                                    variant="rectangular"
                                    width='100%' 
                                    height='100%' 
                                    animation='wave'
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                    }}
                                />
                                ) : (
                                <Box
                                    component="img"
                                    src={listing?.display?.images[0]}
                                    alt="Image 1"
                                    sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    display: 'block'
                                    }}
                                />
                                )}
                            </Box>

                            {/* Right - 4 Small Square Images */}
                            <Box
                                sx={{
                                width: { lg: '50%' },
                                height: '100%',
                                display: { xs: 'none', lg: 'flex' },
                                flexWrap: 'wrap',
                                gap: 1,
                                }}
                            >
                                {[1, 2, 3, 4].map((idx) => (
                                <Box
                                    key={idx}
                                    sx={{
                                    width: 'calc(50% - 4px)',
                                    height: 'calc(50% - 4px)',
                                    cursor: 'pointer',
                                    flexShrink: 0,
                                    position: 'relative', // Added to create proper stacking context
                                    overflow: 'hidden',
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: 'rgba(0, 0, 0, 0.12)',
                                        opacity: 0,
                                        transition: 'opacity 0.3s ease-in-out',
                                        pointerEvents: 'none', // So clicks pass through
                                    },
                                    '&:hover::after': {
                                        opacity: 1,
                                    },
                                    }}
                                    onClick={() => setIsViewingImageList(true)}
                                >
                                    {loading ? (
                                    <Skeleton 
                                        variant="rectangular"
                                        width='100%' 
                                        height='100%' 
                                        animation='wave'
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                        }}
                                    />
                                    ) : (
                                    <Box
                                        component="img"
                                        src={listing?.display?.images[idx]}
                                        alt={`Image ${idx + 1}`}
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            display: 'block',
                                        }}
                                    />
                                    )}
                                </Box>
                                ))}
                            </Box>

                            <Box
                                sx={{
                                    display: { xs: 'flex', lg: 'none' },
                                    width: '100%',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                                >
                                {/* Image wrapper with fixed height */}
                                <Box
                                    onClick={() => setIsViewingImageList(true)}
                                    onTouchStart={handleTouchStart}
                                    onTouchMove={handleTouchMove}
                                    onTouchEnd={handleTouchEnd}
                                    ref={containerRef}
                                    sx={{
                                        width: '100%',
                                        height: '400px', // Set a fixed height or use aspectRatio: '16/9'
                                        cursor: isStandalone() ? 'grab' : 'pointer',
                                        position: 'relative',
                                    }}
                                >
                                    {loading ? (
                                    <Skeleton
                                        variant="rectangular"
                                        width="100%"
                                        height="100%"
                                        animation="wave"
                                    />
                                    ) : (
                                        <Box
                                        sx={{
                                            display: 'flex',
                                            transition: isDragging.current ? 'none' : 'transform 0.3s ease',
                                            transform: `translateX(${dragOffset - currentImageIndex * containerWidth}px)`,
                                            width: `${listing?.display?.images.length * containerWidth}px`,
                                        }}
                                        >
                                        {listing?.display?.images.map((src, index) => (
                                            <Box
                                            key={index}
                                            component="img"
                                            src={src}
                                            alt={`Image ${index + 1}`}
                                            sx={{
                                                flexShrink: 0,
                                                width: `${containerWidth}px`,
                                                height: '400px',
                                                objectFit: 'cover',
                                            }}
                                            />
                                        ))}
                                        </Box>

                                    )}

                                    {/* Left Arrow */}
                                    <IconButton
                                    disabled={currentImageIndex === 0}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (currentImageIndex > 0) setCurrentImageIndex(currentImageIndex - 1);
                                    }}
                                    sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: 12,
                                        transform: 'translateY(-50%)',
                                        bgcolor: 'rgba(255, 255, 255, 0.8)',
                                        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                                        '&:hover': { bgcolor: 'rgb(255, 255, 255)' },
                                        '&.Mui-disabled': { bgcolor: 'rgba(255, 255, 255, 0.65)', pointerEvents: 'auto', },
                                        height: '34px',
                                        width: '34px',
                                        zIndex: 2,
                                        display: isStandalone() ? 'none' : 'flex'
                                    }}
                                    >
                                    <ArrowBackIosNewRounded sx={{ fontSize: 12 }} />
                                    </IconButton>

                                    {/* Right Arrow */}
                                    <IconButton
                                    disabled={currentImageIndex === listing?.display?.images.length - 1}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (currentImageIndex < listing?.display?.images.length - 1) {
                                        setCurrentImageIndex(currentImageIndex + 1);
                                        }
                                    }}
                                    sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        right: 12,
                                        transform: 'translateY(-50%)',
                                        bgcolor: 'rgba(255, 255, 255, 0.8)',
                                        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                                        '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' },
                                        '&.Mui-disabled': { bgcolor: 'rgba(255, 255, 255, 0.5)', pointerEvents: 'auto', },
                                        height: '34px',
                                        width: '34px',
                                        zIndex: 2,
                                        display: isStandalone() ? 'none' : 'flex'
                                    }}
                                    >
                                    <ArrowForwardIosRounded sx={{ fontSize: 12 }} />
                                    </IconButton>

                                    {/* Image Counter */}
                                    <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: 12,
                                        right: 12,
                                        bgcolor: 'rgba(0, 0, 0, 0.6)',
                                        color: '#fff',
                                        px: 1.5,
                                        py: 0.4,
                                        borderRadius: 1.5,
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                        zIndex: 2,
                                    }}
                                    >
                                    {`${currentImageIndex + 1} / ${listing?.display?.images.length}`}
                                    </Box>
                                </Box>
                            </Box>


                            {/* Show All Photos Button */}
                            <Box
                                sx={{
                                    zIndex: 1,
                                    position: 'absolute',
                                    bottom: 12,
                                    right: 12,
                                    boxShadow: '0px 6px 12px rgba(0,0,0,.5) !important',
                                    bgcolor: '#fff !important',
                                    borderRadius: 8,
                                    overflow: 'hidden',
                                    display:{xs:'none', lg:'flex'}
                                }}
                                onClick={() => setIsViewingImageList(true)}
                            >
                                <Button
                                    startIcon={<PhotoLibraryOutlined />}
                                    sx={{
                                    color: '#737373 !important',
                                    fontSize: '0.8rem',
                                    fontWeight: 500,
                                    }}
                                >
                                    Show all photos
                                </Button>
                            </Box>
                        </Box>
                    </Box>

                    <Typography
                        sx={{
                            mt:3,
                            color:'#333',
                            fontWeight:550,
                            fontSize:'1.25rem',
                        }}
                    >
                        Space description
                    </Typography>
                    <Typography
                        sx={{
                            mb:4,
                            color:'#737373',
                            fontSize:{xs:'.75rem',lg:'.875rem'},
                        }}
                    >
                        {loading? (
                            <>
                                {Array.from({length:3}).map(_ => (
                                    <Skeleton
                                        width='100%'
                                        height={25}
                                        animation='wave'
                                    />
                                ))}
                            </>
                        ) : (
                            <>
                                {listing?.display?.spaceDescription}
                            </>
                        )}
                    </Typography>

                    <Box
                        sx={{
                            width:'100%',
                            display:'flex',
                            gap:4,
                        }}
                    >
                        <Box
                            sx={{
                                width:'100%',
                            }}
                        >
                            <ListingHostInfoDisplay
                                host={host}
                                loading={loading}
                                listing={listing}
                                setViewingHostProfile={setViewingHostProfile}
                            />
                            <ListingAccessingInfo
                                loading={loading}
                                listing={listing}
                            />

                            <ListingSpecificationsDisplay 
                                loading={loading}
                                listing={listing}
                            />
                        </Box>

                        <Box
                            sx={{
                                minWidth:{lg:350,xl:400},
                                display:{xs:'none',lg:'block'},
                            }}
                        >
                            <Typography
                                sx={{
                                    mb:1,
                                    color:'#333',
                                    fontWeight:550,
                                    fontSize:{xs:'1rem',lg:'1.25rem'},
                                }}
                            >
                                Schedule a reservation
                            </Typography>
                            <ReservationSection
                                loading={loading}
                                listing={listing}
                                listingId={listingId}
                                dateOverlapCounts={dateOverlapCounts}
                                onClose={() => setCalendarView(false)}
                            />
                        </Box>
                    </Box>

                    <Typography
                        sx={{
                            mb:.5,
                            color:'#333',
                            fontWeight:550,
                            fontSize:{xs:'1rem',lg:'1.25rem'},
                        }}
                    >
                        Location
                    </Typography>
                    <Typography
                        sx={{
                            mb:1,
                            color:'#737373',
                            fontSize:{xs:'.75rem',lg:'.875rem'},
                        }}
                    >
                        This is the general location of the listing relative to your current location. You will get the listing's exact address if your reservation is approved by the host.
                    </Typography>
                    <Box
                        id="listing_map"
                        sx={{
                            mb:6,
                            width:'100%',
                            height:{xs:400,lg:500},
                            zIndex:1,
                            borderRadius:3,
                            display:'flex',
                            alignItems:'center',
                            justifyContent:'center',
                            overflow:'hidden',
                            boxShadow:'rgba(0, 0, 0, 0.12) 0px 6px 16px'
                        }}
                    >
                        <Typography
                            sx={{
                                p:2,
                                mx:2,
                                border:'1px solid #000',
                                borderRadius:2,
                                display:!listing?.location?.latitude && !listing?.location?.longitude ? 'flex' : 'none',
                            }}
                        >
                            This listing does not have a location associated with it. You can try contacting the host for further details.
                        </Typography>
                    </Box>
                </Box>
            </Container>

            <Box
                sx={{
                    gap:1.5,
                    zIndex:2,
                    width:'100%',
                    position:'fixed',
                    bottom:0,
                    left:0,
                    px:2.5,
                    pt:2,
                    pb:2,
                    borderTop:'1px solid #ededed',
                    bgcolor:'#fff',
                    boxShadow:'0px 6px 12px rgba(0,0,0,.5)',
                    alignItems:'center',
                    display:{xs:'flex',lg:'none'},
                }}
            >
                <Box>
                    <Box
                        sx={{
                            gap:1,
                            display:'flex',
                            alignItems:'center'
                        }}
                    >
                        <Typography
                            sx={{
                                color:'#000',
                                fontSize:'1.25rem',
                                fontWeight:750,
                                textDecoration:'underline',
                            }}
                        >
                            ${listing?.logistics?.price}
                        </Typography>
                        <Typography
                            sx={{
                                color:'#737373',
                                fontSize:'1.2rem',
                                fontWeight:450,
                            }}
                        >
                            / month
                        </Typography>
                    </Box>
                    
                    <Typography
                        sx={{
                            fontSize:'.75rem',
                            fontWeight:500,
                            color:'#737373',
                        }}
                    >
                        Choose dates for estimates
                    </Typography>
                </Box>
                <MKButton
                    onClick={() => setCalendarView(true)}
                    disabled={listing?.host === user?.uid}
                    color='info'
                    sx={{
                        px:4,
                        ml:'auto',
                        height:50,
                        minWidth:'unset',
                        minHeight:'unset',
                        fontWeight:500,
                        fontSize:'.875rem',
                        whiteSpace:'nowrap',
                    }}
                >
                    {listing?.host === user?.uid ? 'Your Listing' : 'Choose Dates'}
                </MKButton>
            </Box>

            <Modal
                open={calendarView}
                onClose={() => setCalendarView(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    zIndex:100000,
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                }}
            >
                <Box sx={{
                    width: 400,
                    maxWidth:'95vw',
                    bgcolor: '#fff',
                    borderRadius:4,
                }}>
                    <ReservationSection
                        loading={loading}
                        listing={listing}
                        listingId={listingId}
                        dateOverlapCounts={dateOverlapCounts}
                        onClose={() => setCalendarView(false)}
                    />
                </Box>
            </Modal>

            <AdaptiveModal
                sideSwipeMobile={{
                    customExtension: 'images'
                }}
                open={isViewingImageList && !isMobile}
                onClose={() => setIsViewingImageList(false)}
                title='Listing images'
                maxWidth={listing?.images?.length>3?1200:null}
            >
                <ImageList variant="masonry" cols={listing?.images?.length>3?3:1} gap={8}>
                    {listing?.display?.images?.map((img) => (
                        <ImageListItem key={img}>
                            <img
                                srcSet={`${img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                src={`${img}?w=248&fit=crop&auto=format`}
                                alt='Listing image'
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>   
            </AdaptiveModal>

            <UserProfileSheet
                sideSwipeMobile
                open={viewingHostProfile}
                onClose={() => setViewingHostProfile(false)}
                userId={listing?.host}
                customTitle='Host’s Profile'
            />

            <MoreOptionsMenu
                open={moreOptionsMenu}
                onClose={() => setMoreOptionsMenu(false)}
                menuAlign={menuAlign}
            >
                {!isDraft && // isDraft is only true when listingcard has the menu option deletedraft || publish
                    <ShareMenuItem
                        contentType='listing'
                        shareLink={`https://sparelot.com/listing/${listingId}`}
                    />
                }
                {!isDraft && // isDraft is only true when listingcard has the menu option deletedraft || publish
                    <ReportMenuItem
                        contentType='listing'
                        disabled={!user?.uid || user?.uid === listing?.host}
                        contentId={listingId}
                    />
                }
                {user?.uid === listing?.host &&
                    <>
                        {
                            isDraft ? // isDraft is only true when listingcard has the menu option deletedraft || publish

                            <PublishMenuItem
                                draftId={listingId}
                                disabled={!user?.uid || user?.uid !== listing?.host}
                            />

                            :

                            <UnpublishMenuItem
                                listingId={listingId}
                                disabled={!user?.uid || user?.uid !== listing?.host}
                            />
                        }
                    </>
                }
                {user?.uid === listing?.host &&
                    <DeleteMenuItem
                        draftId={customListingInfo ? listingId : undefined}
                        listingId={customListingInfo ? undefined : listingId}
                        disabled={!user?.uid || user?.uid !== listing?.host}
                    />
                }
            </MoreOptionsMenu>
        </>
    )
}

export default Listing;

const Styles = {
    CollageImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
    },
    CollageImageParent: {
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        '&:hover':{
            filter:'brightness(75%)',
            transition:'all .2s ease-in-out',
        },
        transition:'all .2s ease-in-out',
        cursor:'pointer',
    },
    ImageCollageParent: {

        '&:active':{
            scale:.95,
        }
    }
}