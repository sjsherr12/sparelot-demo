import { FolderSpecial, OpenInNew } from "@mui/icons-material";
import { Box, Container, Icon, Typography } from "@mui/material";
import colors from "assets/theme/base/colors";
import MKButton from "components/MKButton";
import conditionalNavigation from "conditionalNavigation";

const { default: MKBox } = require("components/MKBox");
const { default: MKTypography } = require("components/MKTypography");
const { useParams, useNavigate, Link } = require("react-router-dom")

const CreateFinish = ({
    DisplayIcon,
    title,
    desc,
    goto,
    gotoURL,
}) => {

    const navigate = useNavigate();

    return (
        <Box
            sx={{
                px:2,
                py:1,
                gap:1,
                width:'100%',
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
            }}
        >
            <Icon
                sx={{
                    mb:2,
                    width:150,
                    height:125,
                    color:'#333',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                }}
            >
                <DisplayIcon sx={{scale:10}}/>
            </Icon>
            <Typography
                sx={{
                    textAlign:'center',
                    color:'#333',
                    fontSize:'1.75rem',
                    fontWeight:650,
                }}
            >
                {title}
            </Typography>
            <Typography
                sx={{
                    textAlign:'center',
                    fontSize:'1rem',
                    fontWeight:500,
                    color:'#737373',
                }}
            >
                {desc}
            </Typography>

            <Box
                sx={{
                    mt:3,
                    width:'100%',
                    display:'flex',
                    flexDirection:{xs:'column',lg:'row-reverse'},
                    gap:2,
                }}
            >
                <MKButton
                    onClick={() => {
                        conditionalNavigation(navigate, gotoURL)
                    }}
                    color='info'
                    sx={{
                        width:'100%',
                        fontSize:'1rem',
                        fontWeight:500,
                    }}
                >
                    {goto}
                </MKButton>
                <MKButton
                    onClick={() => window.history.back()}
                    color='secondary'
                    sx={{
                        width:'100%',
                        fontSize:'1rem',
                        fontWeight:500,
                    }}
                >
                    Back to previous
                </MKButton>
            </Box>
        </Box>
    )
}

export default CreateFinish;