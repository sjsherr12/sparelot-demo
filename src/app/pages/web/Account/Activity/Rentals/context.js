import get_all_stripe_transactions from "app/backend/cloud/get_all_stripe_transactions";
import { useUserAuthState } from "app/backend/user/auth/reactprovider";
import { useModal } from "app/sections/Modal/Parent/context";
import MKTypography from "components/MKTypography";
import { collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import { createContext, useContext, useState, useCallback, useEffect } from "react";

const SpareLotRenterReservationsContext = createContext();

export const SpareLotRenterReservationsProvider = ({ children }) => {
    const [reservations, setReservations] = useState([]);
    const { user } = useUserAuthState();
    const [loading, setLoading] = useState(false);
    const [reservationsLoaded, setReservationsLoaded] = useState(false);

    const get_reservations = async (force = false) => {
        if (reservationsLoaded && !force) return reservations;
    
        setLoading(true);
    
        const db = getFirestore();
        const reservationsQuery = query(
            collection(db, 'reservations'),
            where('renter', '==', `${user?.uid}`)
        );
        
        const reservationsSnapshot = await getDocs(reservationsQuery);
    
        const reservationsPromises = reservationsSnapshot.docs.map(async (docSnap) => {
            const reservationData = docSnap.data();
            const listingRef = doc(db, 'listings', reservationData.listing);
    
            try {
                const listingDoc = await getDoc(listingRef);
                const listingDocData = listingDoc.data();
                const listingData = listingDoc.exists() ? {
                    listing: listingDocData,
                    id: listingDoc.id,
                    host: null,
                    hostId: listingDocData?.host,
                } : null;
                return {
                    reservationId: docSnap.id,
                    reservationInfo: reservationData,
                    listingId: listingDoc.id,
                    providedListingInfo: listingData,
                };
            } catch (error) {
                console.error("Error fetching listing:", error);
                return {
                    reservationId: docSnap.id,
                    reservationInfo: reservationData,
                    listingId: reservationData.listing,
                    providedListingInfo: null,
                };
            }
        });
    
        const allReservations = await Promise.all(reservationsPromises);
    
        setReservations(allReservations);
        setReservationsLoaded(true);
        setLoading(false);
    
        return allReservations;
    };

    // Reset loaded states when user changes
    useEffect(() => {
        if (user) {
            setReservationsLoaded(false);
        }
    }, [user]);

    return (
        <SpareLotRenterReservationsContext.Provider
            value={{
                loading,
                reservations,
                reservationsLoaded,
                get_reservations,
            }}
        >
            {children}
        </SpareLotRenterReservationsContext.Provider>
    );
};

export const useSpareLotRenterReservations = () => {
    const context = useContext(SpareLotRenterReservationsContext);
    const { user } = useUserAuthState();
    
    useEffect(() => {
        if (!user) return;
        
        context.get_reservations();
    }, [user, context]);
    
    return context;
};