import React from 'react';
import { Container } from "@mui/material";
import MKTypography from "components/MKTypography";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import TopLogo from 'assets/logos/sparelot_llc_logo_themed.png';
import ErrorImage from 'assets/images/ErrorImage.webp';

const Error404 = () => {
  document.title='404: Not Found!';
  return (
    <Container>
      {/* <MKBox 
        sx={{
          width: '100%', 
          display: {xs:'none', md:'flex'}, 
          justifyContent: 'center', 
          mt: '50px', 
          mb: '110px',
          '@media (max-width:600px)': {
            display: 'none', // Hide TopLogo on mobile
          }
        }}
      >
        <img src={TopLogo} alt="Top Logo" style={{ height: '75px' }} />
      </MKBox> */}
      
      <MKBox 
        sx={{
          mt:17,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          '@media (max-width:600px)': {
            flexDirection: 'column',
            alignItems: 'center',
          }
        }}
      >
        <MKBox 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '580px',
            '@media (max-width:600px)': {
              height: 'auto',
              textAlign: 'center',
            }
          }}
        >
          <MKTypography sx={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: '800',
            fontSize: '80px',
            color: '#000',
            mb: '15px',
            '@media (max-width:600px)': {
              fontSize: '50px',
              mb: '10px',
            }
          }}>
            So Sorry!
          </MKTypography>
          <MKTypography sx={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: '700',
            fontSize: '40px',
            color: '#000',
            mb: '50px',
            '@media (max-width:600px)': {
              fontSize: '30px',
              mb: '20px',
            }
          }}>
            The page you are looking for cannot be found. 
          </MKTypography>
          <MKTypography sx={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: '630',
            fontSize: '30px',
            color: '#000',
            mb: '10px',
            '@media (max-width:600px)': {
              fontSize: '25px',
              mb: '15px',
            }
          }}>
            Possible Reasons:
          </MKTypography>
          <MKBox sx={{ ml: '30px', color: '#000', '@media (max-width:600px)': { ml: 0 } }}>
            <List sx={{ listStyleType: 'disc', pl: 2 }}>
              <ListItem sx={{ display: 'list-item', pl: 0 }}>
                <ListItemText 
                  primary="The address may have been typed incorrectly"
                  primaryTypographyProps={{
                    fontSize: '20px',
                    color: '#000',
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: '550',
                    '@media (max-width:600px)': {
                      fontSize: '18px',
                    }
                  }}
                />
              </ListItem>
              <ListItem sx={{ display: 'list-item', pl: 0 }}>
                <ListItemText 
                  primary="It may be a broken or outdated link"
                  primaryTypographyProps={{
                    fontSize: '20px',
                    color: '#000',
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: '550',
                    '@media (max-width:600px)': {
                      fontSize: '18px',
                    }
                  }}
                />
              </ListItem>
            </List>
          </MKBox>
          <MKBox sx={{ display: 'flex', mt: {xs:'35px', md:'auto'}, flexDirection: 'row', '@media (max-width:600px)': { flexDirection: 'column', alignItems: 'center' } }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <MKButton color='info' sx={{
                p: '15px 35px',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: '610',
                fontSize: '18px',
                borderRadius: '12px',
                mr: '20px',
                '@media (max-width:600px)': {
                  mb: '10px',
                  mr: 0,
                }
              }}>
                SpareLot Home
              </MKButton>
            </Link>
            <Link to="/help" style={{ textDecoration: 'none' }}>
              <MKButton color='info' variant='outlined' sx={{
                p: '12px 35px',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: '610',
                fontSize: '18px',
                borderRadius: '12px',
                border: '3px solid #2e89ff',
                '@media (max-width:600px)': {
                  mb: '10px',
                  mr: 0,
                },
                '&:hover':{
                  border: '3px solid #2e89ff',
                }
              }}>
                Help
              </MKButton>
            </Link>
          </MKBox>
        </MKBox>
        
        <MKBox 
          sx={{
            display: { xs:'none', md:'none', lg: 'none', xl: 'block' }, // Hide image on mobile
          }}
        >
          <img src={ErrorImage} alt="Error" style={{ height: '580px' }} />
        </MKBox>
      </MKBox>
    </Container>
  )
}

export default Error404;
