import { Calculate, CalendarMonth, CalendarMonthOutlined, ContentCopy, ExitToAppOutlined, FingerprintOutlined, Gite, GiteOutlined, Info } from "@mui/icons-material";
import { Avatar, Box, Icon, IconButton, Typography } from "@mui/material";
import { useUserAuthState } from "app/backend/user/auth/reactprovider";
import colors from "assets/theme/base/colors";
import ForwardRoute from "../forward";
import Hr from "app/utils/Hr";

const AboutYourAccount = () => {
    const {user, userImpl} = useUserAuthState();

    return (
        <Box
            sx={{
                width:'100%',
                display:'flex',
                alignItems:'center',
                flexDirection:'column',
            }}
        >
            <Avatar
                src={user?.photoURL}
                sx={{
                    width:{xs:100,lg:128},
                    height:{xs:100,lg:128},
                    objectFit:'cover',
                    '& img':{
                        objectFit:'cover',
                        width:'100%',
                        height:'100%',
                        objectFit:'cover',
                        userDrag: 'none',
                        WebkitUserDrag: 'none'
                    },
                }}
            />

            <Typography
                sx={{
                    mt:2,
                    fontSize:{xs:'1rem',lg:'1.25rem'},
                    color:'#000',
                    fontWeight:600,
                }}
            >
                {user?.displayName}
            </Typography>
            <Typography
                sx={{
                    fontSize:{xs:'.875rem',md:'1rem'},
                    fontWeight:500,
                    color:colors.info.main,
                }}
            >
                {`${userImpl?.hosting?.signUpDate? 'Hosting since ' + (new Date(userImpl.hosting.signUpDate)).getFullYear() : 'Renter on SpareLot'}`}
            </Typography>

            <Box
                sx={{
                    mt:4,
                    width:{xs:'100%',lg:'75%'},
                    display:'flex',
                    flexDirection:'column',
                }}
            >
                <Hr />
                <ForwardRoute
                    rtInf={{
                        name:'Date joined',
                        desc:`${(new Date(user?.metadata?.creationTime)).toLocaleDateString()}`,
                        icon:CalendarMonthOutlined,
                        isNotARoute:true,
                    }}
                />
                <Hr />
                {userImpl?.hosting?.signUpDate && <>
                    <ForwardRoute
                        rtInf={{
                            name:'Started hosting',
                            desc:`${(new Date(userImpl?.hosting?.signUpDate)).toLocaleDateString()}`,
                            icon:GiteOutlined,
                            isNotARoute:true,
                        }}
                    />
                    <Hr />
                </>}
                <ForwardRoute
                    rtInf={{
                        name:'Last Login',
                        desc:`${(new Date(parseInt(user?.metadata?.lastLoginAt))).toLocaleDateString()} • ${(new Date(parseInt(user?.metadata?.lastLoginAt))).toLocaleTimeString()}`,
                        icon:ExitToAppOutlined,
                        isNotARoute:true,
                    }}
                />
                <Hr />
                <Box
                    sx={{
                        display:'flex',
                        alignItems:'center',
                        width:'100%',
                    }}
                >
                    <ForwardRoute
                        rtInf={{
                            name:'Unique user ID',
                            desc:`${user?.uid}`,
                            icon:FingerprintOutlined,
                            isNotARoute:true,
                        }}
                    />
                    <IconButton
                        sx={{
                            mr:1,
                            width:'fit-content',
                            color:'#737373',
                            ml:'auto',
                        }}
                        onClick={async () => {
                            navigator.clipboard.writeText(user?.uid)
                        }}
                    >
                        <ContentCopy />
                    </IconButton>
                </Box>
                <Hr />
            </Box>
        </Box>
    );
}

export default AboutYourAccount;