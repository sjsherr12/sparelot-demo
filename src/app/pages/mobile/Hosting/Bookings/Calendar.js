import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"
import { useEffect, useState } from "react";
import { Box, Skeleton, useMediaQuery } from "@mui/material";
import './calendar.css'
import Hr from "app/utils/Hr";
import { useUserAuthState } from "app/backend/user/auth/reactprovider";
import { LoadingSpinner } from "app/utils/loading/component";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { ReservationStatus } from "app/utils/optimize/utils";
import { makeListingTitleExtended } from "app/utils/listings/utils";
import { useSpareLotHostData } from "./context";
const { default: HostContentWrapper } = require("app/utils/wrapper/host/content")

function stringToHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

// Helper function to generate a color based on the hash
function hashToColor(hash) {
    // Generate a color based on the hash value (simple HSL color)
    const hue = Math.abs(hash % 360); // Use hash for hue in HSL color space
    return `hsl(${hue}, 70%, 60%)`; // HSL with 70% saturation and 60% lightness
}


const HostBookingCalendar = () => {
    const isMobile = useMediaQuery('(max-width:991px)')
    const {user} = useUserAuthState();
    const {loading, reservations} = useSpareLotHostData('reservations');
    const [calendarEvents, setCalendarEvents] = useState([])

    useEffect(() => {
        if (!reservations?.length) return;
    
        const now = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime();
    
        const formattedEvents = reservations
            .filter(res => res.reservationInfo.status === ReservationStatus.Approved && res.reservationInfo.endDate > now)
            .map(res => {
                const { reservationInfo, listingId, reservationId, providedListingInfo } = res;
                const startDate = new Date(reservationInfo.startDate);
                const endDate = new Date(reservationInfo.endDate);
    
                const colorSeed = `${startDate.toISOString()}-${endDate.toISOString()}-${reservationInfo.renter}-${listingId}`;
                const colorHash = stringToHash(colorSeed);
                const color = hashToColor(colorHash);
    
                return {
                    title: `${makeListingTitleExtended(providedListingInfo.listing)} booking`,
                    id: reservationId,
                    start: startDate.toISOString(),
                    end: endDate.toISOString(),
                    info: reservationInfo,
                    listingId: listingId,
                    color: color,
                };
            });
    
        setCalendarEvents(formattedEvents);
    }, [reservations]);

    return (<>
        <HostContentWrapper>
            <Box
                sx={{
                    pb:2,
                    position:'relative',
                    width:'100%',
                }}
            >
                <FullCalendar
                    events={calendarEvents}
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    fixedWeekCount={false}
                    eventMinHeight={30}
                    contentHeight={isMobile?500:700}
                    validRange={{
                        start: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
                    }}
                    headerToolbar={{
                        left: "title", // Only show left/right navigation buttons
                        center: "", // Keep the month & year title in the center
                        right: "prev,next", // Remove everything on the right (like "Today" button)
                    }}
                    displayEventTime={false}
                />
                {loading && 
                    <>
                        <Box
                            sx={{
                                top:0,
                                left:0,
                                position:'absolute',
                                zIndex:1,
                                width:'100%',
                                height:'100%',
                                bgcolor:'rgba(0,0,0,.2)'
                            }}
                        />
                        <Box
                            sx={{
                                p: 2,
                                zIndex: 2,
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)', // Centers the element correctly
                                bgcolor: '#fff',
                                borderRadius: 16,
                            }}
                        >
                            <LoadingSpinner />
                        </Box>
                    </>
                }
            </Box>

        </HostContentWrapper>
    </>)
}

export default HostBookingCalendar;