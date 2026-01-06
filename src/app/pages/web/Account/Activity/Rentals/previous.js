import { useUserAuthState } from "app/backend/user/auth/reactprovider";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import RentalPreview from "./preview";
import { Box, Icon, Typography } from "@mui/material";
import { LoadingSpinner } from "app/utils/loading/component";
import { ReservationStatus } from "app/utils/optimize/utils";
import { ReservationViewingRole } from "app/utils/optimize/utils";
import { DisabledTypography } from "app/pages/mobile/Hosting/common";
import { EventRepeatOutlined, RedoOutlined } from "@mui/icons-material";
import Filler from "app/sections/Filler";
import { useSpareLotRenterReservations } from "./context";

const PreviousRentals = () => {
    const now = new Date().setHours(23, 59, 59, 0);
    const {loading, reservations} = useSpareLotRenterReservations();
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        if (!reservations?.length) return;
    
        const activeReservations = reservations.filter((res) => {
            const info = res?.reservationInfo;

            return (
                info?.status === ReservationStatus.Canceled ||
                info?.status === ReservationStatus.Declined ||
                (info?.status === ReservationStatus.Approved && (new Date(info?.endDate)) < now)
            );
        });
    
        setFiltered(activeReservations);
    }, [reservations]);

    return (
        <Box
            sx={{
                px:2.5,
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
                                    LargeIcon={EventRepeatOutlined}
                                    title={'No previous rentals'}
                                    desc={'You have no previous rentals or rental requests.'}
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

export default PreviousRentals;