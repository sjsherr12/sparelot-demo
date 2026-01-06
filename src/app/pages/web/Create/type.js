import styled from "@emotion/styled";
import { AddRoadOutlined, ArrowBackIosNew, BedroomParentOutlined, CheckroomOutlined, DirectionsCarOutlined, Garage, GarageOutlined, GrassOutlined, HolidayVillageOutlined, HomeOutlined, Inventory, Inventory2Outlined, InventoryOutlined, LocalParking, LocalParkingOutlined, PlaceOutlined, Roofing, RoofingOutlined, StraightOutlined, WarehouseOutlined, WbSunny } from "@mui/icons-material";
import { Box, Icon, MenuItem, Select, Typography } from "@mui/material";
import colors from "assets/theme/base/colors";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import { useEffect, useState } from "react";
import Selectable from "app/utils/setupListing/selectable";
import DescriptiveToggle from "app/sections/Options/Toggle/descriptive";
import { SpaceTypes } from "app/utils/optimize/utils";
import { Vehicle_Types } from "../Explore/Filters/context";
import * as c from "const"

const SpaceType = ({isDraft, setIsDraft, vehicleOk, setVehicleOk, vehicleType, setVehicleType, spaceType, setSpaceType}) => {

    const vehicleTypeOptions = [
        {
            title:'Indoor', 
            desc:'Garages, sheds, warehouses, etc.',
            icon:Garage,
            types: [
                'Garage',
                'Storage_unit',
                'Shed',
            ]
        },
        {
            title:'Outdoor and Covered',
            desc:'Carport, parking garage, etc.',
            icon:LocalParking,
            types: [
                'Carport',
                'Parking_garage',
                'Parking_lot',
            ]
        },
        {
            title:'Outdoor and Uncovered',
            desc:'Driveway, unpaved lot, etc.',
            icon:WbSunny,
            types:[
                'Driveway',
                'Parking_lot',
                'Unpaved_lot',
            ]
        },
    ]

    const nonVehicleTypes = [
        'Attic',
        'Basement',
        'Bedroom',
        'Closet',
        'Garage',
        'Storage_unit',
        'Shed',
        'Warehouse',
    ];

    return (
        <>
            <DescriptiveToggle 
                title='Save as draft?'
                description={`When you finish, the listing will instead be saved as a draft.`}
                toggled={isDraft}
                setToggled={setIsDraft}
            />
            <Typography
                sx={{
                    my:2,
                    color:'#000',
                    fontSize:{xs:'1.25rem',lg:'2rem'},
                    fontWeight:550,
                    textAlign:'center',
                    lineHeight:{xs:'33px',lg:'40px'},
                }}
            >
                Let's determine the type of space you'll be listing on SpareLot.
            </Typography>

            <Box
                sx={{
                    p:2,
                    gap:2,
                    display:'flex',
                    flexDirection:'column',
                    borderRadius:'.5rem',
                    border:'2px solid #ededed'
                }}
            >
                <Typography
                    sx={{
                        color:'#000',
                        fontSize:{
                            xs:'.9rem',
                            lg:'1.5rem'
                        },
                        fontWeight:550,
                        textAlign:'center',
                    }}
                >
                    Can your space store a vehicle?
                </Typography>

                <Box
                    sx={{
                        display:'flex',
                        gap:2,
                    }}
                >
                    <Selectable
                        toggled={vehicleOk === true}
                        onClick={() => setVehicleOk(true)}
                    >
                        Yes
                    </Selectable>
                    <Selectable
                        toggled={vehicleOk === false}
                        onClick={() => setVehicleOk(false)}
                    >
                        No
                    </Selectable>
                </Box>
            </Box>

            <Box
                id='step2'
                sx={{
                    display:vehicleOk!==-1?'flex':'none',
                    flexDirection:'column',
                    gap:2,
                }}
            >
                <Typography
                    sx={{
                        color:'#000',
                        fontSize:{
                            xs:'.9rem',
                            lg:'1.5rem'
                        },
                        fontWeight:550,
                        textAlign:'center',
                    }}
                >
                    Which best describes your storage space?
                </Typography>
                
                {vehicleOk === true && 
                    <Box
                        sx={{
                            gap:2,
                            display:'flex',
                            flexDirection:'column'
                        }}
                    >
                        {
                            vehicleTypeOptions.map((opt, idx) => (
                                <Selectable
                                    toggled={idx === vehicleType}
                                    onClick={() => {
                                        setVehicleType(idx)
                                    }}
                                >
                                    <div
                                        style={{
                                            display:'flex',
                                            flexDirection:'column',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color:'#000',
                                                fontSize:{xs:'1rem',lg:'1.25rem'},
                                                fontWeight:550,
                                                textAlign:'left',
                                            }}
                                        >
                                            {opt.title}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color:'#737373',
                                                textAlign:'left',
                                                fontSize:{xs:'.8rem',lg:'1rem'},
                                                fontWeight:450,
                                            }}
                                        >
                                            {opt.desc}
                                        </Typography>
                                    </div>
                                    <Icon
                                        sx={{
                                            ml:'auto',
                                            scale:{xs:1.5,lg:2},
                                        }}
                                    >
                                        <opt.icon 
                                        />
                                    </Icon>
                                </Selectable>
                            ))
                        }

                        {vehicleType !== -1 &&
                            <Typography
                                sx={{
                                    color:'#000',
                                    fontSize:{
                                        xs:'.9rem',
                                        lg:'1.5rem'
                                    },
                                    fontWeight:550,
                                    textAlign:'center',
                                }}
                            >
                                Which of the following is your vehicle structure?
                            </Typography>
                        }
                    </Box>
                }

                <Box
                    sx={{
                        gap:2,
                        display:'grid',
                        gridTemplateColumns:'repeat(3, 1fr)'
                    }}
                >
                    {
                        (
                            vehicleOk !== -1 ?

                            vehicleOk === true ?

                            vehicleType !== -1 ?

                            vehicleTypeOptions[vehicleType]?.types :

                            [] :

                            nonVehicleTypes :

                            []
                        ).map((typ, idx) => {
                            const DIcon = c.spaceTypeToIcon[typ];

                            return (
                                <Selectable
                                    onClick={() => {
                                        setSpaceType(SpaceTypes.indexOf(typ))
                                    }}
                                    toggled={spaceType === SpaceTypes.indexOf(typ)}
                                >
                                    <Box
                                        style={{
                                            pt:2,
                                            display:'flex',
                                            flexDirection:'column',
                                            alignItems:'center',
                                            justifyContent:'center',
                                            width:'100%',
                                            minHeight:100,
                                        }}
                                    >
                                        <Icon
                                            sx={{
                                                scale:{xs:1.75,lg:2},
                                            }}
                                        >
                                            <DIcon />   
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
                                            {typ?.replaceAll('_', ' ')}
                                        </Typography>
                                    </Box>
                                </Selectable>
                            )
                        })
                    }
                </Box>
            </Box>
        </>
    )
}

export default SpaceType;