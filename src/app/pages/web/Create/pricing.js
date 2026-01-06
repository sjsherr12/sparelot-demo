import { Box, Checkbox, FormControl, FormControlLabel, FormHelperText, InputBase, Typography } from "@mui/material";
import Hr from "app/utils/Hr";
import { isElegibleForSTPP } from "app/utils/listings/utils";
import { recommendPrice } from "app/utils/listings/utils";
import { SpaceTypes } from "app/utils/optimize/utils";
import Selectable from "app/utils/setupListing/selectable";
import colors from "assets/theme/base/colors";
import { useState } from "react";

const { default: MKBox } = require("components/MKBox")



const SpacePricing = ({spaceType, monthlyPrice, setMonthlyPrice, minimumPrice, setMinimumPrice, oneTimePricing, setOneTimePricing, isDynamicPricing, setIsDynamicPricing, isDiscountedPrice, setIsDiscountedPrice, width, length}) => {
    
    const [monPriceError, setMonPriceError] = useState(false);

    const area = length * width
    const reccPrice = recommendPrice(spaceType, area)
    const fmp_desc = <> We won’t adjust your price. </>
    const fmp_arr = [
        {
            title:'Monthly Price',
            desc: <>Recommended (Estimate): <span style={{ color: colors.gradients.info.main }}>${reccPrice}</span></>,
            get:monthlyPrice,
            set:setMonthlyPrice,
            errget: monPriceError,
            errset: setMonPriceError,
        },
    ]


    
    return (
        <Box
            sx={{
                mt:2,
                mb:4,
                width: "100%",
                maxWidth: 600,
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Typography
                sx={{
                    color: "#000",
                    fontSize: { xs: "1.25rem", lg: "2rem" },
                    fontWeight: 550,
                    textAlign: "center",
                    lineHeight: '25px',
                }}
            >
                Space Pricing
            </Typography>
            <Typography
                sx={{
                    my:2,
                    color: "#737373",
                    fontSize: { xs: "1rem", lg: "1.25rem" },
                    fontWeight: 500,
                    textAlign: "center",
                }}
            >
                Enter a monthly listing price. Prices for shorter booking durations will be calculated based on this price.
                <span 
                    style={{
                        fontSize:16,
                        marginTop:8, 
                        color:'#b5b5b5',
                        display:spaceType === SpaceTypes.indexOf('Parking_garage') || spaceType === SpaceTypes.indexOf('Parking_lot')?'flex':'none', 
                    }}
                >
                    *If you are listing a parking structure or parking lot, enter the rental price for one parking spot, not the entire space.
                </span>
            </Typography>

            <Hr />

            <MKBox
                sx={{
                    display:'flex',
                    flexDirection:'column',
                }}
            >

                {/* <Typography
                    variant='h5'
                    sx={{
                        mt:1,
                        mb:2,
                        color:'#737373',
                        fontWeight:500,
                        fontFamily:'Montserrat, sans-serif',
                    }}
                >
                    {isDynamicPricing ? dyp_desc : fmp_desc}
                </Typography> */}
                { ({/*isDynamicPricing ? dyp_arr :*/}.length || fmp_arr).map((fld, idx) => (
                    <>
                        <MKBox
                            sx={{
                                display:'flex',
                                py:2,
                                alignItems:'center',
                            }}
                        >
                            <MKBox
                                sx={{
                                    display:'flex',
                                    flexDirection:'column',
                                    justifyContent:'start',
                                    height:'100%',
                                    gap:.125,
                                }}
                            >
                                <Typography
                                    variant='h5'
                                    sx={{
                                        color:'#000',
                                        fontWeight:500,
                                        fontSize:{xs:16, md:20},
                                    }}
                                >
                                    {fld.title}
                                </Typography>

                                <Typography
                                    variant='body2'
                                    sx={{
                                        color:fld.errget?colors.error.main : '#737373',
                                        fontWeight:500,
                                        fontSize:{xs:15, md:17},
                                    }}
                                >
                                    {fld.errget ? `Price must be $1-$1000.` : fld.desc}
                                </Typography>
                            </MKBox>

                            <MKBox
                                sx={{
                                    ml:'auto',
                                    position:'relative',
                                    width:100,
                                    height:'100%',
                                    display:'flex',
                                    alignItems:'center',
                                    justifyContent:'center',
                                }}
                            >
                                <InputBase
                                    value={fld.get}
                                    onChange={(e)=> {
                                        if (/^\d+$/.test(e.target.value) || !e.target.value.length) {
                                            fld.set(e.target.value)
                                            if (parseInt(e.target.value) > 1000) {
                                                fld.errset(true);
                                            }
                                            else {
                                                fld.errset(false);
                                            }
                                        }
                                    }}
                                    inputProps={{
                                        maxLength:4,
                                    }}
                                    error={true}
                                    sx={{
                                        pl:4.5,
                                        pr:2,
                                        pt:.5,
                                        pb:.25,
                                        borderRadius:3,
                                        border:'1px solid #a9a9a9',
                                        backgroundColor:'#f0eeee',
                                        fontSize:18,
                                        fontWeight:500,
                                    }}
                                />
                                <Typography
                                    sx={{
                                        position:'absolute',
                                        left:12,
                                        top:{xs:10,lg:14},
                                        fontWeight:'bold',
                                        color:'#000',
                                    }}
                                >
                                    $
                                </Typography>
                            </MKBox>
                        </MKBox>
                        <Hr/>
                    </>
                ))}

                {/* <Typography
                    variant='h6'
                    sx={{
                        mt:2,
                        color:'#737373',
                        fontWeight:500,
                        fontFamily:'Montserrat, sans-serif',
                    }}
                >
                    {`Don’t want to use ${isDynamicPricing ? 'dynamic pricing' : 'fixed pricing'}?`}
                </Typography>

                <Typography
                    variant='h6'
                    sx={{
                        color:colors.gradients.info.main,
                        textDecoration:'underline',
                        fontWeight:500,
                        fontFamily:'Montserrat, sans-serif',
                        cursor:'pointer',
                    }}
                    onClick={() => setIsDynamicPricing(!isDynamicPricing)}
                >
                    {`Use ${isDynamicPricing ? 'fixed pricing' : 'dynamic pricing'}`}
                </Typography> */}

                { isElegibleForSTPP(spaceType) && 
                    <>
                        <Typography
                            variant='h4'
                            sx={{
                                color:'#000',
                                mt:2,
                                fontWeight:500,
                            }}
                        >
                            Short-Term Renting (optional)
                        </Typography>
                        <Typography
                            variant='h5'
                            sx={{
                                my:1,
                                color:'#737373',
                                fontWeight:500,
                            }}
                        >
                            Hosts listing an elegible space can optionally offer short-term renting for renters, in which 1-6 day rental requests are allowed. This is generally used for spaces near events and activities for renters to book as a parking alternative but can also be used as general short term storage.
                        </Typography>

                        <FormControlLabel
                            label='Check to allow short term renting for renters'
                            control={
                                <Checkbox
                                    checked={oneTimePricing}
                                    onChange={(e) => {
                                        setOneTimePricing(e.target.checked);
                                    }}
                                    sx={{
                                        display: 'flex',
                                        userSelect: 'none',
                                        color: colors.gradients.info.main,
                                        '&.Mui-checked': {
                                            color: colors.gradients.info.main,
                                        },
                                    }}
                                />
                            }
                            sx={{
                                display:'flex',
                                mb:1,
                            }}
                            componentsProps={{
                                typography: {
                                },
                            }}
                        />


                        <Hr/>

                        {/* <MKBox
                            sx={{
                                display:'flex',
                                py:2,
                                alignItems:'center',
                            }}
                        >
                            <MKBox
                                sx={{
                                    display:'flex',
                                    flexDirection:'column',
                                    justifyContent:'start',
                                    height:'100%',
                                    gap:.125,
                                }}
                            >
                                <Typography
                                    variant='h5'
                                    sx={{
                                        color:'#000',
                                        fontWeight:500,
                                        fontSize:{xs:16, md:20},
                                        fontFamily:'Montserrat, sans-serif',
                                    }}
                                >
                                    One-Time Price
                                </Typography>

                                <Typography
                                    variant='body2'
                                    sx={{
                                        color:otpPriceError ? colors.error.main : '#737373',
                                        fontWeight:500,
                                        fontSize:{xs:15, md:17},
                                        fontFamily:'Montserrat, sans-serif',
                                    }}
                                >
                                    {otpPriceError ? (`Price must be $1-$1000.`) : <>Recommended (around): <span style={{ color: colors.gradients.info.main }}>$15</span></>}
                                </Typography>
                            </MKBox>

                            <MKBox
                                sx={{
                                    ml:'auto',
                                    position:'relative',
                                    width:100,
                                    height:'100%',
                                    display:'flex',
                                    alignItems:'center',
                                    justifyContent:'center',
                                }}
                            >
                                <div style={{cursor:'pointer'}}>
                                    <InputBase
                                        value={oneTimePrice}
                                        error={otpPriceError}
                                        onChange={(e)=> {
                                            if (/^\d+$/.test(e.target.value) || !e.target.value.length) {
                                                setOneTimePrice(e.target.value)
                                                if (parseInt(e.target.value) > 1000) {
                                                    setOtpPriceError(true);
                                                }
                                                else {
                                                    setOtpPriceError(false);
                                                }
                                            }
                                        }}

                                        sx={{
                                            pl:4.5,
                                            pr:2,
                                            pt:.5,
                                            pb:.25,
                                            borderRadius:3,
                                            border:'1px solid #a9a9a9',
                                            backgroundColor:'#f0eeee',
                                            fontFamily:'Montserrat, sans-serif',
                                            fontSize:18,
                                            fontWeight:500,
                                        }}
                                    />
                                </div>
                                <Typography
                                    sx={{
                                        position:'absolute',
                                        left:12,
                                        top:6,
                                        fontWeight:'bold',
                                        color:'#000',
                                        fontFamily:'Montserrat, sans-serif',
                                    }}
                                >
                                    $
                                </Typography>
                            </MKBox>
                        </MKBox>  */}
                    </>
                }
            </MKBox>
        </Box>
    )
}

export default SpacePricing;