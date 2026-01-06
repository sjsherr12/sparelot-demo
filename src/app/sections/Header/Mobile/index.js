import { ArrowBackIosNew } from "@mui/icons-material"
import { Icon } from "@mui/material"
import zIndex from "@mui/material/styles/zIndex"
import { useNavigate } from "react-router-dom"

const { default: colors } = require("assets/theme/base/colors")
const { default: MKBox } = require("components/MKBox")
const { default: MKTypography } = require("components/MKTypography")

const MobileHeader = ({header, noBack, customBack}) => {
    const navigate = useNavigate();
    return (
        <>
            <MKBox
                sx={{
                    width:'100%',
                    height:'50px',
                    backgroundColor: colors.background.theme,

                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    textAlign:'center',

                    top:0,
                    left:0,
                    zIndex:1,
                    fontSize:22,
                }}
            >
                <Icon
                    sx={{
                        position:'absolute',
                        top:0,
                        left:0,
                        width:30,
                        height:'100%',
                        color:'#fff',
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center',
                    }}
                    
                >
                    { !noBack && 
                        <ArrowBackIosNew fontSize='inherit' onClick={() => {
                            if (customBack !== null) {
                                if (typeof customBack === 'string') {
                                    navigate(customBack)
                                }
                                else {
                                    customBack();
                                }
                            }
                            else {
                                navigate(-1)
                            }
                        }}/>
                    }
                </Icon>
                <MKTypography
                    sx={{
                        userSelect:'none',
                        fontFamily:'Montserrat, sans serif',
                        color:'#fff',
                        fontWeight:500,
                        fontSize:'18px',
                        textTransform:'uppercase'
                    }}
                >
                    {header}
                </MKTypography>
            </MKBox>
        </>
    )
}

export default MobileHeader;