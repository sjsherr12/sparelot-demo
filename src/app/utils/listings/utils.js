import { AttachMoney, Cancel, Chat, Check, Delete, EventNote, ForumOutlined, Inventory, MarkChatUnread, MarkEmailUnread, MoneyOff, PublishedWithChanges, RateReview, Star, ThumbDownAlt, ThumbUpAlt, Warning } from "@mui/icons-material";
import { AccessFrequencyTypes, SpaceTypes, SpecificationsEnum, States, TimeOfDayAccessTypes } from "../optimize/utils";

export const listingMatchesFilters = (listing, filters, overrideSpaceType) => {
    // Defensive checks for required listing data
    if (!listing?.logistics || !listing?.display || !listing?.location) {
        console.warn('Listing missing required data structure:', listing);
        return false;
    }

    // Check price filter
    const price = listing.logistics.price;
    if (price === null || price === undefined || price < filters[0].min || price > filters[0].max) {
        return false;
    }

    // Check space type filter
    const spaceType = listing.logistics.spaceType;
    if (spaceType === null || spaceType === undefined) {
        console.warn('Listing missing spaceType:', listing);
        return false;
    }

    const spaceTypeName = SpaceTypes[spaceType];
    if (overrideSpaceType) {
        if (spaceTypeName !== overrideSpaceType) {
            return false;
        }
    } else {
        if (!filters[2][spaceTypeName]) {
            return false;
        }
    }

    // Check size filter
    if (filters[1]?.width !== 0 && filters[1]?.length !== 0) {
        const width = listing.logistics.width;
        const length = listing.logistics.length;

        if (width === null || width === undefined || length === null || length === undefined) {
            return false;
        }

        if (width < 0.8 * filters[1].width || width > 1.5 * filters[1].width) {
            return false;
        }

        if (length < 0.8 * filters[1].length || length > 1.5 * filters[1].length) {
            return false;
        }
    }

    // Check specifications filter
    const specifications = listing.logistics.specifications ?? 0;
    if ((specifications & filters[3]) !== filters[3]) {
        return false;
    }

    // Check access frequency filter - defensive check for undefined
    const accessFrequency = listing.display.accessFrequency;
    if (accessFrequency === null || accessFrequency === undefined) {
        console.warn('Listing missing accessFrequency:', listing);
        return false;
    }
    if (!filters[4].includes(accessFrequency)) {
        return false;
    }

    // Check time of day access filter - defensive check for undefined
    const timeOfDayAccess = listing.display.timeOfDayAccess;
    if (timeOfDayAccess === null || timeOfDayAccess === undefined) {
        console.warn('Listing missing timeOfDayAccess:', listing);
        return false;
    }
    if (!filters[5].includes(timeOfDayAccess)) {
        return false;
    }

    return true;
}

export const getConformingListings = (listings, filters, overrideSpaceType) => {
    let cl = 0;
    listings?.forEach(listing => {
        if (listingMatchesFilters(listing?.listing, filters, overrideSpaceType)) {
            cl++;
        }
    })
    return cl;
}

export const makeListingTitle = (listing) => {
    if (listing?.logistics) {
        return `${listing?.logistics?.width}' × ${listing?.logistics?.length}' ${(listing?.logistics?.spaceType !== undefined ? SpaceTypes[listing.logistics.spaceType] : '').replaceAll('_', ' ')}`
    }
    return '(loading...)'
}

export const makeListingTitleExtended = (listing) => {
    if (listing?.logistics) {
        return `${listing?.logistics?.width}' × ${listing?.logistics?.length}' ${listing?.logistics?.height ? ('× ' + listing.logistics.height + '\'') : ''} ${(listing?.logistics?.spaceType !== undefined ? SpaceTypes[listing.logistics.spaceType] : '').replaceAll('_', ' ')}`
    }
    return '(loading...)'
}

export const makeListingAddress = (listing) => {
    return `${listing?.location?.city}, ${States[listing?.location?.state || 0]}`
}

export const makeUsernameAbbreviated = (user) => {
    if (user?.personal?.firstName && user?.personal?.lastName) {
        return `${user?.personal?.firstName} ${user?.personal?.lastName[0]}.`
    }
    return 'SpareLot User'
}

