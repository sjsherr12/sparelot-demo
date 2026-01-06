import { InputBase } from "@mui/material";
import Hr from "app/utils/Hr";
import colors from "assets/theme/base/colors";
import { useState } from "react";

const { default: MKBox } = require("components/MKBox")
const { default: MKTypography } = require("components/MKTypography")

const SpaceCapacity = ({rentingCapacity, setRentingCapacity}) => {
    
    const [capacityError, setCapacityError] = useState(false);
    
    return (
        <MKBox
            id='toplevel'
            sx={{
                width:'100%'
            }}
        >
            <MKTypography
                variant='h2'
                sx={{
                    color:'#000',
                    mt:3,
                    fontFamily:'Montserrat, sans-serif',
                }}
            >
                Space Capacity
            </MKTypography>
            <MKTypography
                variant='h5'
                sx={{
                    my:1.5,
                    color:'#737373',
                    fontWeight:500,
                    fontFamily:'Montserrat, sans-serif',
                }}
            >
                Hosts listing an eligible space (parking lot or parking structure) use space capacity to indicate the number of parking spots available without creating multiple listings. This allows multiple different reservations to be active at the same time up to your specified amount. If you choose to edit your renting capacity, please be precise with your exact capacity, as overestimating can cause conflicts between renters.
            </MKTypography>

            <Hr/>

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
                    <MKTypography
                        variant='h5'
                        sx={{
                            color:'#000',
                            fontWeight:500,
                            fontSize:{xs:16, md:20},
                            fontFamily:'Montserrat, sans-serif',
                        }}
                    >
                        Maximum Capacity
                    </MKTypography>

                    <MKTypography
                        variant='body2'
                        sx={{
                            color:capacityError?colors.error.main:'#737373',
                            fontWeight:500,
                            fontSize:{xs:15, md:17},
                            fontFamily:'Montserrat, sans-serif',
                        }}
                    >
                        {capacityError ? 'Capacity must be from 0-500 renters.':'Please be extremely precise with this value.'}
                    </MKTypography>
                </MKBox>

                <MKBox
                    sx={{
                        ml:'auto',
                        position:'relative',
                        width:70,
                        height:'100%',
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center',
                    }}
                >
                    <InputBase
                        value={rentingCapacity}
                        onChange={(e)=> {
                            if (!e.target.value || (/^\d+$/.test(e.target.value) && e.target.value.length < 4)) {
                                setRentingCapacity(e.target.value)
                                const val = parseInt(e.target.value);
                                if (val > 500 || val < 1) {
                                    setCapacityError(true);
                                }
                                else {
                                    setCapacityError(false);
                                }
                            }
                        }}
                        inputProps={{
                            maxLength:4,
                        }}
                        error={true}
                        sx={{
                            px:2,
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
                </MKBox>
            </MKBox>

            <Hr/>
        </MKBox>
    )
}

export default SpaceCapacity;