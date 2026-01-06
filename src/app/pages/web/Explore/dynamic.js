import { SearchOff } from "@mui/icons-material";
import { Box, Icon, Typography } from "@mui/material";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import { useNavigate } from "react-router-dom";

const NoListingsAvailable = () => {
    return (
        <Box
            sx={{
                width:'100%',
                height:'100%',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
            }}
        >
            <Box
                sx={{
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'center',
                }}
            >
                <Icon
                    sx={{
                        borderRadius:8,
                        border:'1px solid #ededed',
                        boxShadow:'0px 2px 2px rgba(0,0,0,0.05)',
                        width:48,
                        height:48,
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center',
                    }}
                >
                    <SearchOff />
                </Icon>
                <Typography
                    sx={{
                        mt:2,
                        fontWeight:500,
                        textAlign:'center',
                        fontSize:{xs:'1rem',lg:'1.2rem'},
                    }}
                >
                    No listings available.
                </Typography>
                <Typography
                    sx={{
                        width:'75%',
                        textAlign:'center',
                        fontSize:{xs:'.75rem',lg:'.875rem'},
                        color:'#737373',
                        fontWeight:450,
                    }}
                >
                    Try searching in a different location or changing your filters.
                </Typography>
            </Box>
        </Box>
    )
}

export default NoListingsAvailable;