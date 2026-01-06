import MKBox from "components/MKBox";
import Price_Filter from "./Filters/price";
import { FiltersProvider, NonVehicle_Types, useFilters, Vehicle_Types } from "./Filters/context";
import Size_Filter from "./Filters/size";
import { home_actions } from "app/sections/Navbar/actions";
import { home_mobile_routes, home_web_routes } from "app/sections/Navbar/routes";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "app/sections/Navbar";
import * as c from 'const';
import colors from "assets/theme/base/colors";
import { Box, Container, Icon, IconButton, InputAdornment, Skeleton, TextField, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchResultsState } from "./context";
import ListingCard from "app/sections/Options/Card/Listing";
import { useUserAuthState } from "app/backend/user/auth/reactprovider";
import ListingsCarousel from "app/sections/Options/Carousel/Listings";
import { listingMatchesFilters, makeListingTitle } from "app/utils/listings/utils";
import NoListingsAvailable from "./dynamic";
import axios from "axios";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "app/backend/fb_cfg";
import { createRoot } from "react-dom/client";
import { UserAuthStateProvider } from "app/backend/user/auth/reactprovider";
import ListingPopup from "app/sections/Modal/Listing";
import { createPopupContent } from "./popup";
import Hr from "app/utils/Hr";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import { Map, MapOutlined, Reorder, Search } from "@mui/icons-material";
import './style.css';
import * as L from 'leaflet';
import Draggable from "react-draggable";
import Type_Filter from "./Filters/type";
import isStandalone from "isStandalone";
import {motion, div} from 'framer-motion'
import ExploreHeader from "./header";
import { Sheet } from "react-modal-sheet";
import { getConformingListings } from "app/utils/listings/utils";
import { sortListings, useSorting } from "./Sorting/context";
import { FOOTER_HEIGHT } from "app/utils/optimize/utils";
import { US_CENTER_LAT } from "const";
import { US_CENTER_LNG } from "const";
import WarnedAction from "app/sections/Options/Action";
import { LOCALSTORAGE_REQUESTEDLOCATION_KEY } from "const";
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import 'leaflet.markercluster'

const standaloneHeightConstant = 145 + FOOTER_HEIGHT;

