import CustomSlider from "app/sections/Options/CustomSlider";
import { useFilters } from "./context";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import Hr from "app/utils/Hr";
import MKButton from "components/MKButton";
import { useEffect, useState } from "react";
import { CommonFooter } from "./common";
import { Box, Typography } from "@mui/material";

const Size_Filter = () => {
    const {
        filters,
        setFilters,
        previews,
        setPreviews,
    } = useFilters();

    const handleWidthChange = (e, nval) => {
        setPreviews((prev) => ({
            ...prev,
            1:{
                ...prev[1],
                width:nval,
            }
        }));
    }

    const handleLengthChange = (e, nval) => {
        setPreviews((prev) => ({
            ...prev,
            1:{
                ...prev[1],
                length:nval,
            }
        }));
    }

    return (
        <Box
            sx={{
                width:'100%',
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
            }}
        >
            <Typography
                sx={{
                    mb:1,
                    fontSize:'1rem',
                    fontWeight:500,
                    color:'#000',
                    textAlign:'left',
                    width:'100%',
                }}
            >
                Width <span style={{color:'#737373', fontSize:'.875rem',}}>({previews[1]?.width} ft)</span>
            </Typography>
            <Box
                sx={{
                    width:'95%',
                }}
            >
                <CustomSlider
                    value={[previews[1]?.width]}
                    onChange={handleWidthChange}
                    min={0}
                    max={500}
                    step={1}
                />
            </Box>
            <Typography
                sx={{
                    mb:1,
                    fontSize:'1rem',
                    fontWeight:500,
                    color:'#000',
                    textAlign:'left',
                    width:'100%',
                }}
            >
                Length <span style={{color:'#737373', fontSize:'.875rem',}}>({previews[1]?.length} ft)</span>
            </Typography>
            <Box
                sx={{
                    width:'95%',
                }}
            >
                <CustomSlider
                    value={[previews[1]?.length]}
                    onChange={handleLengthChange}
                    min={0}
                    max={500}
                    step={1}
                />
            </Box>
        </Box>
    )
}

Size_Filter.info = {
    title:"Size",
}

export default Size_Filter;