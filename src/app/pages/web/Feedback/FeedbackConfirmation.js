import React from 'react';
import { Container } from '@mui/material';
import MKTypography from 'components/MKTypography';
import MKBox from 'components/MKBox';

const FeedbackConfirmation = () => {
  return (
    <>
      <Container>
        <MKBox mt={4} textAlign="center" sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '70dvh', // Full viewport height
            }}>
          <MKTypography variant="h2" sx={{ fontWeight: '750', color: '#000', fontSize:{xs:'40px', md:'46px'}, fontFamily: 'Montserrat, sans serif' }}>
            Your feedback has been submitted.
          </MKTypography>
        </MKBox>
      </Container>
    </>
  );
};

export default FeedbackConfirmation;
