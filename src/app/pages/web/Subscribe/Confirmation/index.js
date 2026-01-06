import React from 'react';

import MKTypography from 'components/MKTypography';
import MKButton from 'components/MKButton';
import MKBox from 'components/MKBox';
import Container from '@mui/material/Container';

const SubscribeConfirmation = () => {

  const handleReturnHome = () => {
    window.location.href = "/"
  };

  return (
    <Container>
      <MKBox
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100dvh"
        textAlign="center"
        bgcolor="#f0f0f0"
        p={3}
      >
        <MKTypography variant="h3" component="h1" gutterBottom>
          Thank You for Subscribing!
        </MKTypography>
        <MKTypography variant="h5" component="h2" gutterBottom>
          We appreciate your interest.
        </MKTypography>
        <MKButton
          variant="contained"
          color="info"
          onClick={handleReturnHome}
          sx={{ mt: 3 }}
        >
          Return to Home
        </MKButton>
      </MKBox>
    </Container>
  );
};

export default SubscribeConfirmation;