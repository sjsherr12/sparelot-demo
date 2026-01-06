import { ReservationStatus } from "app/utils/optimize/utils";
import { useSpareLotHostData } from "../context";
import { useEffect, useState } from "react";
import RentalPreview from "app/pages/web/Account/Activity/Rentals/preview";
import { Box, Icon, Typography } from "@mui/material";
import { DisabledTypography } from "../../common";
import { ReservationViewingRole } from "app/utils/optimize/utils";
import HostContentWrapper from "app/utils/wrapper/host/content";
import { EventAvailableOutlined } from "@mui/icons-material";
import Filler from "app/sections/Filler";

const HostingBookingsGroupedApprovedBookings = ({

}) => {
    const {loading, reservations} = useSpareLotHostData('reservations');
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        if (reservations?.length) {
            setFiltered(reservations.filter((res) => res.reservationInfo?.status === ReservationStatus.Approved))
        }
    }, [reservations])

    return (
        <HostContentWrapper>
            <Box
                sx={{
                    width:'100%',
                    display:'flex',
                    justifyContent:'center',
                }}
            >
                <Box
                    sx={{
                        width: {
                            xs:'100%',
                            md:'75%',
                            xl:'66%',
                            xxl:'50%',
                        },
                        display:'flex',
                        flexDirection:'column',
                        gap:3,
                    }}
                >
                    {loading? (
                        <>
                            {Array.from({length:4}).map((_, idx) => (
                                <RentalPreview
                                    alwaysLoading
                                />
                            ))}
                        </>
                    ) : (
                        <>
                            {filtered?.length? (
                                <>
                                    {filtered.map((res, idx) => (
                                        <RentalPreview 
                                            {...res}
                                            viewingRole={ReservationViewingRole.Host.FromRentals}
                                        />
                                    ))}
                                </>
                            ) : (
                                <Filler
                                    LargeIcon={EventAvailableOutlined}
                                    title={'No approved reservations'}
                                    desc={'You have no approved reservations.'}
                                    sx={{
                                        width:'100%',
                                    }}
                                />
                            )}
                        </>
                    )}
                </Box>
            </Box>
        </HostContentWrapper>
    )
}

export default HostingBookingsGroupedApprovedBookings;