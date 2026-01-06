import CustomSlider from "app/sections/Options/CustomSlider";
import { useFilters } from "./context";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import Hr from "app/utils/Hr";
import MKButton from "components/MKButton";
import { useEffect, useState } from "react";
import { CommonFooter } from "./common";
import { Box } from "@mui/material";

const Price_Filter = ({onClose}) => {
    const {
        filters,
        setFilters,
        previews,
        setPreviews,
    } = useFilters();

    const handleChange = (e, nval) => {
        setPreviews((prev) => ({
            ...prev,
            0:{min:nval[0],max:nval[1]}
        }))
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
            <MKBox
                sx={{
                    width:'95%',
                }}
            >
                <CustomSlider
                    value={[previews[0]?.min, previews[0]?.max]}
                    onChange={handleChange}
                    min={0}
                    max={1000}
                    step={10}
                />
            </MKBox>
        </Box>
    )
}

Price_Filter.info = {
    title:"Price",
}

export default Price_Filter;