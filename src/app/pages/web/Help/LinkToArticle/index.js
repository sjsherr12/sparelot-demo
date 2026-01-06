import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import { Link } from "react-router-dom";

const { default: LineSplitter } = require("app/sections/Extra/Display/LineSplit");

const LinkToArticle = ({ title, link, description }) => {
    return (
        <Link to={link} style={{ textDecoration: 'none', color: 'inherit' }}>
            <MKBox
                sx={{
                    pt: 1,
                    '&:hover': {
                        cursor: 'pointer',
                        backgroundColor: 'rgba(0,0,0,0.075)',
                        transition: 'background-color 0.25s ease-in',
                    },
                    transition: 'background-color 0.25s ease-in',
                }}
            >
                <MKBox
                    sx={{
                        '&:hover': {
                            ml: 1.5,
                            transition: 'margin 0.25s ease-in-out',
                        },
                        transition: 'margin 0.25s ease-in-out',
                    }}
                >
                    <MKTypography
                        variant='h4'
                        sx={{
                            mb: 1,
                            color: '#000',
                            fontFamily: "Montserrat, sans serif",
                        }}
                    >
                        {title}
                    </MKTypography>

                    <MKTypography
                        sx={{
                            mb: 1,
                            fontFamily: "Montserrat, sans serif",
                        }}
                    >
                        {description}
                    </MKTypography>
                </MKBox>

                <LineSplitter />
            </MKBox>
        </Link>
    );
};

export default LinkToArticle;
