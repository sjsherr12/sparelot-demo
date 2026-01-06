import styled from "@emotion/styled";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { Box, Icon, MenuItem, Select, Typography } from "@mui/material";
import colors from "assets/theme/base/colors";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import { useEffect, useState } from "react";
import Selectable from "app/utils/setupListing/selectable";
import { specificationToIcon } from "const";
import Hr from "app/utils/Hr";

const SpaceFeatures = ({specifications, setSpecifications}) => {
    const total = [0,0,0];

    const options = [
        [
            {
                desc: 'Security', 
                options: [
                    {title:'Locked_area'},
                    {title:'Security_camera_monitored'},
                    {title:'Private_space'},
                    {title:'Private_entrance'},
                    {title:'Gated_or_guarded_community'},
                ],
                prev:null,
            },
        ],
        [
            {
                desc: 'Quality', 
                options: [
                    {title:'Smoke_detectors'},
                    {title:'Climate_controlled'},
                    {title:'Smoke_free'},
                    {title:'Pet_free'},
                    {title:'Fenced_property'},
                    {title:'Bathroom_available'},
                    {title:'Water_access'},
                    {title:'EV_charging'},
                ],
                prev:0,
            },
        ],
        [
            {
                desc: 'Accessibility', 
                options: [
                    {title:'No_stairs'},
                    {title:'Elevator'},
                    {title:'Wheelchair_accessible'},
                ],
                prev:1,
            },
        ],
    ]

    useEffect(() => {
        window.scrollTo(0,0)
    }, [])

    return (
        <>
            <Typography
                sx={{
                    mt:2,
                    color:'#000',
                    fontSize:{xs:'1.25rem',lg:'2rem'},
                    fontWeight:550,
                    textAlign:'center',
                    lineHeight:{xs:'30px',lg:'40px'},
                }}
            >
                Features of your storage space
            </Typography>
            <Typography
                sx={{
                    color:'#737373',
                    fontSize:{xs:'1rem',lg:'1.25rem'},
                    fontWeight:500,
                    textAlign:'center',
                    lineHeight:{xs:'10px',lg:'20px'},
                }}
            >
                Select all that apply
            </Typography>
            <Hr sx={{my:1,}}/>

            <Box
                sx={{
                    gap:2,
                    width:'100%',
                    display:'grid',
                    gridTemplateColumns:{xs:'repeat(2, 1fr)', lg:'repeat(3, 1fr)'}
                }}
            >
            {
                (total.map((item, idx) => (
                    <>
                        {
                            (options[idx][item].options.map((item, idx) => (
                                <Selectable
                                    key={idx}
                                    onClick={() => {
                                        const copy = [...specifications];
                                        if (specifications.includes(item.title)) {
                                            const idx = specifications.indexOf(item.title);
                                            copy.splice(idx, 1);
                                        }
                                        else {
                                            copy.push(item.title);
                                        }
                                        setSpecifications(copy)
                                    }}
                                    toggled={specifications.includes(item.title)}
                                >
                                    <Box
                                        sx={{
                                            pt:2,
                                            display:'flex',
                                            flexDirection:'column',
                                            alignItems:'center',
                                            justifyContent:'center',
                                            width:'100%',
                                            minHeight:{xs:75,lg:100},
                                        }}
                                    >
                                        <Icon
                                            sx={{
                                                scale:{xs:1.75,lg:2},
                                            }}
                                        >
                                            {specificationToIcon[item?.title]}
                                        </Icon>
                                        <Typography
                                            sx={{
                                                mb:-1,
                                                mt:3,
                                                color:'#000',
                                                fontSize:{xs:'.75rem',lg:'1rem'},
                                                fontWeight:550,
                                                textAlign:'center',
                                            }}
                                        >
                                            {item?.title?.replaceAll('_', ' ')}
                                        </Typography>
                                    </Box>
                                </Selectable>
                            )))
                        }
                    </>
                )))
            }
            </Box>
        </>
    )
}

export default SpaceFeatures;