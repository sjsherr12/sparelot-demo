import { Avatar, Box, Icon, IconButton, Skeleton, Typography, useMediaQuery } from "@mui/material"
import create_chat_for_users from "app/backend/cloud/create_chat_for_users"
import { useUserAuthState } from "app/backend/user/auth/reactprovider"
import { userauth_actions } from "app/sections/Modal/actions"
import { userauth_title } from "app/sections/Modal/actions"
import { useModal } from "app/sections/Modal/Parent/context"
import { makeTimestampFormatted } from "app/utils/listings/utils"
import { makeUsernameAbbreviated } from "app/utils/listings/utils"
import { LoadingSpinner } from "app/utils/loading/component"
import { SpecificationsEnum } from "app/utils/optimize/utils"
import { TimeOfDayAccessTypes } from "app/utils/optimize/utils"
import colors from "assets/theme/base/colors"
import MKButton from "components/MKButton"
import conditionalNavigation from "conditionalNavigation"
import * as c from "const"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const { MarkChatUnreadOutlined, AccessTimeOutlined, TodayOutlined, CheckCircleOutlineOutlined, MessageOutlined, AccountCircleOutlined, AssignmentInd } = require("@mui/icons-material")
const { AccessFrequencyTypes } = require("app/utils/optimize/utils")

