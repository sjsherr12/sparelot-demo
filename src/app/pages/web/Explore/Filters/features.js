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
import { specificationToIcon } from "const";
import { SpecificationsEnum } from "app/utils/optimize/utils";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const Features_Filter = ({onClose}) => {
    const {
        filters,
        setFilters,
        previews,
        setPreviews,
    } = useFilters();

    const isMobile = useMediaQuery('(max-width:991px)')
    const [collapsed, setCollapsed] = useState(false);

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
                maxHeight:collapsed?'500px':'170px',
                transition:'all .25s ease-in-out',
                overflow:'hidden',
                flexWrap: { xs: 'nowrap', lg: 'wrap' }, // Add this line
                overflowX: { xs: 'auto', lg: 'hidden' },
            }}
        >
            {Object.entries(SpecificationsEnum).slice(0,collapsed||isMobile?SpaceTypesExtraInfo?.length:5).map(([key, value]) => (
                <FilterSelectable
                    key={key}
                    CIcon={() => (
                        specificationToIcon[`${key}`]
                    )}
                    label={`${key}`}
                    selected={Boolean(previews[3] & value)}
                    onToggle={() => {
                        if (previews[3] & value) {
                            setPreviews((prev) => ({
                                ...prev,
                                3:prev[3] ^ value,
                            }))
                        }
                        else {
                            setPreviews((prev) => ({
                                ...prev,
                                3:prev[3] | value,
                            }))
                        }
                    }}
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

export default Features_Filter;