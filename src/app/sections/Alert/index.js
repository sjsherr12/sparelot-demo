import { Close } from '@mui/icons-material';
import { Box, Fade, Modal, Typography } from '@mui/material';
import MKButton from 'components/MKButton';
import React from 'react';

const AlertComponent = ({ message, color, onClose }) => {
  return (
    <Modal
      open={message}
      onClose={onClose}
      sx={{
        zIndex:100000,
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
      }}
      closeAfterTransition
    >
      <Fade in={message} timeout={300}>
        <Box
          sx={{
            p:2,
            gap:2,
            width:500,
            maxWidth:'90vw',
            bgcolor:'#fff',
            borderRadius:4,
            display:'flex',
          }}
        >
          <Typography
            sx={{
              color:color,
              fontWeight:500,
              fontSize:'1rem',
            }}
          >
            {message}
          </Typography>
          <MKButton
            sx={{
              p:1,
              ml:'auto',
              height:'fit-content',
              minWidth:'unset',
              minHeight:'unset',
              color:'#737373',
              border:'1px solid #ededed',
            }}
            onClick={onClose}
          >
            <Close sx={{scale:1.25}} />
          </MKButton>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AlertComponent;
