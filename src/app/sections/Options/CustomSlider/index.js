import React, { useState, useRef, useEffect } from 'react';
import colors from 'assets/theme/base/colors';
import { Box, Slider, Tooltip } from '@mui/material';

const CustomSlider = ({ value, onChange, min, max, step }) => {
  const [localValue, setLocalValue] = useState(value);
  
  // Determine if this is a range slider based on whether value array has length 2
  const isRangeSlider = Array.isArray(value) && value.length === 2;

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (_, newValue) => {
    setLocalValue(newValue);
    onChange(null, newValue);
  };

  return (
    <Slider
      value={localValue}
      onChange={handleChange}
      min={min}
      max={max}
      step={step}
      valueLabelDisplay="auto"
      // For range sliders, we need to set the disableSwap prop to prevent thumbs from swapping positions
      disableSwap={isRangeSlider}
      sx={{
        zIndex:2,
        width: '100%',
        color: '#B0B0B0', // Grey color for the slider
        '& .MuiSlider-thumb': {
          width: 24,
          height: 24,
          boxShadow: 'none', // Remove any shadow
          backgroundColor: '#fff', // Initial grey color
          '&:hover, &:focus, &:active': {
            backgroundColor: '#2e89ff', // Light blue when interacted with
          },
        },
        '& .MuiSlider-track': {
          height: 4, // Set height for the slider track
          borderRadius: 2, // Rounded edges
          color: '#B0B0B0', // Grey color for the track
        },
        '& .MuiSlider-rail': {
          height: 4, // Set height for the rail
          borderRadius: 2, // Rounded edges
          opacity: 1, // Ensure it's visible
          color: '#B0B0B0', // Grey color for the rail
        },
        '& .MuiSlider-valueLabel': {
          fontSize:12,
          zIndex:2,
          color: '#fff',
          bgcolor: '#737373',
          fontFamily: 'Montserrat, sans serif',
          fontWeight: '550'
        }
      }}
    />
  );
};

export default CustomSlider;
