import styled from "@emotion/styled";
import { ArrowBackIosNew, ArrowDownward, ArrowForwardIos, KeyboardArrowDown, LocationOn } from "@mui/icons-material";
import { Box, Checkbox, FormControl, FormControlLabel, Icon, Input, InputAdornment, InputBase, List, ListItem, ListItemText, Menu, MenuItem, Select, TextField, Typography } from "@mui/material";
import colors from "assets/theme/base/colors";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import { useCallback, useEffect, useRef, useState } from "react";
import Selectable from "app/utils/setupListing/selectable";
import { States } from "app/utils/optimize/utils";
import L, { Map } from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { debounce } from "lodash";
import DescriptiveToggle from "app/sections/Options/Toggle/descriptive";
import Hr from "app/utils/Hr";

const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({lat: latitude, lng: longitude});
        },
        () => {
          reject('User denied or location unavailable');
        }
      );
    } else {
      reject('Geolocation not supported');
    }
  });
};

function formatAddressFromProperties(addressData) {
  const {
    house_number = '',
    road = '',
    city = '',
    town = '',
    state = '',
    postcode = '',
  } = addressData;

  // Construct a user-friendly address
  const addressParts = [
    house_number ? `${house_number} ${road}` : road, // Include house number if present
    city ? city : town,
    state,
    postcode
  ].filter(Boolean); // Remove empty or undefined parts

  // Join the parts with commas
  return addressParts.join(', ')
}

const SpaceLocation = ({street, setStreet, city, setCity, state, setState, zip, setZip, hasPermissionToRent, setHasPermissionToRent}) => {
    const [position, setPosition] = useState([51.505, -0.09]); // Default random position
    const [searchValue, setSearchValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
  
    // Initialize map only when component mounts
    useEffect(() => {
      const map = L.map('map', {
        zoomControl:false,
      }).setView(position, 18);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker(position).addTo(map);
      L.control.zoom({position:'bottomleft'}).addTo(map);
  
      // Cleanup map on unmount
      return () => map.remove();
    }, [position]);
    
    useEffect(() => {
      getUserLocation(
      ).then((up) => {
        setPosition(up)
      }).catch(err => {
        setPosition([1,1])
      })
    }, [])
  
    const fetchSuggestions = useCallback(
      debounce(async (query) => {
        if (query.length < 3) {
          setSuggestions([]);
          return;
        }
  
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}&countrycodes=us&format=json&addressdetails=1&limit=3`;
        try {
          const response = await fetch(url);
          const data = await response.json();
          const formattedData = data.map((it) => {
            return {
              ...it,
              display_name: formatAddressFromProperties(it.address),
            };
          });
          setSuggestions(formattedData);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      }, 500), // Debounce delay in ms
      []
    );
  
    const handleSearchChange = (event) => {
      const value = event.target.value;
      setSearchValue(value);
      setShowSuggestions(true);
      fetchSuggestions(value);
    };
  
    const handleSuggestionClick = (suggestion) => {
      setPosition([suggestion.lat, suggestion.lon]);
      setSearchValue(suggestion.display_name);
      setShowSuggestions(false);
      setStreet(suggestion.address.house_number + ' ' + suggestion.address.road);
      setCity(suggestion.address.city || suggestion.address.town);
      setState(suggestion.address.state);
      setZip(suggestion.address.postcode);
    };
  
    return (
      <Box
        sx={{
          mt:2,
          mb:4,
          width: "100%",
          maxWidth: 600,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography
          sx={{
            color: "#000",
            fontSize: { xs: "1.25rem", lg: "2rem" },
            fontWeight: 550,
            textAlign: "center",
            lineHeight: '25px',
          }}
        >
          Location of your space
        </Typography>
        <Typography
          sx={{
            color: "#737373",
            fontSize: { xs: "1rem", lg: "1.25rem" },
            fontWeight: 500,
            textAlign: "center",
          }}
        >
          Your exact address will not be public on your listing.
        </Typography>

        {/* Container for the map */}
        <Box
          id="map"
          sx={{ 
            my:2,
            p:{xs:2,lg:4},
            zIndex:1,
            height:{xs:'40dvh',lg:'50dvh'},
            width: "100%", 
            borderRadius: 4,
            boxShadow:'0px 6px 12px rgba(0,0,0,.2)'
          }}
        >
          <Input
            value={searchValue}
            onChange={handleSearchChange}
            fullWidth
            disableUnderline // Removes the underline style
            sx={{
              px:3,
              py:2,
              bgcolor: '#fff',
              borderRadius: 8, // Very round border radius
              boxShadow:4,
              zIndex: 1000,
              '& .MuiInput-input': {
                pl:2,
                color:'#000',
                fontSize:'1rem',
                fontWeight:550,
              },
            }}
            startAdornment={
              <InputAdornment position="start">
                <LocationOn sx={{ color: '#000', scale:2,ml:1, }} />
              </InputAdornment>
            }
          />
          {showSuggestions && suggestions.length > 0 && (
            <List
              sx={{
                mt:1,
                zIndex:1000,
                backgroundColor: "white",
                boxShadow: 1,
                borderRadius: 2,
                overflowX: "hidden",
              }}
            >
              {suggestions.map((suggestion, index) => (
                <ListItem
                  key={index}
                  button
                  onClick={() => handleSuggestionClick(suggestion)}
                  sx={{
                    px: 2,
                    py: 1,
                    bgcolor: '#fff',
                    '&:hover': {
                      bgcolor: '#ededed',
                    },
                    display: 'flex',  // To make sure the ListItem can be a flex container for better control
                  }}
                >
                  <Icon
                    sx={{
                      color: '#000',
                      scale: 1.5,
                      mr: 2,
                      mb: 1,
                    }}
                  >
                    <LocationOn />
                  </Icon>
                  
                  <ListItemText
                    sx={{
                      whiteSpace: 'nowrap',  // Prevent the text from wrapping
                      overflow: 'hidden',    // Hide the overflowing content
                      textOverflow: 'ellipsis',  // Show ellipsis when text overflows
                      maxWidth: 'calc(75vw)',  // Ensure the text has a max width to allow space for the icon
                      display: 'inline-block',  // Ensures that the element can handle text overflow properly
                    }}
                    primary={
                      <span>
                        {suggestion.display_name.toLowerCase().split(searchValue.toLowerCase()).map((part, i, arr) =>
                          i < arr.length - 1 ? (
                            <>
                              {part}
                              <b>{searchValue}</b>
                            </>
                          ) : (
                            part
                          )
                        )}
                      </span>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>

        <DescriptiveToggle
          title='Permission to host space'
          description='By activating this, you confirm that you have permission from the property owner to rent this space.'
          toggled={hasPermissionToRent}
          setToggled={setHasPermissionToRent}
        />
      </Box>
    );
}

export default SpaceLocation;