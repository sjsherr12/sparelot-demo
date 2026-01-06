import { Box, Button, Typography } from "@mui/material";
import Hr from "app/utils/Hr";
import colors from "assets/theme/base/colors";
import Price_Sorting from "./price";
import Size_Sorting from "./size";
import { useSorting } from "./context";
import { useEffect } from "react";

const Sorting = ({onClose}) => {

    const {
        previews,
        setPreviews,
        sorting,
        setSorting,
        apply, reset,
    } = useSorting();

    const handleApply = () => {
        apply();
        onClose();
    }

    const handleReset = () => {
        reset();
        onClose();
    }

    useEffect(() => {
        setPreviews(sorting)
    }, [])
    
    return (
        <Box
            sx={{
                px:1,
                gap:3,
                display:'flex',
                flexDirection:'column',
            }}
        >
            <Price_Sorting />
            <Size_Sorting />

            <Box
                sx={{
                    p:2,
                    pb:0,
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
                    Sort Listings
                </Button>
            </Box>
        </Box>
    )
}

export default Sorting;

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