import { ArrowDownward, ArrowUpward, ExpandLess, ExpandMore, KeyboardArrowDown } from "@mui/icons-material";
import { Box, Button, Icon, Tab, Tabs, Typography, useMediaQuery } from "@mui/material";
import AdaptiveModal from "app/sections/Modal/Adaptive";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import { useEffect, useState } from "react";
import Price_Filter from "./price";
import Hr from "app/utils/Hr";
import Size_Filter from "./size";
import { useFilters } from "./context";
import Type_Filter from "./type";
import colors from "assets/theme/base/colors";
import Features_Filter from "./features";
import { SpecificationsEnum } from "app/utils/optimize/utils";
import { getConformingListings } from "app/utils/listings/utils";
import AccessTime_Filter from "./accessTime";
import { TimeOfDayAccessTypes } from "app/utils/optimize/utils";
import { AccessFrequencyTypes } from "app/utils/optimize/utils";
import AccessFrequency_Filter from "./accessFreq";

const Filters = ({listings, onClose}) => {
    const {
        old,
        filters,
        setFilters,
        previews,
        setPreviews,
        apply,
        reset,
    } = useFilters();

    const [tab, setTab] = useState(0);

    const handleApply = () => {
        apply();
        onClose();
    }

    const handleReset = () => {
        reset();
        onClose();
    }

    useEffect(() => {
        setPreviews(filters);
    }, [])

    return (
        <Box
            sx={{
                px:1,
                display:'flex',
                flexDirection:'column',
            }}
        >
            <Tabs
                value={tab}
                onChange={(e, v) => {
                    setTab(v);
                }}
                sx={{
                    width:'calc(100% + 16px)',
                    ml:-1,
                    mb:2,
                }}
            >
                <Tab sx={{width:'100%'}} label='Basic'/>
                <Tab sx={{width:'100%'}} label='Advanced' />
            </Tabs>
            
            {tab === 0 && <>
                <Typography
                    sx={{
                        my:1,
                        fontSize:'1rem',
                        fontWeight:500,
                        color:'#000',
                        display:'flex',
                        alignItems:'center',
                        gap:.5,
                    }}
                >
                    Price<span style={{color:'#737373', fontSize:'.75rem',marginBottom:-2,}}>(${previews[0]?.min} - ${previews[0]?.max})</span>
                </Typography>
                <Price_Filter />
                <Hr sx={{mt:{xs:1,lg:1.5},mb:2.5}}/>
                <Typography
                    sx={{
                        mb: 2,
                        fontSize: '1rem',
                        fontWeight: 500,
                        color: '#000',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                    }}
                >
                    Types 
                    <span
                        style={Styles.LongContentSpan}
                    >
                        {(() => {
                            const activeTypes = Object.keys(previews[2]).filter(key => previews[2][key]).map(key => key.replaceAll('_', ' '))
                            return activeTypes.length > 0 ? `(${activeTypes.join(', ')})` : '(None selected)';
                        })()}
                    </span>
                </Typography>

                <Type_Filter />
                <Hr sx={{mt:1,mb:2.5}} />

                <Typography
                    sx={{
                        mb: 2,
                        fontSize: '1rem',
                        fontWeight: 500,
                        color: '#000',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                    }}
                >
                    Features 
                    <span
                        style={Styles.LongContentSpan}
                    >
                        {(() => {
                            const activeSpecs = Object.keys(SpecificationsEnum)
                                .filter(key => (SpecificationsEnum[key] & previews[3]) !== 0)
                                .map(key => key.replaceAll('_', ' '));

                            return activeSpecs.length > 0 ? `(${activeSpecs.join(', ')})` : '(None selected)';
                        })()}
                    </span>
                </Typography>

                <Features_Filter />
            </>}

            {tab === 1 && <div style={{marginTop:8}}>
                <Size_Filter />

                <Hr sx={{mt:1,mb:2.5}} />

                <Typography
                    sx={{
                        mb: 2,
                        fontSize: '1rem',
                        fontWeight: 500,
                        color: '#000',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                    }}
                >
                    Access Frequency 
                    <span
                        style={Styles.LongContentSpan}
                    >
                        {(() => {
                            const activeTimes = previews[4].map(idx => AccessFrequencyTypes[idx]);

                            return activeTimes.length > 0 ? `(${activeTimes.join(', ')})` : '(None selected)';
                        })()}
                    </span>
                </Typography>

                <AccessFrequency_Filter />

                <Hr sx={{mt:1,mb:2.5}} />

                <Typography
                    sx={{
                        mb: 2,
                        fontSize: '1rem',
                        fontWeight: 500,
                        color: '#000',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                    }}
                >
                    Access Times 
                    <span
                        style={Styles.LongContentSpan}
                    >
                        {(() => {
                            const activeTimes = previews[5].map(idx => TimeOfDayAccessTypes[idx]);

                            return activeTimes.length > 0 ? `(${activeTimes.join(', ')})` : '(None selected)';
                        })()}
                    </span>
                </Typography>

                <AccessTime_Filter />
            </div>}

            <Box
                sx={{
                    p:2,
                    pb:0,
                    mt:2,
                    ml:-3,
                    borderTop:'1px solid #ededed',
                    minWidth:'calc(100% + 48px)',
                    gap:2,
                    display:'flex',
                    alignItems:'center',
                }}
            >
                <Button
                    sx={{
                        ...Styles.ActionButton,
                        bgcolor:'#efefef !important',
                        color:'#737373 !important',
                    }}
                    onClick={handleReset}
                >
                    Reset
                </Button>
                <Button
                    sx={{
                        ...Styles.ActionButton,
                        bgcolor:`${colors.info.main} !important`,
                        color:'#fff !important',
                    }}
                    onClick={handleApply}
                >
                    {(() => {
                        const cl = getConformingListings(listings, previews);

                        return `Show ${cl} listing${cl!==1?'s':''}`
                    })()}
                </Button>
            </Box>
        </Box>
    )
}

export default Filters;

const Styles = {
    FilterButton: {
        pl:2,
        gap:1,
        pr:1.5,
        py:1.25,
        minHeight:0,
        fontWeight:550,
        display:'flex',
        borderRadius:4,
        fontSize:'1rem',
        alignItems:'center',
        color:'#737373 !important',
        border: '1px solid #efefef !important',
        boxShadow: '0px 2px 2px rgba(0,0,0,0.05)',
    },
    ActionButton: {
        px:2,
        py:1.5,
        width:'100%',
        fontWeight:550,
        fontSize:'1rem',
    },
    LongContentSpan: {
        marginTop:2,
        color: '#737373',
        fontSize: '.75rem',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        flex: 1,
        display: 'block',
        minWidth: 0,
    }
}