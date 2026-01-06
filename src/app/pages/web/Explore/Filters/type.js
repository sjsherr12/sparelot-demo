import CustomSlider from "app/sections/Options/CustomSlider";
import { useFilters } from "./context";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import Hr from "app/utils/Hr";
import MKButton from "components/MKButton";
import { useEffect, useReducer, useState } from "react";
import Radio from "@mui/joy/Radio";
import ToggleRadioButton from "app/sections/Options/CustomRadio/ToggleRadioButton";
import { SpaceTypes } from "app/utils/optimize/utils";
import { CommonFooter } from "./common";
import FilterSelectable from "./selectable";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { SpaceTypesExtraInfo } from "app/utils/optimize/utils";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const Type_Filter = ({onClose}) => {
    const {
        filters,
        setFilters,
        previews,
        setPreviews,
    } = useFilters();

    const isMobile = useMediaQuery('(max-width:991px)')
    const [collapsed, setCollapsed] = useState(false);

    const handleChange = (key) => {
        const np = {
            ...previews,
            2: {
                ...previews[2], // Preserve previous keys
                [`${key}`]: !previews[2][key]
            }
        }
        setPreviews(np);
    };

    return (
        <Box
            sx={{
                pl:.15,
                pt:.15,
                ml:-.15,
                mt:-.15,
                pb:2,
                gap: 2,
                display: 'flex',
                alignItems: 'center',
                maxHeight:collapsed?'500px':'150px',
                transition:'all .25s ease-in-out',
                overflow:'hidden',
                flexWrap: { xs: 'nowrap', lg: 'wrap' },
                overflowX: { xs: 'auto', lg: 'hidden' },
            }}
        >
            {SpaceTypesExtraInfo.slice(0,collapsed||isMobile?SpaceTypesExtraInfo?.length:5).map((type, idx) => (
                <FilterSelectable
                    key={idx}
                    CIcon={type.icon}
                    label={type.name}
                    selected={previews[2][type.name]}
                    onToggle={() => handleChange(type.name)}
                />
            ))}
            <Typography
                sx={{
                    ml:1,
                    pl:1,
                    gap:1,
                    color:'#737373',
                    fontWeight:500,
                    display:{xs:'none',lg:'flex'},
                    cursor:'pointer',
                    fontSize:'1rem',
                    width:'fit-content',
                    alignItems:'center',
                    borderBottom:'1px solid #737373',
                }}
                onClick={() => setCollapsed(!collapsed)}
            >
                {
                    collapsed ?

                    <>
                        View less
                        <KeyboardArrowUp />
                    </>
                    
                    :

                    <>
                        View more
                        <KeyboardArrowDown />
                    </>
                }
            </Typography>
        </Box>
    )
}

export default Type_Filter;