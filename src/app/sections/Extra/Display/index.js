import React, { useState } from 'react';
import { Container, Typography, TextField } from '@mui/material';
import MKBox from 'components/MKBox';
import MKButton from 'components/MKButton';

import { Check } from '@mui/icons-material';
import { CheckBox } from '@mui/icons-material';
import { CheckBoxRounded } from '@mui/icons-material';
import { CheckCircleOutline } from '@mui/icons-material';

import app_demo_pic from "assets/images/app_demo_pic.jpg"
import benefits_1 from "assets/images/benefits_1.png"
import benefits_2 from "assets/images/benefits_2.png"
import benefits_3 from "assets/images/benefits_3.png"

export const TextLeftImageRight = ({headline, subheadline, description}) => {
  return (
    <Container sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center' }}>
      <MKBox sx={{ flex: 1, padding: 2, textAlign: { xs: 'center', md: 'left' }, paddingRight: {xs: -2, md: 20} /* affects mobile vs pc padding, makes image smaller */ }}>
        <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2, fontSize: {xs: "40px", md: "50px"} }}>
          {headline}
          <br/>
          {subheadline}
        </Typography>
        <Typography variant="body1">
          {description}
        </Typography>
      </MKBox>

      <MKBox sx={{ flex: 1, py: 2 }}>
        <img
          src={app_demo_pic}
          alt="Illustration"
          style={{ width: '100%', height: 'auto', display: 'block', borderRadius: "25px" }}
        />
      </MKBox>
    </Container>
  );
};

export const TextRightImageLeft = ({benefit_array, description_array}) => {
  return (
    <Container sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center'}}>
      <MKBox sx={{ flex: 1, padding: 2 }}>
        <img
          src={benefits_1}
          alt="Illustration"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
        <img
          src={benefits_2}
          alt="Illustration"
          style={{ width: '100%', height: 'auto', display: 'block', marginTop:15, marginBottom:15 }}
        />
        <img
          src={benefits_3}
          alt="Illustration"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </MKBox>

      <MKBox sx={{ flex: 2, py: 2, textAlign: { xs: 'center', md: 'left' } }}>
        <MKBox sx={{margin: 2, my: 5}}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          <CheckCircleOutline /> {benefit_array[0]}
          </Typography>
          <Typography variant="body1">
            {description_array[0]}
          </Typography>
        </MKBox>

        <MKBox sx={{margin: 2, my: 5}}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          <CheckCircleOutline /> {benefit_array[1]}
          </Typography>
          <Typography variant="body1">
          {description_array[1]}
          </Typography>
        </MKBox>

        <MKBox sx={{margin: 2, my: 5}}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
            <CheckCircleOutline /> {benefit_array[2]}
          </Typography>
          <Typography variant="body1">
          {description_array[2]}
          </Typography>
        </MKBox>
      </MKBox>
    </Container>
  );
};