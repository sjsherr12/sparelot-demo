import { Box, InputBase, styled, Typography } from "@mui/material";
import Hr from "app/utils/Hr";
import colors from "assets/theme/base/colors";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import { useState } from "react";

const Unit = styled(Typography)`
    color:#000;
    font-weight:600;
    position:absolute;
    bottom:12px;
    right:12px;
`

const InputStyle = {
    px:2,
    py:1,
    border:'1px solid #000',
    borderRadius:2,
    width:'100%',
    fontWeight:500,
    fontFamily:'Inter, sans-serif',
    fontSize:20,
}

const SpaceDimensions = ({width, setWidth, length, setLength, height, setHeight, spaceType}) => {
    const [badInputError, setBadInputError] = useState(false);
    
    const sets = {
        setWidth,
        setLength,
        setHeight,
    }

    const checkForBadValue = (e) => {
        const value = parseInt(e.target.value.replace(/\D/g, ''))
        const id = e.target.id;
        const setter = `set${id.capitalize()}`
        sets[setter]((!isNaN(value)) ? value : 0)
        if (value <= 0 || value > 500) {
            setBadInputError(true);
        }
        else {
            setBadInputError(false);
        }
    }

    return (
        <Box
            sx={{
                mt:2,
                mb:4,
                width: "100%",
                maxWidth: 600,
                display: "flex",
                flexDirection: "column",
                gap: 2,
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
                Space Dimensions
            </Typography>
            <Typography
                sx={{
                    color: "#737373",
                    fontSize: { xs: "1rem", lg: "1.25rem" },
                    fontWeight: 500,
                    textAlign: "center",
                }}
            >
                Try to measure accurately. This will help renters know if their items will fit.
            </Typography>

            {(spaceType == 'Parking_garage' || spaceType == 'parking_lot') && (
                <MKTypography
                    variant='h5'
                    sx={{
                        mt:0.5,
                        color:'#b5b5b5',
                        fontWeight:470,
                        fontFamily:'Montserrat, sans-serif',
                        fontSize:15,
                    }}
                >
                    *If listing a parking structure or parking lot, estimate dimensions of the entire space (main floor), not one spot.
                </MKTypography>
            )}

            <Hr />

            <Typography
                variant='h5'
                sx={{
                    mb:-1.5,
                    color:'#000',
                    fontWeight:500,
                }}
            >
                Length
            </Typography>
            <div style={{position:'relative'}}>
                <InputBase
                    type='tel'
                    id='length'
                    sx={InputStyle}
                    value={length}
                    onChange={checkForBadValue}
                />
                <Unit
                >
                    ft
                </Unit>
            </div>

            <Typography
                variant='h5'
                sx={{
                    mb:-1.5,
                    color:'#000',
                    fontWeight:500,
                }}
            >
                Width
            </Typography>

            <div style={{position:'relative'}}>
                <InputBase
                    type='tel'
                    id='width'
                    sx={InputStyle}
                    value={width}
                    onChange={checkForBadValue}
                />
                <Typography
                    sx={{
                        color:'#000',
                        fontWeight:600,
                        position:'absolute',
                        bottom:12,
                        right:12,
                    }}
                >
                    ft
                </Typography>
            </div>

            <Typography
                variant='h5'
                sx={{
                    mb:-1.5,
                    color:'#000',
                    fontWeight:500,
                }}
            >
                Height (optional)
            </Typography>

            <div style={{position:'relative'}}>
                <InputBase
                    type='tel'
                    id='height'
                    sx={InputStyle}
                    value={height}
                    onChange={checkForBadValue}
                />
                <Unit
                >
                    ft
                </Unit>
            </div>

            {badInputError &&
                <MKTypography
                    variant='h6'
                    sx={{
                        my:2,
                        fontWeight:500,
                        color:colors.error.main,
                        fontFamily:'Montserrat, sans-serif',
                    }}
                >
                    Each dimension must be between 0-500ft.
                </MKTypography>
            }
        </Box>
    )
}

export default SpaceDimensions;