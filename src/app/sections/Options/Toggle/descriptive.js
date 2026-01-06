
import './toggle.css'
const { Box, Typography } = require("@mui/material");
const { default: MKButton } = require("components/MKButton");


const DescriptiveToggle = ({
    title,
    description,
    toggled,
    setToggled,
}) => (
    <MKButton
        sx={{
            px:2,
            gap:5,
            width:'100%',
            display:'flex',
            borderRadius:2,
            border:`2px solid #${toggled?'000':'ededed'}`,
            '&:active':{
                scale:.99,
            },
            '&:hover':{
                border:`2px solid #${toggled?'000':'ababab'}`,
            }
        }}
        onClick={() => setToggled(!toggled)}
    >
        <Box
            sx={{
                gap:.5,
                width:'100%',
                display:'flex',
                flexDirection:'column',
                justifyContent:'start',
            }}
        >
            <Typography
                sx={{
                    color:'#000',
                    fontSize:{xs:'1rem',lg:'1.25rem'},
                    fontWeight:550,
                    textAlign:'left',
                }}
            >
                {title}
            </Typography>
            <Typography
                sx={{
                    color:'#737373',
                    lineHeight:'20px',
                    textAlign:'left',
                    fontSize:{xs:'.8rem',lg:'1rem'},
                    fontWeight:450,
                }}
            >
                {description}
            </Typography>
        </Box>
        <div className="container" >
            <div className={`switch ${toggled ? "checked" : ""}`}>
                <span className="slider"></span>
            </div>
        </div>
        
    </MKButton>
)

export default DescriptiveToggle