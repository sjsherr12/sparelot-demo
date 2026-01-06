import { Typography } from "@mui/material";
import colors from "assets/theme/base/colors";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";

const IconicTextCard = ({title, text, image, width, height}) => {
    return (
        <>
            <MKBox
                sx={{
                    borderRadius:4,
                    backgroundColor:colors.white.main,
                    boxShadow: 4,
                    display:'block',
                    textAlign:'center',
                    width:'100%',
                    p:{xs:'30px 25px', md:'45px 30px'},
                    mb:4,
                    '&:hover':{
                        backgroundColor:'#eee',
                        cursor:'pointer',
                        transition:'all 0.25s ease-out'
                    },
                    transition:'all 0.25s ease-out'
                }}
            >
                <MKBox
                    sx={{
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center',
                        width:'100%',
                    }}
                >
                    <img 
                        src={image}
                        style={{
                            width:width,
                            height:height,
                            marginBottom:'26px'
                        }}
                    />
                </MKBox>

                <Typography
                    variant='h1'
                    sx={{

                        color:'#000',
                        fontSize:{xs:'34px', md:'42px'}
                    }}
                >
                    {title}
                </Typography>

                <Typography
                    variant='body1'
                    sx={{

                        fontSize:{xs:'17px', md:'20px'},
                        mt:{xs:3, md:3},
                        color:'#5a5a5a',
                        fontWeight:'520'
                    }}
                >
                    {text}
                </Typography>
            </MKBox>
        </>
    )
}

export default IconicTextCard;