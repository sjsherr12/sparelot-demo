const { Box, Icon, Typography } = require("@mui/material")

const Filler = ({
    LargeIcon,
    title,
    desc,
    sx,
    childsx,
    titlesx,
    descsx,
}) => {
    return (
        <Box
            sx={{
                width:'100%',
                display:'flex',
                justifyContent:'center',
            }}
        >
            <Box
                sx={{
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    height:'100%',
                    pt: 5,
                    px:4,
                    pb:3,
                    minWidth:300,
                    maxWidth:'100%',
                    height: 'fit-content',
                    borderRadius:2,
                    border:'1px dashed #737373', 
                    ...sx,
                }}
            >
                <Box
                    sx={{
                        display:'flex',
                        width:'100%',
                        alignItems:'center',
                        justifyContent:'center',
                        flexDirection:'column',
                        ...childsx,
                    }}
                >
                    <Icon
                        sx={{
                            scale:2.5,
                            height:'fit-content',
                        }}
                    >
                        <LargeIcon />
                    </Icon>

                    <Typography
                        sx={{
                            mt:2,
                            mb:1,
                            textAlign:'center',
                            fontWeight:550,
                            fontSize:'1.25rem',
                            ...titlesx,
                            whiteSpace:'nowrap',
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography
                        sx={{
                            color:'#737373',
                            textAlign:'center',
                            fontWeight:440,
                            fontSize:'.9rem',
                            ...descsx
                        }}
                    >
                        {desc}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default Filler;