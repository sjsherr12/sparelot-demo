import { Box, Icon, Typography } from "@mui/material";
import { useUserAuthState } from "app/backend/user/auth/reactprovider";
import BlockedUser from "./blockedUser";
import { DisabledTypography } from "app/pages/mobile/Hosting/common";
import { BlockOutlined } from "@mui/icons-material";

const BlockedUsers = () => {
    const {userImpl} = useUserAuthState();

    return (
        <Box
            sx={{
                px:2,
                gap:2,
                display:'flex',
                flexDirection:'column',
            }}
        >
            {userImpl?.extra?.blocked?.length?
                (
                    <>
                        {userImpl?.extra?.blocked?.map((bu, idx) => (
                            <BlockedUser 
                                key={idx}
                                blockedUserId={bu}
                            />
                        ))}
                    </>
                ) : (
                    <Typography
                        sx={DisabledTypography}
                    >
                        You have not blocked any users.
                    </Typography>
                )
            }
        </Box>
    )
}

export default BlockedUsers;