const fitListingCardPopup = 'custom-popup';
const CustomSheet = ({ children, isOpen, onClose, headerContent, maxHeight }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState('expanded'); // 'minimized' or 'expanded'
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);
  const [isAtTop, setIsAtTop] = useState(false);
  const sheetRef = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const headerHeight = position==='expanded' ? 1 : 75; // Header height in pixels
  const expandedHeight = maxHeight; // As percentage of viewport height
  
  // Calculate actual pixel heights for transitions
  const getExpandedHeightPx = () => {
    return (window.innerHeight * expandedHeight) / 100;
  };
  
  const handleTouchStart = (e) => {
    // Only initiate dragging if touch started on the header
    if (headerRef.current && headerRef.current.contains(e.target)) {
      setIsDragging(true);
      setStartY(e.touches[0].clientY);
      setCurrentY(e.touches[0].clientY);
      
      // Prevent default to avoid text selection during drag
      e.preventDefault();
    }
  };
  
  // Add handler for content touch start
  const handleContentTouchStart = (e) => {
    if (contentRef.current && contentRef.current.scrollTop <= 0) {
      setIsAtTop(true);
      setStartY(e.touches[0].clientY);
      setCurrentY(e.touches[0].clientY);
    } else {
      setIsAtTop(false);
    }
  };
  
  // Add handler for content touch move
  const handleContentTouchMove = (e) => {
    if (isAtTop && position === 'expanded') {
      const newY = e.touches[0].clientY;
      const delta = newY - startY;
      
      // If swiping down when at the top of content
      if (delta > 10) {
        setIsDragging(true);
        setCurrentY(newY);
        setDragDistance(delta);
        
        // Calculate how far down we're dragging as a percentage of the distance to minimized
        const distanceToMinimized = getExpandedHeightPx() - headerHeight;
        const dragPercentage = Math.min(delta / distanceToMinimized, 1);
        const newHeight = getExpandedHeightPx() - (distanceToMinimized * dragPercentage);
        
        if (sheetRef.current) {
          sheetRef.current.style.height = `${newHeight}px`;
          sheetRef.current.style.transition = 'none'; // Remove transition during drag
        }
      }
    }
  };
  
  // Add handler for content touch end
  const handleContentTouchEnd = (e) => {
    if (isAtTop && isDragging) {
      const delta = currentY - startY;
      
      // If user dragged down enough when at the top
      if (delta > 20) {
        setPosition('minimized');
        if (sheetRef.current) {
          sheetRef.current.style.transition = 'height 0.5s ease';
          sheetRef.current.style.height = `${headerHeight}px`;
        }
      } else {
        // Not enough to change state, animate back
        if (sheetRef.current) {
          sheetRef.current.style.transition = 'height 0.5s ease';
          sheetRef.current.style.height = `${expandedHeight}dvh`;
        }
      }
      
      setIsDragging(false);
      setDragDistance(0);
    }
  };
  
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    const newY = e.touches[0].clientY;
    setCurrentY(newY);
    
    const delta = newY - startY;
    setDragDistance(delta);
    
    // If expanded and dragging down
    if (position === 'expanded' && delta > 0) {
      // Calculate how far down we're dragging as a percentage of the distance to minimized
      const distanceToMinimized = getExpandedHeightPx() - headerHeight;
      const dragPercentage = Math.min(delta / distanceToMinimized, 1);
      const newHeight = getExpandedHeightPx() - (distanceToMinimized * dragPercentage);
      
      if (sheetRef.current) {
        sheetRef.current.style.height = `${newHeight}px`;
        sheetRef.current.style.transition = 'none'; // Remove transition during drag
      }
      
      // Prevent default to avoid page scrolling during sheet drag
      e.preventDefault();
    }
    
    // If minimized and dragging up
    if (position === 'minimized' && delta < 0) {
      // Calculate how far up we're dragging as a percentage of the distance to expanded
      const distanceToExpanded = getExpandedHeightPx() - headerHeight;
      const dragPercentage = Math.min(Math.abs(delta) / distanceToExpanded, 1);
      const newHeight = headerHeight + (distanceToExpanded * dragPercentage);
      
      if (sheetRef.current) {
        sheetRef.current.style.height = `${newHeight}px`;
        sheetRef.current.style.transition = 'none'; // Remove transition during drag
      }
    }
  };
  
  const handleTouchEnd = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const delta = currentY - startY;
    
    // If sheet is expanded and user dragged down
    if (position === 'expanded' && delta > 20) {
      setPosition('minimized');
      if (sheetRef.current) {
        sheetRef.current.style.transition = 'height 0.5s ease';
        sheetRef.current.style.height = `${headerHeight}px`;
      }
    } 
    // If sheet is minimized and user dragged up
    else if (position === 'minimized' && delta < -20) {
      setPosition('expanded');
      if (sheetRef.current) {
        sheetRef.current.style.transition = 'height 0.5s ease';
        sheetRef.current.style.height = `${expandedHeight}dvh`;
      }
    }
    // If the drag wasn't enough to change state, animate back to current state
    else {
      if (sheetRef.current) {
        sheetRef.current.style.transition = 'height 0.5s ease';
        sheetRef.current.style.height = position === 'expanded' ? `${expandedHeight}dvh` : `${headerHeight}px`;
      }
    }
    
    // Reset drag distance
    setDragDistance(0);
  };
  
  // Apply styles based on position when component mounts or position changes
  useEffect(() => {
    if (!sheetRef.current) return;
    
    const sheet = sheetRef.current;
    // Only apply these styles if we're not currently dragging
    if (!isDragging) {
      if (position === 'expanded') {
        sheet.style.height = `${expandedHeight}dvh`;
        sheet.style.transition = 'height 0.5s ease';
      } else {
        sheet.style.height = `${headerHeight}px`;
        sheet.style.transition = 'height 0.5s ease';
      }
    }
  }, [position, expandedHeight, isDragging]);
  
  return (
    <Box
      ref={sheetRef}
      sx={{
        position: isStandalone() ? 'fixed' : 'absolute',
        bottom: isStandalone() ? `${FOOTER_HEIGHT}px` : 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: position==='minimized' && '16px',
        borderTopRightRadius: position==='minimized' && '16px',
        boxShadow:position==='minimized' && '0px -4px 6px rgba(0,0,0,.2)',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        overflowY: position==='minimized'?'hidden':'auto',
        height: `${headerHeight}px`, // Start minimized
        transition:'all .5s ease-in-out'
      }}
    >
      {/* Header - Always visible and draggable */}
      <Box
        ref={headerRef}
        sx={{
          px: 2,
          display:'flex',
          py: position==='expanded'?0:1,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          borderTop: position==='expanded' && '1px solid #ededed',
          height: `${headerHeight}px`,
          minHeight: `${headerHeight}px`,
          cursor: 'grab',
          touchAction: 'none', // Disable browser handling of touch events for the header
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {position==='minimized' && 
          <>
            <Box
              sx={{
                width: '40px',
                height: '2px',
                backgroundColor: '#333',
                borderRadius: '16px',
                position: 'absolute',
                top: 12,
              }}
            />
            {headerContent}
          </>
        }
      </Box>
      
      {/* Content - scrollable without triggering sheet drag */}
      <Box
        ref={contentRef}
        sx={{
          flex: 1,
          pb: 6.5,
          WebkitOverflowScrolling: 'touch',
          visibility: position === 'minimized' && !isDragging ? 'hidden' : 'visible',
          opacity: position === 'minimized' ? 
            (isDragging ? Math.min(Math.abs(dragDistance) / 50, 1) : 0) : 1,
          transition: 'opacity 0.2s ease',
          position: 'relative',
          overflowY: 'auto', // Make sure content is scrollable
        }}
        onTouchStart={handleContentTouchStart}
        onTouchMove={handleContentTouchMove}
        onTouchEnd={handleContentTouchEnd}
      >
        {children}
      </Box>

      {position === 'expanded' &&
        <MKButton
          color='info'
          sx={{
            position:'fixed',
            bottom:((isStandalone()+0)*FOOTER_HEIGHT) + 20,
            width:100,
            fontSize:'1rem',
            fontWeight:450,
            borderRadius:8,
            
            left:'calc(50% - 50px)',
          }}
          onClick={() => setPosition('minimized')}
          endIcon={
            <Icon
              fontSize='medium'
            >
              <Map />
            </Icon>
          }
        >
          Map
        </MKButton>
      }
    </Box>
  );
};

const ListingContainer = ({children, loading, listings, viewingMap, sx, selectedSpaceType, ref}) => {
  const {filters} = useFilters();
  const isMobile = useMediaQuery('(max-width:991px)');
  const [conformingListings, setConformingListings] = useState(getConformingListings(listings, filters, isMobile && selectedSpaceType !== 'All' && selectedSpaceType));

  // Calculate the dynamic height for the expanded sheet
  const dynamicHeight = useMemo(() => {
    if (typeof window === 'undefined') return 70;
  
    const offset = isStandalone() ? standaloneHeightConstant : 226;
    return ((window.innerHeight - offset) / window.innerHeight) * 100;
  }, []);
  

  const NLA = () => (
    <Box
      sx={{
        mt: 2,
        display: !conformingListings || (!loading && !listings?.length) ? 'block' : 'none',
      }}
    >
      <NoListingsAvailable/>
    </Box>
  );

  useEffect(() => {
    setConformingListings(getConformingListings(listings, filters, isMobile && selectedSpaceType !== 'All' && selectedSpaceType))
  }, [listings?.length, filters, selectedSpaceType]);

  // Header content component
  const headerContent = (
    <Typography
      sx={{
        mt:'auto',
        mb:1,
        color: '#000',
        fontWeight: 550,
        fontSize: '.875rem',
      }}
    >
      {loading ? (
        <Skeleton
          animation='wave'
          width={100}
          height={20}
        />
      ) : (
        <>
          {conformingListings || 'No'} Listing{(conformingListings) !== 1 && 's'}
        </>
      )}
    </Typography>
  );

  if (isMobile) {
    return (
      <CustomSheet
        isOpen={true}
        headerContent={headerContent}
        maxHeight={dynamicHeight}
      >
        <Box
          sx={{
            ...sx,
            flex: 1,
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
            pt: 2,
            px: 2,
          }}
        >
          {!conformingListings ? <NLA /> : children}
        </Box>
      </CustomSheet>
    );
  }
  
  if (viewingMap) {
    return (
      <Box
        sx={{
          ...sx,
          alignItems: !conformingListings ? 'center' : 'unset',
          display: {xs: 'flex', sm: !conformingListings ? 'flex' : 'grid'},
          gridAutoRows: 'min-content', // Add this to control row height
          gridAutoFlow: 'row dense', // Add this to ensure dense packing
          alignContent: 'start', // Add this to align grid items to start
        }}
      >
        {!conformingListings ? <NLA /> : children}
      </Box>
    );
  }
  
  return (
    <Container
      sx={{
        ...sx,
        alignItems: !conformingListings ? 'center' : 'unset',
        display: {xs: 'flex', sm: !conformingListings ? 'flex' : 'grid'},
        gridAutoRows: 'min-content', // Add this to control row height 
        gridAutoFlow: 'row dense', // Add this to ensure dense packing
        alignContent: 'start', // Add this to align grid items to start
      }}
    >
      {!conformingListings ? <NLA /> : children}
    </Container>
  );
};

const Explore = ({turnOffFilters}) => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get('search')
    const lat_given = searchParams.get('lat');
    const lng_given = searchParams.get('lng');

    const isMobile = useMediaQuery('(max-width:991px)');
    const {user, userImpl} = useUserAuthState();

    const [selectedSpaceType, setSelectedSpaceType] = useState('All')
    const [isViewingMap, setIsViewingMap] = useState(true);
    const listingsDisplay = useRef(null);
    const [shouldAskForLocationApproval, setShouldAskForLocationApproval] = useState(false);
    const [readyToFetchLocation, setReadyToFetchLocation] = useState(!isStandalone());

    const [map, setMap] = useState(null);
    const markersLayerRef = useRef(null);

    const [isLoading, setIsLoading] = useState(true);
    const {listings, setListings, lat, setLat, lng, setLng, initListingsFromAddress, initListingsFromCoordinates, initListingsFromCurrentLocation, previousSearch} = useSearchResultsState();

    const {filters} = useFilters();
    const {sorting} = useSorting();

    useEffect(() => {
      const init_listings = async () => {
        setIsLoading(true);
        let success = false;

        if (search !== null) {
            success = await initListingsFromAddress(search);
        } else if (lat_given !== null && lng_given !== null) {
            success = await initListingsFromCoordinates(lat_given, lng_given);
        } else {
            if (readyToFetchLocation) {
              success = await initListingsFromCurrentLocation();
            }
            else {
              if (localStorage.getItem(LOCALSTORAGE_REQUESTEDLOCATION_KEY) === 'true') {
                setShouldAskForLocationApproval(false);
                setReadyToFetchLocation(true);
              }
              else {
                setShouldAskForLocationApproval(true)
              }
            }
        }

        if (!success || !listings?.length || lat === '0' || lng === '0') {
            console.warn("Using US center as final fallback...");
            await initListingsFromCoordinates(US_CENTER_LAT, US_CENTER_LNG);
            setLat(US_CENTER_LAT);
            setLng(US_CENTER_LNG);
        }

        setIsLoading(false);
      };

      init_listings();
    }, [readyToFetchLocation]);

    useEffect(() => {

      if (map !== null && listings.length) {
        // Clear previous markers if they exist
        if (markersLayerRef.current) {
          markersLayerRef.current.clearLayers();
        } else {
          // Create a new marker cluster group instead of regular layer group
          markersLayerRef.current = L.markerClusterGroup({
            maxClusterRadius: 50,
            disableClusteringAtZoom: 12,
            spiderfyOnMaxZoom: true,
            showCoverageOnHover: false,
            zoomToBoundsOnClick: true,
            iconCreateFunction: function(cluster) {
              const count = cluster.getChildCount();
              return L.divIcon({
                html: `<div class="cluster-marker">${count}</div>`,
                className: 'custom-cluster-icon',
                iconSize: [50, 25]
              });
            }
          }).addTo(map);
        }

        // Add new markers to the layer
        listings.forEach((listing) => {
          if (listingMatchesFilters(listing.listing, filters, isMobile && selectedSpaceType !== 'All' && selectedSpaceType,)) {
            const customMarker = L.divIcon({
              className: '', // No class needed if styling directly via `html`
              html: `<div class="pill-marker">$${listing.listing.logistics.price}</div>`,
              iconSize: [100, 32], // Adjust width for the pill; height is 32 for a pill shape
              iconAnchor: [50, 16], // Center the icon
              popupAnchor: [0, -16], // Position the popup relative to the marker
            });
  
            const marker = L.marker([listing.listing.location.latitude, listing.listing.location.longitude], { icon: customMarker })
              .addTo(markersLayerRef.current);

            marker.on('click', () => {
              const popupContent = createPopupContent({
                listing: listing.listing,
                listing_uuid: listing.id,
                host: listing.host,
                userimpl: userImpl,
              });
              
              marker.bindPopup(popupContent, {className: fitListingCardPopup}).openPopup();

              marker
                .unbindPopup() // Ensure old popup content is removed
                .bindPopup(popupContent, { className: fitListingCardPopup })
                .openPopup();
            });
          }
        });
      }
    }, [filters, selectedSpaceType, listings, map, isViewingMap]);

    useEffect(() => {
      const US_Bounds = [
        [24.396308, -125.0],    // Southwest corner (roughly Hawaii off-screen)
        [49.384358, -66.93457]  // Northeast corner (Maine area)
      ];
      const basicMapProperties = {
        minZoom:4,
        maxZoom:14,
        preferCanvas:true,
        maxBoundsViscosity:1.0,
        worldCopyJump:false,
        maxBounds: US_Bounds,
      }

      if (lat !== null && lng !== null && !map) {
        setMap(null);

        let map = null;
        if (lat !== '0' && lng !== '0') {
          map = L.map('map', {
            center:[lat, lng],
            zoom:6,
            ...basicMapProperties,
          });
        }
        else {
          map = L.map('map', {
            center:[39.8283, -98.5795], // center of America
            zoom:4,
            ...basicMapProperties,
          });
        }

        // Add a tile layer to the map using OpenStreetMap tiles
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        const locationMarker = L.divIcon({
          className: '', // No class needed if styling directly via `html`
          html: `<div class="parent-loc"><div class="child-loc"></div></div>`,
          iconSize: [32, 32], // Adjust width for the pill; height is 32 for a pill shape
          iconAnchor: [50, 16], // Center the icon
          popupAnchor: [0, -16], // Position the popup relative to the marker
        });

        L.marker([lat, lng], {icon: locationMarker})
          .addTo(map)

        setMap(map);


      }
    }, [lat, lng])

    useEffect(() => {
      if (map) {
        setTimeout(() => {
          map.invalidateSize(); // Invalidate the map size to adjust after being hidden
        }, 300); // Adding a slight delay to ensure the display transition completes
      }
    }, [isViewingMap, map]);

    document.title = `Explore listings ${search ? 'near ' + search : ''}`

    return (<>
      <div style={{maxHeight:'inherit' }}>
          { turnOffFilters == null &&
            <ExploreHeader 
              loading={isLoading} 
              listings={listings}
              viewingMap={isViewingMap}
              setViewingMap={setIsViewingMap}
              selectedSpaceType={selectedSpaceType}
              setSelectedSpaceType={setSelectedSpaceType}
            />
          }

          <Box
            sx={{
              width:'100%',
              display:'flex',
              maxHeight:`calc(100dvh - ${isStandalone() || isMobile ? standaloneHeightConstant : 224}px)`,
            }}
          >
            <div
              id="map"
              style={{
                  width:'100%',
                  opacity:0+(isMobile || isViewingMap),
                  pointerEvents: isMobile || isViewingMap?'auto':'none',
                  display:isMobile || isViewingMap?'flex':'none',
                  zIndex:1,
                  minHeight:`calc(100dvh - ${isStandalone() || isMobile ? standaloneHeightConstant : 224}px)`,
                  maxHeight:`calc(100dvh - ${isStandalone() || isMobile ? standaloneHeightConstant : 224}px)`,
                  transition: 'opacity 0.3s, width 0.3s',
              }}
            />
            <ListingContainer
              selectedSpaceType={selectedSpaceType}
              ref={listingsDisplay}
              loading={isLoading}
              listings={listings}
              viewingMap={isViewingMap}
              sx={{
                p: 2,
                flexDirection:'column',
                gridTemplateColumns:{
                  xs:'repeat(1, 1fr)',
                  sm:'repeat(2, 1fr)',
                  lg:isViewingMap?'repeat(1, 1fr)':'repeat(3, 1fr)',
                  xl:isViewingMap?listings?.length > 1 ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)':'repeat(4, 1fr)',
                },
                minWidth: { 
                  xs: '100%', 
                  md:isViewingMap?400:'100%',
                  lg:isViewingMap?400:'fit-content',
                  xl:isViewingMap?listings?.length>1?750:400:'fit-content',
                },
                maxWidth:{
                  lg:isViewingMap?400:'fit-content',
                  xl:isViewingMap?listings?.length>1?750:400:'fit-content',
                },
                gap: 2,
                overflowY: 'auto',  // Enable scrolling if content overflows
              }}
            >
              <>
                {
                  isLoading

                  ?

                  <>
                    {(Array.from({length:4}).map((idx) => (
                      <Box key={idx} sx={{mb:{xs:2,lg:0}}}>
                        <Skeleton variant="rectangular" width='100%' sx={{borderRadius:4,minHeight:{xs:400,md:350}}} />
                      </Box>
                    )))}
                  </>

                  :
                  (
                    <>
                      {sortListings(
                        listings?.filter((_) => listingMatchesFilters(_.listing, filters, isMobile && selectedSpaceType !== 'All' && selectedSpaceType,)),
                        sorting?.price,
                        sorting?.size,
                      ).map((_, idx) => (
                        <Box key={idx} sx={{mb:{xs:2,lg:0}}}>
                          <ListingCard 
                            listing={_.listing} 
                            listing_uuid={_.id} 
                            host={_.host} 
                            userimpl={userImpl} 
                            customWidth={'100%'}
                          />
                        </Box>
                      ))}
                    </>
                  )}
              </>
            </ListingContainer>
          </Box>
      </div>

      <WarnedAction
        color='info'
        open={shouldAskForLocationApproval}
        onClose={() => setShouldAskForLocationApproval(false)}
        onClick={() => {
          localStorage.setItem(LOCALSTORAGE_REQUESTEDLOCATION_KEY, 'true')
          setReadyToFetchLocation(true)
          setShouldAskForLocationApproval(false)
        }}
        warningTitle={'Allow location'}
        warningDescription='Please allow us to access your location to fetch the listings nearest to you.'
      />
    </>)
}

export default Explore;