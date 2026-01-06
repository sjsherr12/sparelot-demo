import React from 'react';
import { Box, Typography } from '@mui/material';
import colors from 'assets/theme/base/colors';

const ToggleRadioButton = ({ label, isActive, onToggle }) => {
  return (
    <Box
      onClick={onToggle} // Function to toggle active/inactive state
      sx={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        py:1,
        userSelect: 'none',
      }}
    >
      {/* Circle that looks like a radio button */}
      <Box
        sx={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          border: `2px solid ${isActive ? colors.gradients.info.main : 'gray'}`,
          backgroundColor: isActive ? colors.gradients.info.main : 'transparent',
          marginRight: '12px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'background-color 0.3s ease',
        }}
      >
        <Box
          sx={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: '#fff', // Inner circle when active
            display:isActive?'flex':'none',
          }}
        />
      </Box>

      {/* Label text */}
      <Typography
        sx={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 'normal',
          fontSize: 14,
          color: isActive ? colors.gradients.info.main : 'gray',
          textTransform: 'capitalize', // Ensure the label is properly formatted
        }}
      >
        {label.replaceAll('_', ' ')}
      </Typography>
    </Box>
  );
};

export default ToggleRadioButton;
