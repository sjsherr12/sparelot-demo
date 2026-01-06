import { AutoFixHigh, LocalPolice, Search } from "@mui/icons-material"
import { Icon } from "@mui/material"
import colors from "assets/theme/base/colors"

const { default: MKBox } = require("components/MKBox")
const { default: MKTypography } = require("components/MKTypography")

const eh_requirements = [
    'Listing Quality',
    'Responsiveness',
    'Approval Rate',
    'Reservations',
    'Rating',
]

const eh_advantages = [
    {
        title:'Elite Host Badge',
        icon: LocalPolice,
        desc:'The Elite Host badge will appear on your profile and listings, setting you apart from other hosts. It serves as a cue to renters that you are a reliable host.',
    },
    {
        title:'Higher Search Rankings',
        icon: Search,
        desc:'The listings of Elite Hosts will appear towards the top in search rankings, making it easier for renters to find your space. Additionally, renters will be able to filter for only Elite Hosts.',
    },
    {
        title:'Elite Host Badge',
        icon: AutoFixHigh,
        desc:'Elite Hosts will receive exclusive tools to manage and promote their listings such as enhanced analytics, priority support, automated responses, and custom branding.',
    }
]

const Step10 = () => {
    return (
        <>
            <MKBox
                id='toplevel'
                sx={{
                    width:{xs:'100%', md:'66%', lg:'50%', xl:'40%'},
                }}
            >
                <MKTypography
                    variant='h2'
                    sx={{
                        color:'#000',
                        mt:3,
                        fontFamily:'Montserrat, sans-serif',
                    }}
                >
                    Elite Host Program
                </MKTypography>
                <MKTypography
                    variant='h5'
                    sx={{
                        my:1,
                        color:'#737373',
                        fontWeight:600,
                        fontFamily:'Montserrat, sans-serif',
                    }}
                >
                    The Elite Host program is a hosting status that provides exceptional hosts with specific hosting advantages.
                </MKTypography>

                <MKTypography
                    variant='h4'
                    sx={{
                        color:'#000',
                        mt:2,
                        fontWeight:500,
                        fontFamily:'Montserrat, sans-serif',
                    }}
                >
                    Elite Host Requirements:
                </MKTypography>

                <MKBox
                    sx={{
                        pl:2,
                        pt:.5,
                    }}
                >
                    { eh_requirements.map((rq, idx) => (
                        <MKTypography
                            key={idx}
                            variant='h5'
                            sx={{
                                color:'#000',
                                fontWeight:600,
                                fontFamily:'Montserrat, sans-serif',
                            }}
                        >
                            • {rq}
                        </MKTypography>
                    ))}
                </MKBox>

                <MKTypography
                    variant='h4'
                    sx={{
                        color:'#000',
                        mt:3,
                        fontWeight:500,
                        fontFamily:'Montserrat, sans-serif',
                    }}
                >
                    Elite Host Advantages:
                </MKTypography>

                <MKBox>
                    {eh_advantages.map((adv, idx) => (
                        <MKBox
                            sx={{
                                mt:2,
                                gap:2,
                                display:'flex',
                                flexDirection:'column',
                                fontSize:28,
                            }}
                        >
                            <MKBox
                                sx={{
                                    gap:2,
                                    display:'flex',
                                    alignItems:'center',
                                }}
                            >
                                <Icon
                                    sx={{
                                        width:40,
                                        height:40,
                                        color:'#fff',
                                        backgroundColor: colors.gradients.info.main,
                                        borderRadius:32, 
                                        display:'flex',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        padding:1,
                                    }}
                                >
                                    <adv.icon fontSize="inherit"/>
                                </Icon>
                                <MKTypography
                                    variant='h4'
                                    sx={{
                                        color:'#000',
                                        fontWeight:600,
                                        fontFamily:'Montserrat, sans-serif',
                                    }}
                                >
                                    {adv.title}
                                </MKTypography>
                            </MKBox>

                            <MKTypography
                                variant='h5'
                                sx={{
                                    color:'#737373',
                                    fontWeight:500,
                                    fontSize:18,
                                    fontFamily:'Montserrat, sans-serif',
                                }}
                            >
                                {adv.desc}
                            </MKTypography>
                        </MKBox>
                    ))}
                </MKBox>
                <div style={{height:32}}/>
            </MKBox>
        </>
    )
}

export default Step10;