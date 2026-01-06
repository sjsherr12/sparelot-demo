import { CloseSharp, MoreHoriz } from "@mui/icons-material";
import { Box, IconButton, InputBase, styled, Typography } from "@mui/material";
import Hr from "app/utils/Hr";
import colors from "assets/theme/base/colors";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import { useState } from "react";
import { Sheet } from "react-modal-sheet";

const bullet_points = [
    'What items would fit well in this space?',
    'What constraints do you want renters to know about?',
    'Is there anything special or great about your space?',
]

const SpaceDescription = ({spaceDescription, setSpaceDescription, setWordCount}) => {
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);
    const handleChange = (event) => {
        const value = event.target.value;
        const words = value.trim().split(/\s+/).filter(word => word.length > 0); // Filter out empty strings
        const count = words.length;

        setWordCount(count);
        setSpaceDescription(value);

        if (count < 10) {
            setError('Minimum of 10 words required.');
        } else if (value.length >= 500) {
            setError('Maximum of 500 characters allowed.');
        } else {
            setError('');
            setSpaceDescription(value);
        }
    };

    return (
        <Box
            sx={{
                mt:2,
                mb:4,
                width: "100%",
                maxWidth: 600,
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}
        >
            <Typography
                sx={{
                    color: "#000",
                    fontSize: { xs: "1.25rem", lg: "2rem" },
                    fontWeight: 550,
                    textAlign: "center",
                    lineHeight: '25px',
                }}
            >
                Space Description
            </Typography>
            <Typography
                sx={{
                    color: "#737373",
                    fontSize: { xs: "1rem", lg: "1.25rem" },
                    fontWeight: 500,
                    textAlign: "center",
                }}
            >
                A summary helping renters know what to expect
            </Typography>

            <Hr sx={{mb:1}}/>

            <InputBase
                minRows={5}
                multiline
                inputProps={{
                    maxLength:500,
                }}
                onChange={handleChange}
                placeholder="Enter your description here..."
                value={spaceDescription}
                sx={{
                    border:'1px solid #a6a6a6',
                    borderRadius:4,
                    width:'100%',
                    padding:2,
                    fontSize:20,
                }}
            />
            {error && (
                <Typography
                    sx={{
                        mt:-1.5,
                        color:'#f00',
                        fontSize:{xs:'.875rem',lg:'1rem'},
                    }}
                >
                    {error}
                </Typography>
            )}
        </Box>
    )
}

export default SpaceDescription;