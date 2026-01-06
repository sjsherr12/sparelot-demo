import get_all_stripe_transactions from "app/backend/cloud/get_all_stripe_transactions";
import { useUserAuthState } from "app/backend/user/auth/reactprovider";
import { useModal } from "app/sections/Modal/Parent/context";
import MKTypography from "components/MKTypography";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { createContext, useContext, useState, useCallback, useEffect } from "react";

const SpareLotHostDataContext = createContext();

export const SpareLotHostDataProvider = ({ children }) => {
    const [reservations, setReservations] = useState([]);
    const [listings, setListings] = useState([]);
    const [drafts, setDrafts] = useState([]);
    const { user } = useUserAuthState();
    const [loading, setLoading] = useState(true);
    const [listingsLoaded, setListingsLoaded] = useState(false);
    const [draftsLoaded, setDraftsLoaded] = useState(false);
    const [reservationsLoaded, setReservationsLoaded] = useState(false);

    const get_drafts = async (force = false) => {
        if (draftsLoaded && !force) return drafts;
        
        setLoading(true);
        
        const ownedDraftsQuery = query(
            collection(getFirestore(), 'drafts'),
            where('host', '==', user.uid)
        );
        const ownedDraftsSnapshot = await getDocs(ownedDraftsQuery);
        
        const draftsData = ownedDraftsSnapshot.docs.map(doc => ({
            draft: doc.data(),
            host: null,
            hostId: user?.uid,
            id: doc.id
        }));
        setDrafts(draftsData);
        setDraftsLoaded(true);
        
        setLoading(false);
        return draftsData;
    };

    const get_listings = async (force = false) => {
        if (listingsLoaded && !force) return listings;
        
        setLoading(true);
        
        const ownedListingsQuery = query(
            collection(getFirestore(), 'listings'),
            where('host', '==', user.uid)
        );
        const ownedListingsSnapshot = await getDocs(ownedListingsQuery);
        
        const listingsData = ownedListingsSnapshot.docs.map(doc => ({
            listing: doc.data(),
            host: null,
            hostId: user?.uid,
            id: doc.id
        }));
        setListings(listingsData);
        setListingsLoaded(true);
        
        setLoading(false);
        return listingsData;
    };

    const get_reservations = async (force = false) => {
        if (reservationsLoaded && !force) return reservations;

        setLoading(true);
        
        // Get listings first if not already loaded or force reload them too
        const listingsData = await get_listings(force);
        
        const reservationsPromises = listingsData.map(async (listingData) => {
            const reservationsQuery = query(
                collection(getFirestore(), 'reservations'),
                where('listing', '==', listingData.id)
            );
            
            const reservationsSnapshot = await getDocs(reservationsQuery);
            
            return reservationsSnapshot.docs.map(doc => ({
                reservationInfo: doc.data(),
                listingId: listingData.id,
                reservationId: doc.id,
                providedListingInfo: listingData
            }));
        });
        
        const allReservations = (await Promise.all(reservationsPromises)).flat();
        setReservations(allReservations);
        setReservationsLoaded(true);
        
        setLoading(false);
        return allReservations;
    };

    // Reset loaded states when user changes
    useEffect(() => {
        if (user) {
            setListingsLoaded(false);
            setDraftsLoaded(false);
            setReservationsLoaded(false);
        }
    }, [user]);

    return (
        <SpareLotHostDataContext.Provider
            value={{
                loading,
                listings, 
                reservations,
                drafts,
                listingsLoaded,
                draftsLoaded,
                reservationsLoaded,
                get_listings,
                get_reservations,
                get_drafts,
            }}
        >
            {children}
        </SpareLotHostDataContext.Provider>
    );
};

export const useSpareLotHostData = (dataType = null) => {
    const context = useContext(SpareLotHostDataContext);
    const { user } = useUserAuthState();
    
    useEffect(() => {
        if (!user) return;
        
        if (dataType === 'listings' && !context.listingsLoaded) {
            context.get_listings();
        } else if (dataType === 'drafts' && !context.draftsLoaded) {
            context.get_drafts();
        } else if (dataType === 'reservations' && !context.reservationsLoaded) {
            context.get_reservations();
        } else if (dataType === null) {
            // Fetch all data types if no specific type requested
            if (!context.listingsLoaded) context.get_listings();
            if (!context.draftsLoaded) context.get_drafts();
            if (!context.reservationsLoaded) context.get_reservations();
        }
    }, [dataType, user, context]);
    
    return context;
};