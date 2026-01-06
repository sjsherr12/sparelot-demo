import { storage_type_routes } from "app/sections/Options/routes"
import { Container, Typography } from "@mui/material"
import MKBox from "components/MKBox"
import safety_icon from 'assets/icons/shield_benefits.png'
import convenience_icon from 'assets/icons/location_benefits.png'
import affordability_icon from 'assets/icons/usd_benefits.png'
import IconicTextCard from "app/sections/Options/Card/Iconic/Textful"
import colors from "assets/theme/base/colors"
import MKButton from "components/MKButton"
import { useModal } from "app/sections/Modal/Parent/context"
import { userauth_title } from "app/sections/Modal/actions"
import { userauth_actions } from "app/sections/Modal/actions"
import breakpoints from "assets/theme/base/breakpoints"
import { useEffect, useState } from "react"
import SearchFlow from "app/sections/Modal/SearchFlow"
import Boxes from 'assets/images/Boxes.webp'
import HomeParking from 'assets/images/CarParkedDriveway.webp'
import { useNavigate } from "react-router-dom"
import HomeFront from 'assets/images/HomeFront.webp'
import MobileImageArray from "./MobileImageArray"
import HomeFAQs from "./FAQs"
import { useUserAuthState } from 'app/backend/user/auth/reactprovider';

export const TRILFormatted = () => {

  const { openModal } = useModal();
  const {user} = useUserAuthState();

  const searchByCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          window.location.href = `/explore?lat=${latitude}&lng=${longitude}`
        },
      );
    }
  }

  return (
    <>
      <Container
        sx={{
          display:'flex',
          my:4,
          gap:6,
          mb:5
        }}
      >
        <MKBox
          sx={{
            flexGrow:1,
            display:{xs:'none', md:'none', lg:'block'},
          }}
        >
            <img
              src={Boxes}
              style={{
                borderRadius:16,
                height:'100%',
                width:'540px'
              }}
            />
        </MKBox>
        <MKBox
          sx={{
            flexGrow:2,
            display:'flex',
            flexDirection:'column',

          }}
        >
          <MKBox
            sx={{
              display:'block',
              textAlign:{xs:'center', md:'center', lg:'left',},
            }}
          >
            <Typography
              variant='h2'
              sx={{
                fontSize:{xs:'30px', md:'55px'},

                color:'#000',
                textAlign:'left',
                mb:{xs:'0px', md:'-5px'}
              }}
            >
              {'The Ultimate Storage Marketplace'}
            </Typography>

            <Typography
              variant='body1'
              sx={{

                fontSize:{xs:'18px', md:'26px'},
                fontWeight:'540',
                color:'#464647',
                mt:{xs:2, md:4},
                textAlign:'left',
                mb:'25px'
              }}
            >
              {'Search, store, and save with peer-to-peer storage options for items, vehicles, and more.'}
            </Typography>
          </MKBox>

          <MKBox
            sx={{
              display:'flex',
              alignItems:'end',
              mt:'auto',
            }}
          >
            {user ? (
                  <MKButton
                  color='info'
                  sx={{
    
                    height:{xs:'48px', md:'100%'},
                    width:'100%',
                    fontSize:{xs:'20px', md:'26px'},
                    borderRadius:4,
                    textTransform:'none',
                    mb:{xs:'30px', md:'0px'},
                  }}
                  onClick = {searchByCurrentLocation}
                >
                  {`Find a Space`}
                </MKButton>
            ) : (
                <MKButton
                color='info'
                sx={{
  
                  height:{xs:'48px', md:'100%'},
                  width:'100%',
                  fontSize:{xs:'20px', md:'26px'},
                  borderRadius:4,
                  textTransform:'none',
                  mb:{xs:'30px', md:'0px'},
                }}
                onClick = {() => {
                  openModal(userauth_title, userauth_actions)
                }}
              >
                {`Sign Up`}
              </MKButton>
            )}
          </MKBox>
          <MobileImageArray sx={{display:{xs:'flex', md:'none'}}}></MobileImageArray>
        </MKBox>
      </Container>
    </>
  );
}


