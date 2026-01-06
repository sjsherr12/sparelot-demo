import { useTheme } from "@emotion/react";
import { TextField, Typography, useMediaQuery } from "@mui/material";
import colors from "assets/theme/base/colors";

const StorageRequestDescription = ({
    storageDescription,
    setStorageDescription
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'))
    return (<>
        <Typography
            sx={{
                mb:2,
                color:'#737373',
                fontSize:'.875rem',
                fontWeight:500,
            }}
        >
            Please describe what items you plan on storing and how you plan on storing them.
        </Typography>
        <TextField
            autoFocus={!isMobile}
            value={storageDescription}
            onChange={(e) => setStorageDescription(e.target.value)}
            placeholder='Describe what you are storing...'
            multiline
            inputProps={{
                maxLength:500,
            }}
            FormHelperTextProps={{
                sx: {
                    ml:0.25,
                    color:storageDescription?.length === 500 ? '#f00' : storageDescription?.length >= 450 ? colors.warning.main : '#737373',
                }
            }}
            helperText={storageDescription?.length >= 400 ? `${storageDescription?.length}/500 words` : ''}
            minRows={5}
            sx={{
                mb:1,
                width:'100%',
            }}
        />
    </>)
}

export default StorageRequestDescription;