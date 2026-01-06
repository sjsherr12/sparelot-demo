import { MoreVert } from "@mui/icons-material";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { useMoreOptions } from "app/sections/More";
import { ReservationStatus } from "app/utils/optimize/utils";

const { default: Hr } = require("app/utils/Hr");
const { default: MKBox } = require("components/MKBox");
const { default: MKTypography } = require("components/MKTypography");

const ReservationRequestDisplay = ({reservation}) => {

    const convertToLocaleDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        return formattedDate;
    }

    const info = [
        {
            title:'Storage Description',
            desc: reservation?.storeDesc || 'No storage description provided.'
        },
        {
            title:'Start Date',
            desc: convertToLocaleDate(reservation?.startDate)
        },
        {
            title:'End Date',
            desc: convertToLocaleDate(reservation?.endDate)
        },
        {
            title:'Status',
            desc:Object.entries(ReservationStatus).find(([key, value]) => (value === reservation?.status))?.[0]
        }
    ]

    return (
        <Box
            sx={{
                gap:{xs:1,lg:2},
                width:'100%',
                display:'flex',
                flexDirection:{xs:'column',lg:'unset'},
                bgcolor:'#fff',
            }}
        >
            <Box
                sx={{
                    pr:{xs:0,lg:1},
                    pb:{xs:1,lg:0},
                    borderRight:{xs:'unset',lg:'1px solid #ededed'},
                    borderBottom:{xs:'1px solid #ededed',lg:'unset'},
                    minWidth:{xs:'100%',lg:'33%'},
                    maxWidth:{xs:'100%',lg:'40%'},
                    display:'flex',
                    alignItems:'center',
                    flexDirection:'column',
                    justifyContent:'center',
                }}
            >
                <Avatar
                    src={reservation?.idPicture}
                    sx={{
                        width:175,
                        height:175,
                        boxShadow:4,

                        'img': {
                            width:'100%',
                            height:'100%',
                            objectFit:'cover',
                        }
                    }}
                />
                <Typography
                    sx={{
                        mt:2,
                        whiteSpace:'nowrap',
                        textAlign:'center',
                        color:'#000',
                        fontSize:'1.5rem',
                        fontWeight:550,
                    }}
                >
                    {reservation?.fullName}
                </Typography>
                <Typography
                    sx={{
                        textAlign:'center',
                        color:'#000',
                        fontSize:'1rem',
                        fontWeight:450,
                    }}
                >
                    {reservation?.address}
                </Typography>
            </Box>

            <Box
                sx={{
                    width:'100%',
                    display:'flex',
                    flexDirection:'column',
                    justifyContent:'center',
                }}
            >
                {info.map((it, idx) => (<>
                    <Box
                        sx={{
                            display:'flex',
                            alignItems:{xs:'center',lg:'unset'},
                            flexDirection:'column',
                        }}
                    >
                        <Typography
                            sx={{
                                color:'#000',
                                fontSize:'1.5rem',
                                fontWeight:550,
                            }}
                        >
                            {it.title}:
                        </Typography>
                        <Typography
                            sx={{
                                color:'#000',
                                fontSize:'1rem',
                                fontWeight:450,
                            }}
                        >
                            {it.desc}
                        </Typography>
                    </Box>


                    <Hr 
                        sx={{
                            my:1,
                            display:idx+1<info.length?'flex':'none',
                        }}
                    />
                </>))}
            </Box>
        </Box>
    )
}

export default ReservationRequestDisplay;