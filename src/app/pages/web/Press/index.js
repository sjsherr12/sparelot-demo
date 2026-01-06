import React, { useState, useEffect, useRef } from 'react';
import TitleBackground from "app/sections/Extra/Display/TitleBg";
import Navbar from "app/sections/Navbar";
import { home_actions } from "app/sections/Navbar/actions";
import { home_mobile_routes } from "app/sections/Navbar/routes";
import { home_web_routes } from "app/sections/Navbar/routes";
import colors from "assets/theme/base/colors";
import Driving from 'assets/images/Driving.webp';
import { Typography } from '@mui/material';
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import { Container, Grid, Box, Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { styled } from '@mui/system';
import CancelIcon from '@mui/icons-material/Cancel';
import Boat from 'assets/images/Boat.webp';
import Boxes from 'assets/images/Boxes1.webp';
import CarDriveway from 'assets/images/CarDriveway.webp';
import headshot_s from 'assets/headshots/headshot_s.png';
import headshot_k from 'assets/headshots/headshot_k.png';
import Person from 'assets/images/Person.png'
import TopView from 'assets/images/TopView.webp';
import Slide from '@mui/material/Slide';
import * as c from 'const';
import { Helmet } from 'react-helmet-async';

const leadershipData = [
  {
    name: "Spencer Sherr",
    title: "Co-founder and CEO",
    subtitle: "Full Bio",
    imgSrc: headshot_s, 
    bio: "As chief executive officer, Spencer heads product strategy, branding, and marketing efforts. He is passionate about building great companies that bring communities together. With a strong background in entrepreneurship and a keen eye for innovation, Spencer has successfully launched and scaled multiple ventures. His leadership is driven by a commitment to fostering collaboration, enhancing user experiences, and creating value for both customers and stakeholders. Outside of work, Spencer enjoys pursuing academic interests and participating in athletics. "
  },
  {
    name: "Kareem Alaiwat",
    title: "Co-founder and CTO",
    subtitle: "Full Bio",
    imgSrc: headshot_k, // Replace with the actual image path
    bio: "As chief technology officer, Kareem leads web and mobile development for building the platform across iOS, Android, and web. With a deep expertise in full-stack development and a passion for cutting-edge technology, Kareem ensures that SpareLot’s platform is robust, scalable, and user-friendly. He oversees the engineering team, driving innovation and implementing best practices to deliver seamless user experiences. Kareem’s strategic vision and hands-on approach have been instrumental in aligning technology with the company’s goals, ensuring that the platform evolves to meet the needs of its growing user base."
  },
];

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} timeout={500}/>;
  });
  
  const LeadershipCards = () => {
    const [open, setOpen] = useState(false);
    const [selectedLeader, setSelectedLeader] = useState(null);
  
    const handleClickOpen = (leader) => {
      setSelectedLeader(leader);
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setSelectedLeader(null);
    };
  
    return (
      <>
        <Box
          sx={{
            px:0,
            display:{xs:'flex',lg:'grid'},
            flexDirection:'column',
            gridTemplateColumns:'repeat(3, 1fr)',
            alignItems:'center',
            gap:4,
            width:'100%',
          }}
        >
          {leadershipData.map((leader, index) => (
            <Grid item xs={12} sm={6} xxl={4} key={index}>
              <MKBox
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "20px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  textAlign: "center",
                  maxWidth: "500px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  textAlign: 'left',
                  p: '40px 40px',
                }}
              >
                <img
                  src={leader.imgSrc}
                  alt={`${leader.name} Profile`}
                  style={{
                    borderRadius: "50%",
                    width: "120px",
                    height: "120px",
                    marginBottom: "20px",
                  }}
                />
                <Typography variant="h4" sx={{ fontWeight: "700", mb: "10px", fontSize: '30px', color: '#051d40' }}>
                  {leader.name}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#757575", mb: "20px", fontWeight: "600", mb: "20px",fontSize: '25px', }}
                >
                  {leader.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    textDecoration: "underline",
                    color: "#2e89ff",
                    cursor: "pointer",
                    fontWeight: '540',
                    fontSize: '20px',
                  }}
                  onClick={() => handleClickOpen(leader)}
                >
                  {leader.subtitle}
                </Typography>
              </MKBox>
            </Grid>
          ))}
        </Box>
  
        <Dialog
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
          keepMounted
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: '30px', // Adjust the border radius here
              padding: '15px 20px', // Adjust the padding here
            },
          }}
        >
        <DialogTitle sx={{ position: 'relative' }}>
          <IconButton
            edge="end"
            color="info"
            onClick={handleClose}
            aria-label="close"
            sx={{ position: 'absolute', right: 20, top: 20, zIndex:100 }}
          >
            <CancelIcon sx={{ height: '44px', width: 'auto' }} />
          </IconButton>
        </DialogTitle>
          <DialogContent>
            {selectedLeader && (
              <MKBox>
                <img
                  src={selectedLeader.imgSrc}
                  alt={`${selectedLeader.name} Profile`}
                  style={{
                    borderRadius: '50%',
                    width: '100px',
                    height: '100px',
                    marginBottom: '8px',
                  }}
                />
                <Typography
                  variant="h4"
                  sx={{ fontWeight: '700', mb: '8px',  fontSize: '24px', color: '#051d40' }}
                >
                  {selectedLeader.name}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: '#757575', mb: '14px', fontWeight: '600',  fontSize: '20px' }}
                >
                  {selectedLeader.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#000',
                    fontWeight: '540',
                    fontSize: '15px',
                  }}
                >
                  {selectedLeader.bio}
                </Typography>
              </MKBox>
            )}
          </DialogContent>
        </Dialog>

      </>
    );
  };

const ImageWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  '& img': {
    width:'100%',
    maxWidth: '100%', // Ensures high-res display
    height: 'auto', // Auto height to maintain aspect ratio
    borderRadius: '20px',
    transform:'scale(1.3)',
    [theme.breakpoints.down('xxl')]: {
      height: 'auto', // Adjusts height for responsiveness
    },
  },
  '&.middle': {
    zIndex: 2,
    transform: 'scale(1.3)', // Scale up the middle image
  },
}));

const ResponsiveImageGrid = () => {
  return (
    <Container
      sx={{
        marginTop: { xs: '70px', xxl: '180px' },
        maxWidth: 'none',
        px: { xs: '0px', xxl: '50px' },
        overflow: 'visible',
        mb: { xs: '100px', xxl: '200px' },
        width: '100%', // Ensure full width on mobile
        display:{xs:'none', xxl:'flex'},
        alignItems:'center',
        justifyContent:'center',
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          width: '100%',
        }}
      >
        {/* Left Image */}
        <Grid
          item
          xs={4} // Set xs to 4 to fit three images in one row on mobile
          xxl={4}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            transform: { xxl: 'translateX(-10%)' },
            zIndex: 1,
          }}
        >
          <ImageWrapper>
            <img
              src={Boat}
              alt="Left Image"
              style={{
                maxHeight: { xs: '100px', lg: '200px' }, // Limit max height on mobile
                width:'90%',
              }}
            />
          </ImageWrapper>
        </Grid>

        {/* Middle Image */}
        <Grid
          item
          xs={4} // Set xs to 4 to fit three images in one row on mobile
          xxl={4}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            zIndex: 2,
          }}
        >
          <ImageWrapper className="middle">
            <img
              src={Boxes}
              alt="Middle Image"
              style={{
                boxShadow: '0px 0px 5px #464647',
                maxHeight: { xs: '100px', lg: '250px' }, // Limit max height on mobile
                width: '90%', // Keep aspect ratio by limiting width
              }}
            />
          </ImageWrapper>
        </Grid>

        {/* Right Image */}
        <Grid
          item
          xs={4} // Set xs to 4 to fit three images in one row on mobile
          xxl={4}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            transform: { xxl: 'translateX(10%)' },
            zIndex: 1,
          }}
        >
          <ImageWrapper>
            <img
              src={CarDriveway}
              alt="Right Image"
              style={{
                maxHeight: { xs: '100px', xxl: '200px' }, // Limit max height on mobile
                width: '90%', // Keep aspect ratio by limiting width
              }}
            />
          </ImageWrapper>
        </Grid>
      </Grid>
    </Container>
  );
};




