import React, { useState } from 'react';
import Navbar from "app/sections/Navbar";
import { home_actions } from "app/sections/Navbar/actions";
import { home_mobile_routes } from "app/sections/Navbar/routes";
import { home_web_routes } from "app/sections/Navbar/routes";
import colors from "assets/theme/base/colors";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import { Container, Tabs, Tab, TextField, MenuItem, Select, InputLabel, FormControl, InputAdornment, Typography, Box } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AppStore from 'assets/logos/AppStore.png';
import GooglePlay from 'assets/logos/GooglePlay.png'
import * as c from 'const';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Add, ArrowForward } from '@mui/icons-material';

const Feedback = () => {
  
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Corporation",
    "name": "SpareLot",
    "url": "https://sparelot.com",
    "logo": "https://sparelot.com/Images/SpareLotLogo.png",  
    "description": "SpareLot is a storage and parking marketplace that connects renters searching for storage and parking to hosts looking to rent out their unused space.",
    "areaServed": "US",
    "sameAs": [
      "https://www.facebook.com/sparelot",
      "https://www.tiktok.com/@sparelot",
      "https://www.linkedin.com/company/sparelot",
      "https://www.instagram.com/sparelotstorage"
    ]
  };
  
  const [tabValue, setTabValue] = useState(0);
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleRatingChange = (value) => {
    setRating(prevRating => prevRating === value ? 0 : value); // Toggle rating
  };
  

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (rating === 0 || category === '' || description.trim() === '') {
      alert("Please fill out all fields before submitting.");
      return; // Stop the function if validation fails
    }
  
    // Collect form data manually
    const formData = new FormData();
    formData.append("rating", rating);
    formData.append("category", category);
    formData.append("description", description);
  
    // Send the form data to the Google Apps Script URL
    fetch('https://script.google.com/macros/s/AKfycbwB_w-iML9m7kyurlISPqPSHYc_SxQ8LV1TkXq6mEb2ARGJyKGh-y3aAC-GCnj7M-bV/exec', {  // Replace with your actual Web App URL
      method: 'POST',
      body: formData,
    })
    .then(response => response.text())  // Handle the response from the script
    .then(result => {
      setRating(0);
      setCategory('');
      setDescription('');
      // Redirect to the confirmation page
      navigate('/feedback-confirmation');
    })
    .catch(error => {
      console.error("Error:", error);  // Handle any errors
      alert("There was an issue submitting your feedback. Please try again.");
    });
  };
  

  return (
    <>
        <Helmet>
            <title>Feedback and Reviews</title>
            <meta
                name="description"
                content="Give feedback on the SpareLot platform and leave reviews using Trustpilot, App Store, or Play Store."
            />
            <meta
              name="keywords"
              content="storage, parking, marketplace, rental space, parking spaces, storage solutions, rent parking, rent storage, car parking, vehicle storage, item storage, SpareLot feedback, SpareLot reviews"
            />
            <script type="application/ld+json">
              {JSON.stringify(organizationSchema)}
            </script>
        </Helmet>

      <Container>
        {/* <MKBox mt={4}>
          <Tabs value={tabValue} onChange={handleTabChange} sx={{zIndex:1}}>
            <Tab label="Give Feedback" sx={{fontWeight:'650',  color:'#000'}}/>
            <Tab label="Leave a Review" sx={{fontWeight:'650',  color:'#000'}}/>
          </Tabs>
        </MKBox> */}

        {/* {tabValue === 0 && ( */}
          <MKBox mt={3}>
            <Box
              sx={{
                display:'flex',
                alignItems:'center',
                gap:4,
                width:'100%',
                flexDirection:{
                  xs:'column',
                  lg:'row',
                },
                height:'100%',
              }}
            >
              <Box
                sx={{
                  width:'100%',
                  display:'flex',
                  flexDirection:'column',
                  height:'100%',
                }}
              >
                <Typography variant="h2" sx={{
                    fontWeight:'750',
                    
                    color:'#000',
                    fontSize:'40px'
                }}>
                    Feedback
                </Typography>
                <MKBox mt={2}>
                    <Typography variant="h6" sx={{
                        fontWeight:'650',
                        
                        color:'#000',
                        fontSize:'24px',
                    }}>
                        Rate Your Experience
                    </Typography>
                  <MKBox display="flex" mt={2} sx={{width:'100%', gap:2,alignItems:'start',flexDirection:{xs:'column',lg:'row'}}}>
                    <Box
                    >
                      <Box
                        sx={{
                          width:{xs:'100%',md:'fit-content'},
                          gap:1,
                          display:'flex',
                          alignItems:'center',
                        }}
                      >
                      {[1, 2, 3, 4, 5].map((value) => (
                        <MKBox
                          key={value}
                          onClick={() => handleRatingChange(value)}
                          border={rating === value ? "2px solid black" : "2px solid lightgray"}
                          borderRadius="4px"
                          p={{xs:1, md:2}}
                          display="flex"
                          alignItems="center"
                          justifyContent='center'
                          sx={{ cursor: 'pointer', borderRadius:'12px', flexGrow:{xs:1, md:'unset'}, }}
                        >
                          <Typography variant="body2" sx={{
                              mr:1,
                              fontWeight:'600',
                              
                              color:'#000',
                              fontSize:'22px'
                          }}>
                              {value}
                          </Typography>
                          <StarIcon sx={{
                              color:'#000'
                          }}/>
                        </MKBox>
                      ))}
                      </Box>
                      <MKBox display="flex" justifyContent="space-between" mt={1} sx={{width:'100%'}}>
                        <Typography variant="caption">Very dissatisfied</Typography>
                        <Typography variant="caption">Very satisfied</Typography>
                      </MKBox>
                    </Box>
                    <Typography
                      variant='h1'
                      sx={{
                        mt:1,
                        height:'100%',
                        display:{xs:'none',lg:'flex'},
                        alignItems:'center',
                        justifyContent:'center',
                      }}
                    >
                      <Add fontSize='inherit'/>
                    </Typography>
                    <MKBox
                      component="a"
                      href="https://www.trustpilot.com/review/sparelot.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '3px solid #2e89ff',
                          borderRadius: '9px',
                          height: '70px',
                          cursor: 'pointer',
                          width:{xs:'100%', md:400},
                          textDecoration: 'none', // Ensures the text inside the box doesn't have an underline
                          "& .trustpilot-widget": {
                          width: '100%', // Ensures the Trustpilot widget spans the entire width
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: '100%', // Ensures the widget content is vertically centered
                          },
                          "& .trustpilot-widget a": {
                          
                          fontWeight: '600',
                          color: '#2e89ff', // Set link color inside the widget
                          textDecoration: 'none', // Remove underline from the link text
                          },
                      }}
                      >
                      <div
                          className="trustpilot-widget"
                          data-locale="en-US"
                          data-template-id="56278e9abfbbba0bdcd568bc"
                          data-businessunit-id="66bbb056e8d853663be69b4c"
                          data-style-height="52px"
                          data-style-width="100%"
                      >
                          <a href="https://www.trustpilot.com/review/sparelot.com" target="_blank" rel="noopener noreferrer">
                            Review us on ★ Trustpilot
                          </a>
                      </div>
                      </MKBox>
                  </MKBox>
                </MKBox>
              </Box>
            </Box>

            <MKBox mt={3}>
              <Typography variant="h6" sx={{
                fontWeight:'650',
                
                color:'#000',
                fontSize:'24px',
                mb:'20px'
              }}>
                Feedback Category
              </Typography>
              <FormControl fullWidth variant="outlined">
                <InputLabel
                  sx={{
                    
                    height:50,
                  }}
                >
                  Select Category
                </InputLabel>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  label='Select Category'
                  sx={{ height: '50px', cursor:'pointer',  }}  // Adjust the height here
                  endAdornment={<InputAdornment position="end"><ExpandMoreIcon sx={{color:'#000'}}/></InputAdornment>}
                >
                  <MenuItem value="Account" sx={{}}>Account</MenuItem>
                  <MenuItem value="Bug/Issue" sx={{}}>Bug/Issue</MenuItem>
                  <MenuItem value="Feature Idea" sx={{}}>Feature Idea</MenuItem>
                  <MenuItem value="Other" sx={{}}>Other</MenuItem>
                </Select>
              </FormControl>
            </MKBox>

            <MKBox mt={3}>
              <Typography variant="h6" sx={{
                fontWeight:'650',
                
                color:'#000',
                fontSize:'24px',
                mb:'20px'
              }}>
                Feedback Description
            </Typography>
              <TextField
                multiline
                rows={4}
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of your idea or issue."
                variant="outlined"
                inputProps={{ 
                  maxLength: 300, 
                  sx:{
                    fontWeight:500,
                    fontSize:17,
                    
                  }
                }}
              />
            </MKBox>

            <MKBox my={3} textAlign="right">
              <MKButton color="info" variant="contained" onClick={handleSubmit} sx={{
                fontSize:'15px',
                fontWeight:'600px',
                textTransform:'none',
                
              }}>
                Submit
              </MKButton>
            </MKBox>
          </MKBox>
        {/* )} */}

        {/* {tabValue === 1 && (
          <MKBox>
            <MKBox mt={3} sx={{display:'none',mb:'40px'}}>
                <Typography variant="h6" sx={{
                    fontWeight:'650',
                    
                    color:'#000',
                    fontSize:{xs:20, md:27},
                    mb:'20px'
                }}>
                    Mobile Application Reviews
                </Typography>
                <MKBox sx={{ display: 'flex', width:'100%', gap:1, }}>
                    <a href="" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                        <MKBox sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '2px solid',
                            borderRadius: '15px',
                            cursor: 'pointer',
                            p: '15px 20px',
                        }}>
                            <img src={AppStore} style={{ height: '35px' }} alt="App Store" />
                            <Typography sx={{
                                ml: 2,
                                fontWeight: '600',
                                
                                color: '#000',
                                fontSize: {xs:18, md:22},
                            }}>
                                App Store
                            </Typography>
                        </MKBox>
                    </a>
                    <a href="" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                        <MKBox sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '2px solid',
                            borderRadius: '15px',
                            cursor: 'pointer',
                            p: '15px 20px',
                        }}>
                            <img src={GooglePlay} style={{ height: '35px' }} alt="Google Play" />
                            <Typography sx={{
                                ml: 2,
                                fontWeight: '600',
                                
                                color: '#000',
                                fontSize: {xs:18, md:22},
                            }}>
                                Google Play
                            </Typography>
                        </MKBox>
                    </a>
                </MKBox>
            </MKBox>
          </MKBox>
        )} */}
      </Container>
    </>
  );
};

export default Feedback;
