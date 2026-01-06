import React from 'react';
import { Grid } from '@mui/material';
import MKBox from 'components/MKBox';
import MKTypography from 'components/MKTypography';

import Basement from 'assets/images/Basement.webp';
import Garage from 'assets/images/Garage.webp';
import Attic from 'assets/images/Attic.webp';
import Carport from 'assets/images/Carport.webp';
import ParkingLot from 'assets/images/ParkingLot.webp';
import UnpavedLot from 'assets/images/UnpavedLot.webp';

const MobileImageArray = ({ sx }) => {
  // Sample image data for demonstration
  const images = [
    { src: Basement, subtitle: 'Basement Storage' },
    { src: Garage, subtitle: 'Garage Storage' },
    { src: Attic, subtitle: 'Attic Storage' },
    { src: Carport, subtitle: 'Carport Parking' },
    { src: ParkingLot, subtitle: 'Parking Lots' },
    { src: UnpavedLot, subtitle: 'Unpaved Lots' }
  ];

  return (
    <MKBox sx={{ flexGrow: 1, ...sx }}>
      <Grid container spacing={2}>
        {images.map((image, index) => (
          <Grid item xs={6} key={index}>
            <MKBox
              sx={{
                position: 'relative',
                width: '100%',
                paddingTop: '75%', // 4:3 aspect ratio
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: 2,
              }}
            >
              <img
                src={image.src}
                alt={`Image ${index}`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '12px',
                }}
              />
              <MKBox
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.2)', // Adjust tint color and opacity as needed
                  borderRadius: '12px',
                }}
              />
              <MKBox
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  padding: '8px 10px',
                  borderRadius: '0 0 8px 0',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              >
                <MKTypography
                  variant="body2"
                  sx={{
                    color: '#fff',
                    fontFamily: 'Montserrat, sans serif',
                    fontWeight: '580',
                    fontSize: '14px',
                  }}
                >
                  {image.subtitle}
                </MKTypography>
              </MKBox>
            </MKBox>
          </Grid>
        ))}
      </Grid>
    </MKBox>
  );
};

export default MobileImageArray;
