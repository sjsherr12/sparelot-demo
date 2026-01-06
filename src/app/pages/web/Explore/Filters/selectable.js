import { Box, Button, Icon, Typography } from "@mui/material";
import colors from "assets/theme/base/colors";

const FilterSelectable = ({
    CIcon,
    label,
    selected,
    onToggle,
}) => (
    <Typography
        sx={{
            pl:CIcon?{xs:1,lg:1.5}:2,
            pr:2,
            py:{xs:.25,lg:.75},
            gap:.5,
            display:'flex',
            borderRadius:8,
            fontWeight:{xs:500,lg:450},
            fontSize:{xs:'.75rem',lg:'1rem'},
            cursor:'pointer',
            userSelect:'none',
            alignItems:'center',
            '&:active':{scale:.9},
            transition:'all .05s ease-in-out',
            color:`#${selected?'000':'737373'}`,
            border:`1px solid #${selected?'000':'ababab'}`,
            outline:`1px solid #${selected?'000':'fff'}`,
            '&:hover':{bgcolor:'#efefef'},
            whiteSpace:'nowrap',
        }}
        onClick={onToggle}
    >
        {CIcon && 
            <Icon
                sx={{
                    width:25,
                    height:25,
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                }}
            >
                <CIcon />
            </Icon>
        }
        
        {label?.replaceAll('_', ' ')}
    </Typography>
)

export default FilterSelectable;