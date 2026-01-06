import { Remove, RemoveCircleOutline } from "@mui/icons-material";
import { Avatar, Box, Button, IconButton, Skeleton, Tooltip, Typography } from "@mui/material";
import { getUser } from "app/backend/db/user";
import { BlockMenuItem } from "app/sections/More";
import { MoreOptionsMenu } from "app/sections/More";
import { makeUsernameAbbreviated } from "app/utils/listings/utils";
import colors from "assets/theme/base/colors";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BlockedUser = ({blockedUserId}) => {

    const [loading, setLoading] = useState(false);
    const [blockedUser, setBlockedUser] = useState(null);
    const [moreOptionsMenu, setMoreOptionsMenu] = useState(false);
    const [menuAlign, setMenuAlign] = useState(null);

    useEffect(() => {
        const get_blocked_user_info = async () => {
            setLoading(true);
            if (blockedUserId && !blockedUser) {
                const blockedUser_res = await getUser(blockedUserId);
                setBlockedUser(blockedUser_res)
            }
            setLoading(false);
        }
        get_blocked_user_info();
    }, [])

    return (
        <>
            <Box
                sx={{
                    py:2,
                    gap:2,                    
                    display:'flex',
                    alignItems:'center',
                    borderBottom:'1px solid #ededed',
                }}
            >
                <Avatar
                    sx={{
                        width:48,
                        height:48,
                        boxShadow:1,
                        '& img':{
                            objectFit:'cover',
                            width:'100%',
                            height:'100%',
                            objectFit:'cover',
                            userDrag: 'none',
                            WebkitUserDrag: 'none'
                        },
                    }}
                    src={blockedUser?.profile?.avatar}
                />
                <Box
                >
                    <Typography
                        sx={{
                            fontSize:'1rem',
                            color:'#000',
                            fontWeight:550,
                        }}
                    >
                        {loading ? 
                            <>
                                <Skeleton width={100} height={25} animation='wave'/>
                            </>
                            :
                            makeUsernameAbbreviated(blockedUser)
                        }
                    </Typography>
                    <Typography
                        sx={{
                            fontSize:'.875rem',
                            color:'#333',
                            fontWeight:500,
                        }}
                    >
                        {loading ? 
                            <>
                                <Skeleton width={200} height={20} animation='wave'/>
                            </>
                            :
                            <>
                                {`${blockedUser?.hosting?.signUpDate? 'Hosting since ' + (new Date(blockedUser.hosting.signUpDate)).getFullYear() : 'Renter on SpareLot'}`}
                            </>
                        }
                    </Typography>
                </Box>
                <Button
                    disabled={loading}
                    sx={{
                        ml:'auto',
                        borderRadius:2,
                        px:2,
                        py:.75,
                        minHeight:'unset',
                        color:'#fff !important',
                        bgcolor:`${colors.info.main} !important`,
                        fontSize:'1rem',
                        fontWeight:500,
                    }}
                    onClick={() => setMoreOptionsMenu(true)}
                >
                    Unblock
                </Button>
            </Box>

            <MoreOptionsMenu
                open={moreOptionsMenu}
                onClose={() => setMoreOptionsMenu(false)}
                menuAlign={menuAlign}
            >
                <BlockMenuItem targetUserId={blockedUserId} autoCallonClick/>
            </MoreOptionsMenu>
        </>
    )
}

export default BlockedUser;