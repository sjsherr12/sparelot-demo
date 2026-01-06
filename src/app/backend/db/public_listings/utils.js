import { app_auth } from "app/backend/fb_cfg";
import { firestore } from "app/backend/fb_cfg";
import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";

import { v7 as uuid_v7 } from "uuid";
import { getUser } from "../user";
import axios from "axios";

// export const getListings = async (zipCode) => {
//   const db = getFirestore();

//   try {
//     const zipCollection = collection(db, `listings/hosted/${zipCode}`);
//     const querySnapshot = await getDocs(zipCollection);

//     // Map over the documents and get the host data
//     const listingPromises = querySnapshot.docs.map(async (listingDoc) => {
//       const data = listingDoc.data();
//       const host = await getUser(data.host_uuid);
//       return {
//         listing: data, // Listing data
//         host: host, // Host data
//         uuid: listingDoc.id,
//       };
//     });

//     // Wait for all promises to resolve
//     const results = await Promise.all(listingPromises);
//     return results;
//   } catch (error) {
//     console.error("Error fetching listings:", error);
//     throw new Error("Failed to fetch listings.");
//   }
// };

export const getListings = async (search) => {
  try {
    const geo_res = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        search
      )}&key=AIzaSyDOjObeKAqsOo1rCWxE0Nm7tnHjQqw20w0`
    );

    if (geo_res.data.results.length === 0) {
      return null;
    }

    const { lat, lng } = geo_res.data.results[0].geometry.location;

    // Extract state from address_components
    let state = '';
    const addressComponents = geo_res.data.results[0].address_components;

    addressComponents.forEach(component => {
      if (component.types.includes('administrative_area_level_1')) {
        state = component.long_name; // This is the full state name
        // state = component.short_name; // This would be the state abbreviation
      }
    });

    if (state === '') {
      return null;
    }

    // Step 3: Query Firestore for listings within the bounding box
    const listingsRef = collection(firestore, 'listings');
    const q = query(listingsRef, where('location.state', '==', state));

    const querySnapshot = await getDocs(q);

    let fetchedListings = [];
    querySnapshot.forEach(async (doc) => {
      const data = doc.data();
      const distance = haversineDistance(lat, lng, data.location.latitude, data.location.longitude);
      const host = await getUser(data.host)
      fetchedListings.push({ id: doc.id, host: host, listing: data, distance });
    });

    // Step 4: Sort listings by distance
    fetchedListings.sort((a, b) => a.distance - b.distance);

    return fetchedListings;
  }
  catch (ex) {
    console.log(ex.message);
  }
}

export const getListing = async (listing_uuid) => {
  const db = getFirestore();

  try {
    const listingDoc = await getDoc(doc(db, `listings/${listing_uuid}`));
    const data = listingDoc.data();
    const host = await getUser(data.host);
    return {
      listing: data, // Listing data
      host: host, // Host data
      hostId: data.host,
    };
  } catch (error) {
    console.error("Error fetching listings:", error);
    return null;
  }
};

export const getListingOnly = async (listing_uuid) => {
  const db = getFirestore();

  try {
    const listingDoc = await getDoc(doc(db, `listings/${listing_uuid}`));
    const data = listingDoc.data();
    return data;
  } catch (error) {
    console.error("Error fetching listings:", error);
    return null;
  }
}

export const getDraft = async (listing_uuid) => {
  const db = getFirestore();

  try {
    const listingDoc = await getDoc(doc(db, `drafts/${listing_uuid}`));
    const data = listingDoc.data();
    return data;
  } catch (error) {
    console.error("Error fetching listings:", error);
    return null;
  }
}

const RADIUS = 6371; // Radius of the Earth in kilometers

// Haversine formula to calculate the distance between two points
const haversineDistance = (lat1, lon1, lat2, lon2) => {
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

export const getCoordinatesFromAddress = async (address) => {
  const geocodingResponse = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=AIzaSyDOjObeKAqsOo1rCWxE0Nm7tnHjQqw20w0`
  );

  if (geocodingResponse.data.results.length === 0) {
    console.log('Address does not exist.')
    return null;
  }
  
}

// export const getListingsByAddressInRadius = async (address, radiusInKm) => {
//   try {
//     // Step 1: Geocode the search address to get latitude and longitude
//     const geocodingResponse = await axios.get(
//       `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
//         address
//       )}&key=AIzaSyDOjObeKAqsOo1rCWxE0Nm7tnHjQqw20w0`
//     );

//     if (geocodingResponse.data.results.length === 0) {
//       console.log('Address does not exist.')
//       return null;
//     }

//     const { lat, lng } = geocodingResponse.data.results[0].geometry.location;

//     const maxLat = lat + radiusInKm / RADIUS * (180 / Math.PI);
//     const minLat = lat - radiusInKm / RADIUS * (180 / Math.PI);
//     const maxLng = lng + radiusInKm / (RADIUS * Math.cos(lat * Math.PI / 180)) * (180 / Math.PI);
//     const minLng = lng - radiusInKm / (RADIUS * Math.cos(lat * Math.PI / 180)) * (180 / Math.PI);

//     // Step 3: Query Firestore for listings within the bounding box
//     const listingsRef = collection(firestore, 'listings');
//     const q = query(
//       listingsRef,
//       where('location.latitude', '>=', minLat),
//       where('location.latitude', '<=', maxLat),
//       where('location.longitude', '>=', minLng),
//       where('location.longitude', '<=', maxLng)
//     );

//     const querySnapshot = await getDocs(q);

//     let fetchedListings = [];
//     querySnapshot.forEach((doc) => {
//       const data = doc.data();
//       const distance = haversineDistance(lat, lng, data.location.latitude, data.location.longitude);
//       fetchedListings.push({ id: doc.id, ...data, distance });
//     });

//     // Step 4: Sort listings by distance
//     fetchedListings.sort((a, b) => a.distance - b.distance);

//     return fetchedListings;
//   }
//   catch (err) {
//     console.error(err);
//     return null;
//   }
// };