export const recommendPrice = (spaceType, area) => {
    // Base prices and price per square foot
    const pricingData = {
        "Attic": { base: 50, perSqFt: 0.2 },
        "Basement": { base: 50, perSqFt: 0.2 },
        "Bedroom": { base: 55, perSqFt: 0.25 },
        "Closet": { base: 45, perSqFt: 0.2 },
        "Garage": { base: 60, perSqFt: 0.25 },
        "Carport": { base: 55, perSqFt: 0.25},
        "Storage_unit": { base: 50, perSqFt: 0.2 },
        "Shed": { base: 50, perSqFt: 0.2 },
        "Warehouse": { base: 90, perSqFt: 0.15 },
        "Driveway": { base: 55, perSqFt: 0.2 },
        "Unpaved_lot": { base: 45, perSqFt: 0.15 },
        "Parking_lot": { base: 75, perSqFt: null }, // Price per square foot not applicable
        "Parking_garage": { base: 85, perSqFt: null }, // Price per square foot not applicable
    };

    // Calculate the price
    const { base, perSqFt } = pricingData[SpaceTypes[spaceType]];
    if (perSqFt === null) {
        return base; // Use only the base price if price per square foot is not applicable
    }
    return Math.round(base + (perSqFt * area));
}

export const isElegibleForSTPP = (spaceType) => {
    if (spaceType) {
        return spaceType === SpaceTypes.indexOf('Driveway') || 
                spaceType === SpaceTypes.indexOf('Parking_garage') || spaceType === 'Parking_lot' || spaceType === 'Garage' || spaceType === 'Carport' || spaceType === 'Unpaved_lot'
    }
    return false;
}

export const isElegibleForCustomCapacity = (spaceType) => {
    if (spaceType) {
        return SpaceTypes[spaceType] === 'Parking_garage' || SpaceTypes[spaceType] === 'Parking_lot'
    }
    return false;
}

export const isInvalidListingInfo = (listing, uid) => {
    const SpecificationsEnumMask = Object.values(SpecificationsEnum).reduce((acc, value) => acc | value, 0);
  
    const isValidSpecification = (specifications) => {
      return (specifications & SpecificationsEnumMask) === specifications;
    };
  
    // Display
    if (listing?.display?.accessFrequency === null || 
        listing.display.accessFrequency === undefined || 
        listing.display.accessFrequency < 0 || 
        listing.display.accessFrequency >= AccessFrequencyTypes.length) {
      return 'Access frequency is not valid!';
    }
  
    if (!listing?.display?.images || listing.display.images.length < 5) {
      return 'Not enough images provided for this listing!';
    }
  
    if (!listing?.display?.spaceDescription || listing.display.spaceDescription.length === 0) {
      return 'No space description provided for this listing!';
    }
  
    if (listing?.display?.timeOfDayAccess === null || 
        listing?.display?.timeOfDayAccess === undefined || 
        listing.display.timeOfDayAccess < 0 || 
        listing.display.timeOfDayAccess >= TimeOfDayAccessTypes.length) {
      return 'Time of day access type is not valid!';
    }
  
    // Host check
    if (!listing?.host || listing.host !== uid) {
      return 'Listing is not being published by the host!';
    }
  
    // Location
    if (!listing?.location?.street || listing.location.street.length === 0) {
      return 'Street is not valid!';
    }
  
    if (listing?.location?.state === null || 
        listing.location.state === undefined || 
        listing.location.state < 0 || 
        listing.location.state > 50) {
      return 'State is not valid!';
    }
  
    if (listing?.location?.zip === null || 
        listing.location.zip === undefined || 
        `${listing.location.zip}`.length !== 5) {
      return 'Zip code is not valid!';
    }
  
    // Logistics
    if (listing?.logistics?.width === null || 
        listing.logistics.width === undefined || 
        !Number.isInteger(listing.logistics.width) ||
        parseInt(listing.logistics.width) <= 0 ||
        parseInt(listing.logistics.width) > 500
      ) {
      return 'Width is not valid!';
    }
  
    if (listing?.logistics?.length === null || 
        listing.logistics.length === undefined || 
        !Number.isInteger(listing.logistics.length) ||
        parseInt(listing.logistics.length) <= 0 ||
        parseInt(listing.logistics.length) > 500
      ) {
      return 'Length is not valid!';
    }
  
    if (listing?.logistics?.height !== undefined && (
      !Number.isInteger(listing.logistics.height) ||
      parseInt(listing.logistics.height) < 0 ||
      parseInt(listing.logistics.height) > 500
    )) {
      return 'Height is not valid!'
    }
  
    if (listing?.logistics?.price === null || 
        listing.logistics.price === undefined || 
        !Number.isInteger(listing.logistics.price) || 
        listing.logistics.price <= 0 || 
        listing.logistics.price > 1000) {
      return 'Price is not valid!';
    }
  
    if (listing?.logistics?.spaceType === null || 
        listing.logistics.spaceType === undefined || 
        !Number.isInteger(listing.logistics.spaceType) || 
        listing.logistics.spaceType < 0 || 
        listing.logistics.spaceType >= SpaceTypes.length) {
      return 'Space type is not valid!';
    }
  
    if (listing?.logistics?.specifications === null || 
        listing.logistics.specifications === undefined || 
        !isValidSpecification(listing.logistics.specifications)) {
      return 'Specifications are not valid!';
    }

    if (!listing?.logistics?.rentingCapacity || 
        listing?.logistics?.rentingCapacity < 1 || 
        listing?.logistics?.rentingCapacity > 500
      ) {
      return 'Renting capacity is not valid!'
    }
  
    return false;
  };

