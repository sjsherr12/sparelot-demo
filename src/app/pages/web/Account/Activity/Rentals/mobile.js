import ActiveRentals from "./active";

const { Box, Typography } = require("@mui/material");
const { default: isStandalone } = require("isStandalone");

const ActiveRentalsMobileShortcut = () => (
    <>
        <Box
            sx={{
                px:2,
                mb:3,
                pt:{xs:0,lg:3},
                pb:{xs:0,lg:1},
                height: {xs:75,lg:'fit-content'},
                display: 'flex',
                fontSize: 20,
                position:'relative',
                top:0,
                left:0,
                bgcolor:'#fff',
                width:'100%',                
                alignItems: 'center',
                borderBottom: '1px solid #ededed',
            }}
        >
            <Typography variant="h3">Space Rentals</Typography>
        </Box>
        <ActiveRentals />
    </>
)

export default ActiveRentalsMobileShortcut;