import { useUserAuthState } from "app/backend/user/auth/reactprovider";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import RentalPreview from "./preview";
import { Box, Icon, Typography } from "@mui/material";
import { LoadingSpinner } from "app/utils/loading/component";
import { ReservationStatus } from "app/utils/optimize/utils";
import { ReservationViewingRole } from "app/utils/optimize/utils";
import { DisabledTypography } from "app/pages/mobile/Hosting/common";
import { EventAvailableOutlined } from "@mui/icons-material";
import Filler from "app/sections/Filler";
import { useSpareLotRenterReservations } from "./context";

const ActiveRentals = () => {
    const now = new Date().setHours(23, 59, 59, 0);
    const {loading, reservations} = useSpareLotRenterReservations();
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        if (!reservations?.length) return;
    
        const activeReservations = reservations.filter((res) => {
            const info = res?.reservationInfo;

            return (
                info?.status === ReservationStatus.Approved &&
                new Date(info?.endDate) > now
            );
        });
    
        setFiltered(activeReservations);
    }, [reservations]);
    

    return (
        <Box
            sx={{
                px:2,
                gap:3,
                display:'flex',
                flexDirection:'column',
            }}
        >
            {loading ? 
                (
                    <>
                        {Array.from({length:4}).map((_, idx) => (
                            <RentalPreview
                                alwaysLoading
                            />
                        ))}
                    </>
                ) : (
                    <>
                        {filtered?.length?
                            (
                                <>
                                    {filtered.map((reservation, idx) => (
                                        <RentalPreview
                                            key={idx}
                                            {...reservation}
                                            viewingRole={ReservationViewingRole.Renter.FromRentals}
                                        />
                                    ))}
                                </>
                            ) : (
                                <Filler
                                    LargeIcon={EventAvailableOutlined}
                                    title={'No active rentals'}
                                    desc={'You have no active rentals with other SpareLot hosts.'}
                                    sx={{
                                        width:'100%',
                                    }}
                                />
                            )
                        }
                    </>
                )
            }
        </Box>
    )
}

export default ActiveRentals;