export const makeAuthUserUsernameAbbreviated = (user) => {
    const parts = user.displayName.trim().split(' ');
    
    const firstName = parts[0];
    const lastNameInitial = parts[1] ? parts[1][0] : ''; // Check if last name exists
    
    return `${firstName} ${lastNameInitial}`;
}

export const makeDateFormatted = (date) => {
    const dateObj = new Date(date);

    // Step 2: Format the date to "August 2024"
    const options = { year: 'numeric', month: 'long' };
    const formattedDate = dateObj.toLocaleString('en-US', options);
    
    return formattedDate;
}

export const makeTimestampFormatted = (ts) => {
    const date = new Date(ts || Date.now());

    const formattedDate = date.toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'long',
    });

    return formattedDate;
}

const typeIdxToTitle = [
    'System Announcement',
    'Request Notification',
    'Request Notification',
    'Request Notification',
    'Payment Notification',
    'Payment Notification',
    'Payment Notification',
    'Booking Notification',
    'Booking Notification',
    'Booking Notification',
    'Request Notification',
    'Booking Notification',
    'Social Notification',
    'Review Notification',
]

const typeIdxToSub = [
    '',
    'You have received a new request!',
    'Your reservation has been approved!',
    'Your reservation has been declined.',
    'Your payment has been processed.',
    'Your payment attempt has failed.',
    'Your payment has been refunded.',
    'Your booking has been confirmed.',
    'Your booking has been canceled.',
    'Your booking is set to end soon.',
    'A renter deleted their reservation request.',
    'A renter canceled their active booking.',
    'Someone has created a new chat with you.',
    'Someone wrote a new review on your profile!',
]

