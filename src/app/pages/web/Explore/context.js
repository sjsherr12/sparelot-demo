import { getUser } from "app/backend/db/user";
import { firestore } from "app/backend/fb_cfg";
import { useUserAuthState } from "app/backend/user/auth/reactprovider";
import axios from "axios";
import { US_CENTER_LNG } from "const";
import { US_CENTER_LAT } from "const";
import { collection, getDocs, query, where } from "firebase/firestore";
import { createContext, useContext, useState } from "react";

const RADIUS = 6371; // Radius of the Earth in kilometers

// Haversine formula to calculate the distance between two points
export const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const toRadians = (degrees) => degrees * Math.PI / 180;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return RADIUS * c;
};

const SearchResultsContext = createContext();

export const SearchResultsProvider = ({ children }) => {
    const {user} = useUserAuthState();
    const [previousSearch, setPreviousSearch] = useState('');
    const [listings, setListings] = useState([]);
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);

    const initListingsFromAddress = async (search) => {
        if (previousSearch !== search) {
            try {
                setPreviousSearch(search);
                const geo_res = await axios.get(
                    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(search)}&format=json&countrycodes=us&limit=1`
                );
            
                if (geo_res.data.length === 0) {
                    setLat('0');
                    setLng('0');
                    return false;
                }
            
                const lat = geo_res.data[0].lat;
                const lng = geo_res.data[0].lon;

                setLat(lat);
                setLng(lng);
            
                const addressComponents = geo_res.data[0].display_name.split(',');
                const state = addressComponents[addressComponents.length - 3].trim();
            
                if (state === '') {
                    return false;
                }
            
                const listingsRef = collection(firestore, 'listings');
                const querySnapshot = await getDocs(listingsRef);

                let fetched = []

                for (const doc of querySnapshot.docs) {
                    const data = doc.data();

                    // Skip listings without coordinates
                    if (!data?.location?.latitude || !data?.location?.longitude) {
                        console.warn(`Listing ${doc.id} missing coordinates, skipping`);
                        continue;
                    }

                    const distance = haversineDistance(lat, lng, data.location.latitude, data.location.longitude);

                    // Skip listings with invalid distance calculation
                    if (isNaN(distance)) {
                        console.warn(`Listing ${doc.id} has invalid distance calculation, skipping`);
                        continue;
                    }

                    const host = await getUser(data.host);

                    if (!(host?.extra?.blocked?.includes(user?.uid))) {
                        fetched.push({ id: doc.id, host: host, listing: data, distance });
                    }
                }

                fetched.sort((a, b) => a.distance - b.distance);
                console.log(`Fetched ${fetched.length} listings from address search`);
                setListings(fetched);
                return true;
            }
            catch (ex) {
                console.log(ex.message);
                return false;
            }
        }
        return true; // already searched, no need to refetch
    }

    const initListingsFromCoordinates = async (lat, lng) => {
        try {
            const geo_res = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&countrycodes=us&format=json`
            );

            setLat(lat);
            setLng(lng);
            
            const addressComponents = geo_res.data.display_name.split(',');
            const state = addressComponents[addressComponents.length - 3].trim();
            const displayNameCompressed = addressComponents[0] + addressComponents[1];
            setPreviousSearch(displayNameCompressed);
        
            if (state === '') {
                return false;
            }
        
            const listingsRef = collection(firestore, 'listings');
            const querySnapshot = await getDocs(listingsRef);

            let fetched = []

            for (const doc of querySnapshot.docs) {
                const data = doc.data();

                // Skip listings without coordinates
                if (!data?.location?.latitude || !data?.location?.longitude) {
                    console.warn(`Listing ${doc.id} missing coordinates, skipping`);
                    continue;
                }

                const distance = haversineDistance(lat, lng, data.location.latitude, data.location.longitude);

                // Skip listings with invalid distance calculation
                if (isNaN(distance)) {
                    console.warn(`Listing ${doc.id} has invalid distance calculation, skipping`);
                    continue;
                }

                const host = await getUser(data.host);

                if (!(host?.extra?.blocked?.includes(user?.uid))) {
                    fetched.push({ id: doc.id, host, listing: data, distance });
                }
            }

            fetched.sort((a, b) => a.distance - b.distance);
            console.log(`Fetched ${fetched.length} listings from coordinates search`);
            setListings(fetched);
            return true;
        } catch (ex) {
            console.log(ex.message);
            return false;
        }
    }


    const initListingsFromCurrentLocation = async () => {
        let lat = null, lng = null, city = '', regionName = '', country = '';

        try {
            // Try Geolocation API
            if (navigator.geolocation) {
                try {
                    await new Promise((resolve, reject) => {
                        navigator.geolocation.getCurrentPosition(
                            (position) => {
                                lat = position.coords.latitude;
                                lng = position.coords.longitude;
                                resolve();
                            },
                            (error) => {
                                console.warn('Geolocation error:', error.message);
                                reject();
                            }
                        );
                    });
                } catch {}
            }

            // Fallback to IP-based location
            if (!lat || !lng) {
                try {
                    const ip_api_res = await axios.get('https://ip-api.com/json');
                    ({ city, regionName, country, lat, lon: lng } = ip_api_res.data);
                } catch (ipErr) {
                    console.warn('IP location error:', ipErr.message);
                }
            }

            // Final fallback to center of US
            if (!lat || !lng) {
                console.warn('Falling back to US center');
                lat = US_CENTER_LAT;
                lng = US_CENTER_LNG;
            }

            setLat(lat);
            setLng(lng);

            const listingsRef = collection(firestore, 'listings');
            const querySnapshot = await getDocs(listingsRef);

            let fetched = [];

            for (const doc of querySnapshot.docs) {
                const data = doc.data();

                // Skip listings without coordinates
                if (!data?.location?.latitude || !data?.location?.longitude) {
                    console.warn(`Listing ${doc.id} missing coordinates, skipping`);
                    continue;
                }

                const distance = haversineDistance(lat, lng, data.location.latitude, data.location.longitude);

                // Skip listings with invalid distance calculation
                if (isNaN(distance)) {
                    console.warn(`Listing ${doc.id} has invalid distance calculation, skipping`);
                    continue;
                }

                const host = await getUser(data.host);

                if (!(host?.extra?.blocked?.includes(user?.uid))) {
                    fetched.push({ id: doc.id, host, listing: data, distance });
                }
            }

            fetched.sort((a, b) => a.distance - b.distance);
            console.log(`Fetched ${fetched.length} listings from current location search`);
            setListings(fetched);
            setPreviousSearch(`${city || ''}, ${regionName || ''}`);
            return true;
        } catch (ex) {
            console.error('initListingsFromCurrentLocation failed:', ex.message);
            setLat(US_CENTER_LAT);
            setLng(US_CENTER_LNG);
            return false;
        }
    };
    
    return (
        <SearchResultsContext.Provider 
            value={{
                previousSearch,
                listings, setListings,
                setLat, lat, setLng, lng,
                initListingsFromAddress,
                initListingsFromCoordinates,
                initListingsFromCurrentLocation,
            }}
        >
            {children}
        </SearchResultsContext.Provider>
    );
};

export const useSearchResultsState = () => {
    return useContext(SearchResultsContext);
};