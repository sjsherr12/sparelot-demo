import React, { useEffect, useRef, useState } from 'react';
import MKBox from '@mui/material/Box';
import MKButton from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Icon from '@mui/material/Icon';
import InputAdornment from '@mui/material/InputAdornment';
import { LocationOn, Search } from '@mui/icons-material';
import { Container, IconButton, Typography } from '@mui/material';
import * as c from "const"
import MKTypography from 'components/MKTypography';
import colors from 'assets/theme/base/colors';
import { useNavigate } from 'react-router-dom';
import Hr from 'app/utils/Hr';
import { LoadingComponent } from 'app/utils/loading/component';

function useDebouncedValue(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

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

const SearchBar = ({placeholder, AdornmentIcon,}) => {
  
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(false);

  const handleSearch = () => {
    // Implement

    window.location.href = `/explore?search=${query}`;
    setSelected(false);
  };

  const searchByCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          window.location.href = `/explore?lat=${latitude}&lng=${longitude}`
        },
      );
    }
    setSelected(false);
  }

  const debouncedQuery = useDebouncedValue(query, 1000);

  const fetchSuggestions = async (query) => {
    setLoading(true);
    
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&countrycodes=us&format=json&addressdetails=1&limit=5`);
      if (!response.ok) {
        throw new Error(`API Request failed with status: ${response.status}`);
      }
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (debouncedQuery.length >= 5) { // Ensuring enough input before making API call
      fetchSuggestions(debouncedQuery);
    } else {
      setSuggestions([]); // Clear suggestions if input is too short
    }
  }, [debouncedQuery]);

  return (
    <MKBox style={{position:'relative'}}
    >
      <MKBox
        sx={{
          position:'fixed',
          top:0,
          left:0,
          width:'100vw',
          height:'100dvh',
          zIndex:1,
          display:selected?'flex':'none',
        }}
        onClick={() => setSelected(false)}
      />

        <MKBox
          sx={{
            borderRadius:'48px',
            overflow:'hidden',
            background: 'rgba(255, 255, 255, 1)', // Background with some transparency
            backdropFilter: 'blur(8px)', // Apply the blur effect
            boxShadow:4,
            width: "100%",
            height:{xs:66, md:75},
            alignItems:'center',
            position:'relative',
            zIndex:2,
          }}
          onClick={() => setSelected(true)}
        >   
          <MKBox
            sx={{
              display: 'flex',
              alignItems: 'center',
              height:{xs:66, md:75},
            }}
          >
            <TextField
              fullWidth
              placeholder={placeholder}
              value={query}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              onChange={(e) => setQuery(e.target.value)}

              autoComplete="off"

              InputProps= { AdornmentIcon ? {
                startAdornment: (
                  <InputAdornment position="start" sx={{fontSize:"32px"}}>
                    {AdornmentIcon &&
                      <Icon><AdornmentIcon/></Icon>
                    }
                  </InputAdornment>
                ),
              } : {}}

              sx={{
                flexGrow: 1,
                borderRadius:32,
                '.MuiOutlinedInput-root': {
                  fontSize: {xs:18, md:25},
                  margin:1,
                  userSelect: 'none',
                  pr:10,
 
                  '& fieldset': {
                    border: 'none',
                  },
                  '& input': {
                    color: '#000', // Text color
                  },
                },
              }}
            />

            <IconButton
              sx={{
                  position:'absolute',
                  top:7,
                  right:7,
                  width:{xs:53,md:62},
                  height:{xs:53,md:62},
                  aspectRatio:1/1,
                  backgroundColor: colors.gradients.info.main,
                  '&:hover': {
                      backgroundColor: colors.gradients.info.main,
                  },
                  fontSize:35
              }}
              onClick={handleSearch}
            >
              <Search
                sx={{
                  color: colors.white.main,
                  '&:hover': {
                      color: colors.white.main,
                  },
                }}
              />
            </IconButton>
          </MKBox>
        </MKBox>

        <MKBox
          sx={{
            opacity:selected + 0,
            pointerEvents: selected ? 'auto' : 'none',
            height:selected ? 'fit-content' : 0,
            width:'100%',
            display:'flex',
            flexDirection:'column',
            position:'absolute',
            top:{xs:70, md:80},
            px:1.25,
            boxShadow:4,
            zIndex:2,
            backgroundColor:'#fff',
            borderRadius:'12px',
          }}
        >
          {
            loading

            ?

            <LoadingComponent />

            :

            <MKBox sx={{display:'flex',flexDirection:'column',gap:0.25,mt:1,}}>
            {
              suggestions.map((suggestion, index) => (
                <MKBox
                    sx={{
                        display:'flex',
                        alignItems:'center',
                        gap:1,
                        fontSize:25,
                        px:2.25,
                        py:.5,

                        border:'1px solid rgba(0,0,0,0)',
                        cursor:'pointer',
                        '&:hover':{
                          border:'1px solid #095BC6',
                          borderRadius:2.5,
                          backgroundColor:'rgba(73,163,241,.25)'
                        },
                    }}
                    onClick={() => {
                      window.location.href = `/explore?search=${formatAddressFromProperties(suggestion.address)}`;
                      setSelected(false)
                    }}
                >
                    <Icon
                        sx={{
                            color:'#000',
                            height:35,
                            ml:-.5,
                        }}
                    >
                        <LocationOn fontSize="inherit"/>
                    </Icon>
                    <Typography
                        variant='h5'
                        sx={{
                            userSelect:'none',
                            color:'#000',
                            textAlign:'left',
                            fontWeight:500,
                            fontSize:{xs:16, md:20},
                            whiteSpace:'nowrap',
                            textOverflow:'ellipsis',
                            overflowX:'hidden',
                        }}
                    >
                        {formatAddressFromProperties(suggestion.address)}
                    </Typography>
                </MKBox>
              ))
            }
            </MKBox>
          }
          { query === '' &&
            <Typography
              variant='h5'
              sx={{
                  userSelect:'none',
                  color:'#000',
                  fontWeight:500,
                  fontSize:{xs:16, md:20},
                  mt:1.5,
                  mb:1,
                  mx:2.25,
                  textAlign:'left',
              }}
            >
              Type to get suggestions...
            </Typography>
          }
          <div style={{width:'100%', height:10}}/>
          <Hr/>
          <MKBox
              sx={{
                  display:'flex',
                  alignItems:'center',
                  width:'fit-content',
                  gap:1,
                  fontSize:25,
                  px:2.25,
                  py:.5,
                  my:1,
                  height:48,
                  border:'1px solid rgba(0,0,0,0)',
                  cursor:'pointer',
                  '&:hover':{
                    border:'1px solid #095BC6',
                    borderRadius:2.5,
                    backgroundColor:'rgba(73,163,241,.25)'
                  },
              }}
              onClick={searchByCurrentLocation}
          >
              <Icon
                  sx={{
                      color:'#000',
                      height:35,
                      ml:-.5,
                  }}
              >
                  <LocationOn fontSize="inherit"/>
              </Icon>
              <Typography
                  variant='h5'
                  sx={{
                      userSelect:'none',
                      color:'#000',
                      fontWeight:500,
                      fontSize:{xs:16, md:20},
                  }}
              >
                  Use Your Current Location
              </Typography>
          </MKBox>
        </MKBox>
    </MKBox>
  );
};

export default SearchBar;