const typeIdxToFullDescription = [
    ``,
    'You have received a new rental request for your ${custom}. Check your messages to contact the new renter, confirm the booking details, and approve the rental request!',
    'Your rental request for the ${custom} has been approved! This means you will be able to start storing or parking your items on the indicated start date at the ${custom}. Please consider confirming your booking location, access hours, and other storage arrangements with your host. Thank you for storing with SpareLot.',
    'Unfortunately, your rental request for the ${custom} has been declined. This means that the host manually declined your request. Consider following up with this host on messages or keep reaching out to other hosts to find your perfect space. Thank you.',
    'SpareLot is messaging to notify you that your renter payment for the ${custom} has been processed. Thank you for renting with SpareLot!',
    'SpareLot is messaging to notify you that your renter payment attempt for the ${custom} failed. Please look into this issue as soon as possible to avoid penalty fees and late fees.',
    'SpareLot is messaging to notify you that your payment for the ${custom} has been refunded. Thank you!',
    'You have just approved a booking for your ${custom} and the booking is now confirmed. Please communicate with your renter about booking location, access hours, features, terms, and other booking arrangements. Thank you for listing your space with SpareLot.',
    'Your booking for the ${custom} has been canceled. If this cancellation was initiated by the host of the listing, you will receive a partial refund for unused booking days. Each party will be compensated in accordance with the SpareLot Terms of Service. Thank you for storing with SpareLot.',
    'Your booking for the ${custom} is set to end soon! Please communicate with your renter about the removal of their items from your property. Additionally, encourage renters who have had a positive experience to leave a review on your profile, as higher ratings lead to more bookings.',
    'Your renter has declined their own reservation request for the ${custom} after it remained unapproved. This means they will not be proceeding with this booking. Consider responding promptly to future requests to avoid missed opportunities. Thank you for listing with SpareLot.',
    'Your renter has canceled their booking for the ${custom}. They will not be refunded for the remaining unused days of the booking, but will not be charged after this point. Consider reaching out to them to discuss any issues that may have led to this cancellation. Thank you for listing with SpareLot.',
    '${custom} has created a new chat with you. They might be an interested renter or someone looking to connect. We recommend checking it out to see how you can help or engage with them.',
    '${custom} has posted a new review on your profile. Check it out to see their feedback!'
]

const typeIdxToIcon = [
    Inventory,
    MarkEmailUnread,
    ThumbUpAlt,
    ThumbDownAlt,
    AttachMoney,
    MoneyOff,
    PublishedWithChanges,
    Check,
    Cancel,
    Star,
    Delete,
    Cancel,
    MarkChatUnread,
    RateReview,
]

const typeIdxToColor = [
    '#051d40',
    '#2e89ff',
    '#36a23d',
    '#f00f00',
    '#36a23d',
    '#f00f00',
    '#2e89ff',
    '#36a23d',
    '#f00f00',
    '#2e89ff',
    '#eed202',
    '#f00f00',
    '#2e89ff',
    '#051d40',
]

export const getNotificationInfo = (notification) => {
    const isValidTypeRange = () => {
        return notification.type >= 0 && notification.type < typeIdxToTitle.length;
    }
    const isValidNotification = () => {
        return (
            notification?.type &&
            notification?.read !== undefined &&
            notification?.custom &&
            notification?.created &&
            isValidTypeRange()
        )
    }
    const formatDate = (isoString) => {
        const date = new Date(isoString);
      
        // Extract individual date components
        const month = date.getMonth() + 1; // Months are 0-indexed
        const day = date.getDate();
        const year = date.getFullYear().toString().slice(-2); // Get last 2 digits of the year
      
        // Extract individual time components
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
      
        // Determine AM or PM
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert 24-hour time to 12-hour time
      
        return `${month}/${day}/${year} ${hours}:${minutes}${ampm}`;
    }
    if (isValidNotification()) {
        let info = {
            title: typeIdxToTitle[notification.type],
            icon: typeIdxToIcon[notification.type],
            color: typeIdxToColor[notification.type],
            sub: '', 
            desc: '',
            created: formatDate(notification.created),
            read: notification.read || false,
        }
        if (info.title === 'System Announcement') 
        {
            info.sub = notification.custom;
            info.desc = notification?.fullDesc || 'Missing system notification.'; // THIS IS SPECIFIC TO ONLY SYSTEM_ANNOUNCEMENT NOTIFICATIONS, THIS PROPERTY WILL OTHERWISE NOT EXIST
        }
        else {
            info.sub = typeIdxToSub[notification.type];
            info.desc = (typeIdxToFullDescription[notification.type]).replaceAll('${custom}', notification.custom);
        }
        return info;
    }
    return {
        title:'Missing Notification',
        icon: Warning,
        color:'#eed202',
        sub: 'This notification does not exist.',
        desc:'This notification is missing information. It should not be here, in fact. Please delete this as soon as possible. Thank you.',
    }
}