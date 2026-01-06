import React from 'react';
import { Container } from '@mui/material';
import MKTypography from 'components/MKTypography';
import MKBox from 'components/MKBox';
import colors from 'assets/theme/base/colors';

const IconicGrid = ({ cardsPerLine, cardInfo }) => {
  return (
    <Container
      sx={{
        paddingLeft: '0 !important', // Remove padding
        paddingRight: '0 !important', // Remove padding
        maxWidth: '100% !important',  // Ensure full width
      }}
    >
      <MKBox
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: `repeat(${cardsPerLine}, 1fr)` },
          gap: '48px',
          mt: '70px',
          width: '100%',  // Ensure the grid takes full width
          mx: '0',        // Ensure no margin on x-axis
        }}
      >
        {cardInfo.map((card, index) => (
          <MKBox
            key={index}
            onClick={card.onclick}
            sx={{
              border: `3px solid ${colors.background.theme}`,
              borderRadius: '15px',
              padding: '32px 16px',
              textAlign: 'center',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#f0f0f0',
              },
            }}
          >
            <MKBox sx={{ fontSize: '60px', color: colors.background.theme }}>
              <card.icon fontSize="inherit" />
            </MKBox>
            <MKTypography variant="h2" component="div" sx={{ fontFamily: "Montserrat, sans serif", color: colors.background.theme }}>
              {card.title}
            </MKTypography>
          </MKBox>
        ))}
      </MKBox>
    </Container>
  );
};

export default IconicGrid;