const Press = () => {

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

  const [activeTab, setActiveTab] = useState('about');
  const [sliderStyle, setSliderStyle] = useState({});
  const tabsRef = useRef({});

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    const section = document.getElementById(tab);
    
    // Subtract pixels from the final scroll position to scroll a bit less
    const yOffset = -100; // Adjust this value as needed (positive scrolls up, negative scrolls down)
    const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  useEffect(() => {
    if (tabsRef.current[activeTab]) {
      const tabElement = tabsRef.current[activeTab];
      const tabRect = tabElement.getBoundingClientRect();
      const containerRect = tabElement.parentElement.getBoundingClientRect();

      setSliderStyle({
        left: `${tabRect.left - containerRect.left + 12}px`, // Centering adjustment
        width: `${tabRect.width - 18}px`, // Slightly less width
      });
    }
  }, [activeTab]);

  return (
    <>
      <Helmet>
          <title>SpareLot Press Coverage</title>
          <meta
              name="description"
              content="Find SpareLot in the news through recently published articles. If you're a reporter, find resources and a press kit for news coverage."
          />
          <meta
            name="keywords"
            content="storage, parking, marketplace, rental space, parking spaces, storage solutions, rent parking, rent storage, car parking, vehicle storage, item storage, press, news, SpareLot news"
          />
          <script type="application/ld+json">
            {JSON.stringify(organizationSchema)}
          </script>
      </Helmet>
      
      <TitleBackground
        title="The World’s Most Innovative Storage Platform"
        imageUrl={Driving}
        desktopContentHeight="750"
        AboveTitleContent={() => (
          <Typography
            variant='h2'
            sx={{
              mb:{xs:3, xxl:4},
              color: '#fff',
              
              fontSize:{xs:'20px', xxl:'38px'}
            }}
          >
            SpareLot in the News
          </Typography>
        )}
      />
      <Container>
        <MKBox sx={{
          marginTop: '30px',
          position: 'relative',
          borderBottom: '2px solid #ccc',
          height: '75px',
          display:{xs:'none', xxl:'flex'},
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}>
          <MKBox
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              flexGrow: 1,
              position: 'relative',
            }}
          >
            <Typography sx={{
              fontSize: '40px',
              fontWeight: '800',
              color: '#000',
              marginBottom: '10px', // Align bottom with tabs
              marginRight: '30px',
              
              display:{xs:'none', xxl:'flex'}
            }}>
              Press
            </Typography>
            <MKBox
              ref={(el) => tabsRef.current['about'] = el}
              onClick={() => handleTabClick('about')}
              sx={{
                padding: '14px 20px',
                cursor: 'pointer',
                textAlign:'left',
                fontWeight: activeTab === 'about' ? 'bold' : 'normal',
                color: activeTab === 'about' ? '#000' : '#737373',
                fontSize: {xs:15, xxl:27},
                fontWeight: '680',
                position: 'relative',
                marginRight: '10px', // Closer to Ambassador
                
              }}
            >
              About SpareLot
            </MKBox>
            <MKBox
              ref={(el) => tabsRef.current['leadership'] = el}
              onClick={() => handleTabClick('leadership')}
              sx={{
                padding: '14px 20px',
                cursor: 'pointer',
                textAlign:'left',
                fontWeight: activeTab === 'leadership' ? 'bold' : 'normal',
                color: activeTab === 'leadership' ? '#000' : '#737373',
                fontSize: {xs:15, xxl:27},
                fontWeight: '680',
                position: 'relative',
                
              }}
            >
              Leadership Team
            </MKBox>
            <MKBox
              ref={(el) => tabsRef.current['news'] = el}
              onClick={() => handleTabClick('news')}
              sx={{
                padding: '14px 20px',
                cursor: 'pointer',
                fontWeight: activeTab === 'news' ? 'bold' : 'normal',
                color: activeTab === 'news' ? '#000' : '#737373',
                fontSize: {xs:15, xxl:27},
                fontWeight: '680',
                textAlign:'left',
                position: 'relative',
                
              }}
            >
              In the News
            </MKBox>
            <MKBox
              sx={{
                position: 'absolute',
                bottom: '0',
                left: sliderStyle.left,
                width: sliderStyle.width,
                height: '3px',
                backgroundColor: '#000',
                transition: 'left 0.3s ease, width 0.3s ease',
                zIndex: 0,
              }}
            />
          </MKBox>
          <MKButton 
            color="info"
            component="a"        // Makes the button behave like an anchor tag (link)
            href="https://drive.google.com/drive/folders/1QFYAaNeVOsSo1CXgWaZO0DpLwAVqvb5J?usp=sharing"  // Replace with your desired URL
            target="_blank"      // Opens the link in a new tab (optional)
            rel="noopener noreferrer"  // Recommended for security when using target="_blank"
            sx={{
              width: '200px',
              height: '45px',
              borderRadius: '25px',
              
              fontSize: '20px',
              fontWeight: '600',
              alignSelf: 'center',
              mb: '4px',
              display:{xs:'none',xxl:'flex'}
            }}
          >
            Press Kit
          </MKButton>
        </MKBox>
      </Container>
      <Container>
        <MKBox id="about" sx={{
          marginTop:{xs:'30px', xxl:'50px'},
          width: '100%',
        }}>
          <Typography variant="h2" sx={{
            textAlign: 'center',
            fontSize:{xs:'32px', xxl:'48px'},
            fontWeight: '760',
            color: '#000',
            
          }}>
            Maximizing Unused Space Across the Country
          </Typography>
          <Typography variant='body1' sx={{
            
            textAlign: 'center',
            fontSize:{xs:'18px', xxl:'22px'},
            fontWeight: '580',
            color: '#525252',
            mt:{xs:'15px', xxl:'25px'},
          }}>
            SpareLot believes in a greater purpose for spaces of all shapes and sizes. We help people find safe, convenient, and affordable storage solutions while enabling others to earn extra income. At the forefront of our platform is the goal of creating more connected communities that prosper as a result.
          </Typography>
        </MKBox>
      </Container>
      <ResponsiveImageGrid/>
    <MKBox sx={{
                backgroundColor: '#f5f5f5', 
                padding:{xs:'30px 10px', xxl:'100px 20px'}, 
                mt:{xs:'54px', xxl:'70px'},
        }}>
        <Container>
            <MKBox id="leadership" sx={{
                width:'100%',
                }}>
                <Typography variant="h2" sx={{
                    fontSize:{xs:'36px', xxl:'50px'},
                    fontWeight: '760',
                    color: '#000',
                    
                    mb:{xs:'30px', xxl:'40px'}
                }}>
                    Our Leadership Team
                </Typography>
                <LeadershipCards />
            </MKBox>
        </Container>
    </MKBox>
        <Container>
            <MKBox id="news" sx={{
                marginTop: '50px',
                width:'100%',
                }}>
                <Typography variant="h2" sx={{
                    fontSize:{xs:'36px', xxl:'50px'},
                    fontWeight: '760',
                    color: '#000',
                    
                }}>
                    In the News
                </Typography>
                <Typography variant='body1' sx={{
                    
                    fontSize:{xs:'20px', xxl:'25px'},
                    fontWeight:'600',
                    color:'#525252',
                    mt:{xs:'15px', xxl:'25px'}
                }}>
                    From software articles to storage publications, see what others are saying about SpareLot and catch our latest updates below. 
                </Typography>
                <MKBox sx={{
                    height:'400px',
                    width:'350px',
                    bgcolor:'#edeff2',
                    borderRadius:'15px',
                    mt:'35px',
                    padding:'25px',
                    mb:{xs:'50px', xxl:'70px'},
                }}>
                    <Typography sx={{
                        
                        fontSize:'20px',
                        fontWeight:'540',
                        color:'#000',
                    }}>
                        SpareLot is currently awaiting its first publications. If you're a reporter, see our press kit below. 
                    </Typography>
                </MKBox>
            </MKBox>
        </Container>
        <Container>
  <MKBox id="press-kit" sx={{
      position: 'relative', 
      borderRadius: '15px',
      overflow: 'hidden', 
      my:2,
      height:{xs:'250px', xxl:'750px'},
      width: '100%',
      mb:{xs:'50px', xxl:'80px'}
  }}>
    <img 
      src={TopView}
      alt="Press Kit Background" 
      style={{ 
        width: '100%', 
        height:'100%',
        borderRadius: '40px', 
      }} 
    />
    <MKBox sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        height:'100%',
        width: '50%',  // Adjust width as needed
        backgroundColor: '#002B5B',
        color: '#fff',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: '40px 0 0 40px', // Rounded corners on the left side
    }}>
      <Typography 
        variant="h4" 
        sx={{ 
          fontWeight: 'bold', 
          mb: '40px', 
          color: '#fff',
          
          fontSize:{xs:20, xxl:45},
        }}
      >
        Download our press kit
      </Typography>
      <MKButton
  variant="contained"
  color="info"
  component="a"         // Makes the button behave like an anchor tag (link)
  href="https://drive.google.com/drive/folders/1QFYAaNeVOsSo1CXgWaZO0DpLwAVqvb5J?usp=sharing"  // Replace with your desired URL
  target="_blank"       // Optional: Opens the link in a new tab
  rel="noopener noreferrer"  // Recommended for security when using target="_blank"
  sx={{ 
    borderRadius: '50px',
    
    height: '60px',
    fontSize:{xs:'16px', xxl:'20px'},
    textTransform:'none'
  }}
>
  View Assets
</MKButton>
    </MKBox>
  </MKBox>
</Container>
    </>
  )
}

export default Press;