export const ListingAccessingInfo = ({
    loading,
    listing
}) => {
    const isMobile = useMediaQuery('(max-width:1400px)')
    const items = [
        {
            name: 'Access frequency',
            text: `${AccessFrequencyTypes[listing?.display?.accessFrequency || 0 ]} (At Most)`,
            icon: TodayOutlined,
        },
        {
            name: 'Access during',
            text: `${TimeOfDayAccessTypes[listing?.display?.timeOfDayAccess || 0 ]}`,
            icon: AccessTimeOutlined
        },
        {
            name: 'Appointments',
            text: `${listing?.display?.appointmentsRequired ? 'R' : 'Not r'}equired before visits`,
            icon: MarkChatUnreadOutlined,
        },
    ]

    return (
        <Box
            sx={{
                mb:5,
            }}
        >
            <Typography
                sx={{
                    color:'#333',
                    fontWeight:550,
                    fontSize:'1.25rem',
                }}
            >
                Accessing your storage
            </Typography>
            <Box
                sx={{
                    mt:1,
                    width:'100%',
                    display:'flex',
                    alignItems:'center',
                    borderRadius:3,
                    boxShadow:'0px 4px 8px rgba(0,0,0,.1)',
                    border:'1px solid #ededed',
                    flexDirection:{xs:'column',xxl:'row'},
                }}
            >
                {items.map((it, idx) => (
                    <Box
                        sx={{
                            p:{xs:1.5,lg:2},
                            gap:2,
                            width:'100%',
                            display:'flex',
                            alignItems:'center',
                            '&:not(:last-child)':{
                                [isMobile ? 'borderBottom' : 'borderRight']:'1px solid #ededed',
                            }
                        }}
                    >
                        <Icon
                            sx={{
                                width:40,
                                height:40,
                                display:'flex',
                                alignItems:'center',
                                justifyContent:'center',
                                boxShadow:'0px 2px 2px rgba(0,0,0,.2)',
                                border:'1px solid #ededed',
                                borderRadius:8,
                            }}
                        >
                            <it.icon fontSize='medium'/>
                        </Icon>
                        <Box>
                            <Typography
                                sx={{
                                    fontSize:{xs:'.7rem',lg:'.75rem'},
                                    color:'#737373',
                                    fontWeight:500,
                                    lineHeight:'20px',
                                }}
                            >
                                {it.name}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize:{xs:'.75rem',lg:'.875rem'},
                                    color:'#333',
                                    fontWeight:600,
                                    lineHeight:'25px',
                                }}
                            >
                                {loading? (
                                    <Skeleton
                                        width={150}
                                        height='100%'
                                        animation='wave'
                                    />
                                ) : (
                                    <>
                                        {it.text}
                                    </>
                                )}  
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export const ListingSpecificationsDisplay = ({
    listing,
    loading,
}) => {
    return (
        <Box
            sx={{
                mb:5,
            }}
        >
            <Typography
                sx={{
                    color:'#333',
                    fontWeight:550,
                    fontSize:'1.25rem',
                }}
            >
                Listing specifications
            </Typography>
            <Box
                sx={{
                    mt:1,
                    gap:{xs:0,lg:2},
                    p:{xs:0,lg:2},
                    width:'100%',
                    display:'grid',
                    borderRadius:3,
                    border:'1px solid #ededed',
                    boxShadow:'rgba(0, 0, 0, 0.12) 0px 6px 16px',
                    gridTemplateColumns: {
                        xs:'repeat(1, 1fr)',
                        xl:'repeat(2, 1fr)',
                        xxl:'repeat(3, 1fr)',
                    }
                }}
            >
                {Object.entries(SpecificationsEnum).slice(0, loading ? 6 : Object.keys(SpecificationsEnum).length).map(([key, value], index) => (
                    <Box
                        key={key}
                        sx={{
                            gap: 2,
                            display: loading || (listing?.logistics?.specifications & value) ? 'flex' : 'none',
                            border: { xs: 'none', lg: '1px solid #ededed' },
                            alignItems: 'center',
                            px: { xs: 1.5, lg: 1 },
                            py: { xs: 1.25, lg: 1 },
                            '&:not(:last-child)': {
                                borderBottom: '1px solid #ededed !important',
                            },
                            borderRadius: { xs: 0, lg: 16 },
                        }}
                    >
                        <Icon
                            sx={{
                                border: '1px solid #ededed',
                                width: 40,
                                height:40,
                                display: 'flex',
                                borderRadius: 8,
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0px 1px 2px rgba(0,0,0,.2)',
                            }}
                        >
                            {loading && index < 6 ? (
                                <Skeleton variant="circular" width="100%" height="100%" />
                            ) : (
                                c.specificationToIcon[`${key}`]
                            )}
                        </Icon>

                        <Box sx={{ flexGrow: 1 }}>
                            {loading && index < 6 ? (
                                <Skeleton variant="text" width="80%" height="1em" />
                            ) : (
                                <Typography
                                    sx={{
                                        color: '#737373',
                                        fontSize: '.8rem',
                                        fontWeight: 500,
                                    }}
                                >
                                    {`${key}`.replaceAll('_', ' ')}
                                </Typography>
                            )}
                        </Box>

                        <Icon
                            sx={{
                                ml: 'auto',
                                width: 24,
                                height: 24,
                                color: colors.info.main,
                            }}
                        >
                            <CheckCircleOutlineOutlined />
                        </Icon>
                    </Box>
                ))}

            </Box>
        </Box>
    )
}

export const ListingHostInfoDisplay = ({
    host,
    listing,
    loading,
    setViewingHostProfile
}) => {
    const {user} = useUserAuthState();
    const isSmallDesktop = useMediaQuery('(max-width:1200px)')
    const isMobile = useMediaQuery('(max-width:991px)')
    const [contacting, setContacting] = useState(false);
    const { openModal } = useModal();
    const navigate = useNavigate();

    const handleContact = () => {

        if (user) {
            setContacting(true);
            if (!(loading || (listing?.host === user?.uid))) {
                create_chat_for_users({
                    participant1Id: user?.uid,
                    participant2Id: listing?.host,
                }).then(res => {
                    if (!res?.data?.error) {
                        conditionalNavigation(navigate, `/messages/${res?.data?.chatId}`)
                    }
                }).catch(err => {
                    setContacting(false);
                    alert(`${err.message}`)
                })
            }
        }
        else {
            openModal(userauth_title, userauth_actions)
        }
    }
    return (
        <Box
            sx={{
                mb:5,
            }}
        >
            <Typography
                sx={{
                    color:'#333',
                    fontWeight:550,
                    fontSize:'1.25rem',
                }}
            >
                Meet your host
            </Typography>

            <Box
                sx={{
                    p:2,
                    mt:1,
                    gap:2,
                    width:'100%',
                    display:'flex',
                    alignItems:'center',
                    borderRadius:3,
                    boxShadow:'0px 4px 8px rgba(0,0,0,.1)',
                    border:'1px solid #ededed',
                    '&:active':{
                        scale: isMobile && !loading && .95,
                        transition:'all .15s ease-in-out',
                    },
                    transition:'all .15s ease-in-out',
                }}
                onClick={() => {
                    if (isMobile && !loading) {
                       setViewingHostProfile(true)
                    }
                }}
            >
                <Avatar
                    src={host?.profile?.avatar}
                    sx={{
                        width:{xs:44,lg:50},
                        height:{xs:44,lg:50},
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
                <Box>
                    <Typography
                        sx={{
                            color:'#333',
                            fontSize:{xs:'.875rem',lg:'1rem'},
                            fontWeight:650,
                        }}
                    >
                        {loading ? (
                            <Skeleton
                                width={175}
                                height='100%'
                                animation='wave'
                            />
                        ) : (
                            <>
                                Hosted by {makeUsernameAbbreviated(host)}
                            </>
                        )}
                    </Typography>
                    <Typography
                        sx={{
                            color:colors.info.main,
                            fontSize:{xs:'.75rem',lg:'.875rem'},
                            fontWeight:500,
                        }}
                    >
                        {loading ? (
                            <Skeleton
                                width={150}
                                height='100%'
                                animation='wave'
                            />
                        ) : (
                            <>
                                Hosting since {makeTimestampFormatted(host?.hosting?.signUpDate)}
                            </>
                        )}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        gap:2,
                        ml:'auto',
                        display:{xs:'none',lg:'flex'},
                        flexDirection:isSmallDesktop?'column':'row',
                    }}
                >
                    <MKButton
                        onClick={handleContact}
                        disabled={loading || contacting || (listing?.host === user?.uid)}
                        startIcon={contacting ? null : <MessageOutlined />}
                        color='sparelot'
                        sx={{
                            fontSize:'1rem',
                            fontWeight:500,
                            borderRadius:8,
                        }}
                    >
                        {contacting ? <LoadingSpinner compact /> : <>Contact</>}
                    </MKButton>
                    <MKButton
                        disabled={loading}
                        component={Link}
                        target='_blank'
                        to={`/profile/${listing?.host}`}
                        startIcon={<AccountCircleOutlined />}
                        color='info'
                        sx={{
                            fontSize:'1rem',
                            fontWeight:500,
                            borderRadius:8,
                        }}
                    >
                        Profile
                    </MKButton>
                </Box>
            </Box>
        </Box>
    )
}