export const TLIRFormatted = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container
        sx={{
          display:'flex',
          my:4,
          gap:6,
          mb:5
        }}
      >
        <MKBox
          sx={{
            flexGrow:2,
            display:'flex',
            flexDirection:'column',
            textAlign:{xs:'center', md:'center', lg:'left'},
          }}
        >
          <MKBox
            sx={{
              display:'block',
            }}
          >
            <Typography
              variant='h2'
              sx={{
                fontSize:{xs:'30px', md:'55px'},

                color:'#000',
                textAlign:'left',
                mb:{xs:'0px', md:'-5px'}
              }}
            >
              {`Don’t let your unused space go to waste`}
            </Typography>

            <Typography
              variant='body1'
              sx={{


                fontSize:{xs:'18px', md:'26px'},
                fontWeight:'540',
                color:'#464647',
                mt:{xs:2, md:4},
                textAlign:'left',
                mb:'25px'
              }}
            >
              Got an extra room, garage, or driveway? Rent out your extra space and start receiving consistent passive income.
            </Typography>
          </MKBox>

          <MKBox
            sx={{
              display:'flex',
              alignItems:'end',
              mt:'auto',
            }}
          >
            <MKButton
              color='info'
              sx={{

                height:{xs:'48px', md:'100%'},
                width:'100%',
                fontSize:{xs:'20px', md:'26px'},
                borderRadius:4,
                textTransform:'none',
                mb:{xs:'30px', md:'0px'}
              }}
              onClick = {() => {
                navigate('/hosting')
              }}
            >
              Become a Host Today
            </MKButton>
          </MKBox>
          <MKBox
  component="img"
  src={HomeFront}
  alt="Home Front"
  sx={{
    width: '100%',
    height: 'auto',
    borderRadius: '16px',
    display: { xs: 'flex', md: 'none' }
  }}
/>
        </MKBox>
        <MKBox
          sx={{
            flexGrow:1,
            display:{xs:'none', md:'none', lg:'block'}
          }}
        >
            <img
              src={HomeParking}
              style={{
                borderRadius:16,
                height:'100%',
                width:'540px'
              }}
            />
        </MKBox>
      </Container>
    </>
  );
}

export const StorageTypeSelection = () => {
    const [searchType, setSearchType] = useState(null);
    const [searchFlowActive, setSearchFlowActive] = useState(false);

    return (
      <>
        <MKBox sx={{backgroundColor:'#f5f5f5'}}>
          <Container
            sx={{
              display:'block',
              width:'100%',
              textAlign:'center',
              pb:4,
              mb:4,
            }}
          >
            <Typography
              variant='h1'
              sx={{

                p:{xs:'24px', md:'30px'},
                color:'#000',
                fontSize:{xs:'28px', md:'42px'}
              }}
            >
              {'Storage Categories'}
            </Typography>

            <MKBox
              sx={{
                display:{xs:'grid', md:'flex'},
                gridTemplateColumns: 'repeat(2, 1fr)',
                textAlign:'center',
                gap:2,
              }}
            >
            {
              (storage_type_routes.map((type, idx) => (
                <>
                  <MKBox
                    sx={{
                      display:'flex',
                      textAlign:'center',
                      alignItems:'center',
                      justifyContent:'center',
                      border:`1px solid gray`,
                      borderRadius:4,

                      flexGrow:1,
                      width:'100%',
                      height:125,

                      color:'gray',
                      backgroundColor:'#fff',

                      '&:hover':{
                        color:colors.badgeColors.info.text,
                        cursor:'pointer',
                        border:`1px solid ${colors.badgeColors.info.text}`,
                        transition:'all 0.25s ease-out',
                      },

                      transition:'all 0.25s ease-out',
                    }}
                    onClick={() => {
                      setSearchType(type.name);
                      setSearchFlowActive(true);
                    }}
                  >
                    <MKBox
                      sx={{
                        width:'100%',
                        color:'inherit',
                      }}
                    >
                      <MKBox
                          sx={{
                              fontSize:'35px',
                              color:'inherit',
                              mb:-2,
                          }}
                      >
                        {type.icon}
                      </MKBox>
                      <Typography
                        sx={{
          
                          color:'inherit',
                          pt:1,
                        }}
                      >
                        {type.name.replace('or', '/')}
                      </Typography>
                    </MKBox>
                  </MKBox>
                </>
              )))
            }
            </MKBox>
          </Container>
        </MKBox>

        {searchFlowActive && <SearchFlow open={searchFlowActive} onClose={() => setSearchFlowActive(false)} init_searchtype={searchType}/>}
      </>
    )
}

export const BenefitArray = () => {
    return (
        <>
          <MKBox
            sx={{
              backgroundColor:'#ebebeb',
              pt:8,
              pb:5,
              mb:5
            }}
          >
            <Container
              sx={{
                display:{lg:'block', xl:'flex'},
                gap:4,
                width:'100%',
              }}
            >
              <IconicTextCard
                title={'Safety'}
                text={'With features such as host verification and secure payments, renters can rest assured their items are safe.'}
                image={safety_icon}
                width={110}
                height={130}
              />
              <IconicTextCard
                title={'Convenience'}
                text={'Our peer-to-peer platform gives users closer and more practical storage options without any pesky paperwork.'}
                image={convenience_icon}
                width={120}
                height={130}
              />
              <IconicTextCard
                title={'Affordability'}
                text={'Get more space for a lower price by storing and parking your belongings with SpareLot. Cancel anytime.'}
                image={affordability_icon}
                width={130}
                height={130}
              />
            </Container>
          </MKBox>
        </>
    )
}