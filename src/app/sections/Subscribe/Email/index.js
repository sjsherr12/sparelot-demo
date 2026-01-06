import React, { useState } from 'react';
import { Container, Typography, TextField } from '@mui/material';
import MKBox from 'components/MKBox';
import MKButton from 'components/MKButton';

import * as c from "const"
import colors from 'assets/theme/base/colors';

export const EmailSubscribe = ({title, description, register, disclaimer}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = async () => {
  }

  return (
    <MKBox sx={{ backgroundColor:colors.background.theme}}>
      <Container>
        <MKBox
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            margin: 'auto',
            py: 5,
            boxSizing: 'border-box',
          }}
        >
          <MKBox sx={{ flex: 1, padding: 2 }}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', textAlign: { xs: 'center', md: 'left' }, color:colors.white.main}}>
              {title}
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2, textAlign: { xs: 'center', md: 'left' }, color:colors.text.main }}>
              {description}
            </Typography>
          </MKBox>
          <MKBox sx={{ flex: 1, padding: 0, maxWidth: 400, width: '100%' }}>
            <MKBox
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: '100%',
              }}
            >
              <MKBox sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{     
                    '& .MuiInputLabel-root': {
                      color: colors.white.main,
                    },
                    '& .MuiInputBase-input': {
                      color: colors.white.main,
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    '& .MuiInputLabel-root': {
                      color: colors.white.main,
                    },
                    '& .MuiInputBase-input': {
                      color: colors.white.main,
                    },
                  }}
                />
              </MKBox>
              <MKButton
                variant="contained"
                color="info"
                onClick={handleRegister}
                sx={{ width: '100%' }}
              >
                {register}
              </MKButton>
              <Typography variant="caption" sx={{ textAlign: 'center', color:colors.text.main}}>
                {disclaimer}
              </Typography>
            </MKBox>
          </MKBox>
        </MKBox>
      </Container>
    </MKBox>
  );
};

export const FooterSubscribe = ({title, register, disclaimer}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = async () => {
  }

  return (
    <MKBox sx={{ backgroundColor:colors.background.theme }}>
      <Container>
        <MKBox
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            padding: 5,
            boxSizing: 'border-box'
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2, color: colors.white.main }}>
            {title}
          </Typography>
          <MKBox
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              width: '100%',
              maxWidth: 400,
            }}
          >
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{
                '& .MuiInputLabel-root': {
                  color: colors.white.main,
                },
                '& .MuiInputBase-input': {
                  color: colors.white.main,
                },
              }}
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                '& .MuiInputLabel-root': {
                  color: colors.white.main,
                },
                '& .MuiInputBase-input': {
                  color: colors.white.main,
                },
              }}
            />
            <MKButton
              variant="contained"
              color="info"
              onClick={handleRegister}
              sx={{ width: '100%' }}
            >
              {register}
            </MKButton>
            <Typography variant="caption" sx={{ textAlign: 'center', color:colors.text.main }}>
              {disclaimer}
            </Typography>
          </MKBox>
        </MKBox>
      </Container>
    </MKBox>
  );
};