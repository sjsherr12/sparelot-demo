import styled from "@emotion/styled";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { Box, Icon, MenuItem, Select, Typography } from "@mui/material";
import colors from "assets/theme/base/colors";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import { useEffect, useState } from "react";
import Selectable from "app/utils/setupListing/selectable";
import Hr from "app/utils/Hr";

const SpaceAccessibility = ({appointmentsRequired, setAppointmentsRequired, timeOfDayAccess, setTimeOfDayAccess, accessFrequency, setAccessFrequency}) => {
    const options = [
        {
            desc: 'Appointments', 
            options: [
                {title:'Yes, renters should contact me each visit.', desc:null, value:true},
                {title:'No, renters can come without contact.', desc:null, value:false},
            ],
            get:appointmentsRequired,
            set:setAppointmentsRequired,
        },
        {
            desc: 'Time of Day', 
            options: [
                {title:'Daytime Hours', desc:'Any time during standard business hours (8am - 5pm).', value:0},
                {title:'Evening Hours', desc:'Any time after standard business hours (After 5pm).', value:1},
                {title:'24/7', desc:'Access the space at any time. ', value:2},
            ],
            get:timeOfDayAccess,
            set:setTimeOfDayAccess,
        },
        {
            desc: 'Access Frequency', 
            options: [
                {title:'Daily - At least once per day', desc:null, value:0},
                {title:'Weekly - A few times per week', desc:null, value:1},
                {title:'Monthly - A few times per month', desc:null, value:2},
                {title:'Infrequently - Less than once per month', desc:null, value:3},
            ],
            get:accessFrequency,
            set:setAccessFrequency,
        },
    ]

    return (
        <Box
            sx={{
                mt:2,
                mb:4,
                width: "100%",
                maxWidth: 600,
                display: "flex",
                flexDirection: "column",
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
                Space Accessibility
            </Typography>
            <Typography
                sx={{
                    my:2,
                    color: "#737373",
                    fontSize: { xs: "1rem", lg: "1.25rem" },
                    fontWeight: 500,
                    textAlign: "center",
                }}
            >
                Select how frequently you would like renters to access storage.
            </Typography>
            <Hr />

            {
                (options.map((option, idx) => (
                    <>
                        <Typography
                            variant='h4'
                            sx={{
                                color:'#000',
                                mt:3,
                                mb:1.5,
                                fontWeight:500,
                            }}
                        >
                            {option.desc}
                        </Typography>
                        <MKBox
                            sx={{
                                display:'flex',
                                flexDirection:'column',
                                gap:1.25,
                            }}
                        >
                            {
                                (option.options.map((item, idx) => (
                                    <Selectable
                                        key={idx}
                                        onClick={() => {
                                            option.set(item.value)
                                        }}
                                        color={option.get === item.value ? 'info' : ''}
                                    >
                                        <Box
                                            sx={{
                                                width:'100%',
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    color:option.get === item.value ? '#fff' : '#000',
                                                    fontSize:20,
                                                    fontWeight:500,
                                                }}
                                            >
                                                {item.title}
                                            </Typography>
                                            {
                                                item.desc !== null &&
                                                <Typography
                                                    sx={{
                                                        ml:'auto',
                                                        color:option.get === item.value ? '#fff' : '#737373',
                                                        fontSize:15,
                                                        fontWeight:500,
                                                    }}
                                                >
                                                    {item.desc}
                                                </Typography>
                                            }
                                        </Box>
                                    </Selectable>
                                )))
                            }
                        </MKBox>
                    </>
                )))
            }
        </Box>
    )
}

export default SpaceAccessibility;