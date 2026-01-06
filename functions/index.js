const admin = require('firebase-admin');
const functions = require('firebase-functions');
const stripe = require('stripe')(functions.config().stripe.live_secret_apikey)
const sendgrid = require('@sendgrid/mail')
const sendgrid_key = functions.config().sendgrid.apikey
sendgrid.setApiKey(sendgrid_key)
const mailerlite_key = functions.config().mailerlite.apikey
const mailerlite_gid = functions.config().mailerlite.signup_group_id
const imgbb_apikey = functions.config().imgbb.apikey
const google_maps_apikey = functions.config().google.maps.apikey
admin.initializeApp({
  credential:admin.credential.applicationDefault(),
})
const db = admin.firestore();
const messaging = admin.messaging();

const SpecificationsEnum = {
  Locked_area: 1,
  Security_camera_monitored: 2,
  Private_space: 4,
  Private_entrance: 8,
  Gated_or_guarded_community: 16,
  Smoke_detectors: 32,
  Climate_controlled: 64,
  Smoke_free: 128,
  Pet_free: 256,
  Fenced_property: 512,
  Bathroom_available: 1024,
  Water_access: 2048,
  EV_charging: 4096,
  No_stairs: 8192,
  Elevator: 16384,
  Wheelchair_accessible: 32768,
};

const SpaceTypes = [
  "Garage",
  "Storage_unit",
  "Warehouse",
  "Carport",
  "Parking_garage",
  "Parking_lot",
  "Driveway",
  "Unpaved_lot",
  "Shed",
  "Attic",
  "Basement",
  "Bedroom",
  "Closet",
];

const AccessFrequencyTypes = [
  "Daily",
  "Weekly",
  "Monthly",
  "Infrequently",
];

const TimeOfDayAccessTypes = [
  "Daytime Hours",
  "Evening Hours",
  "All Hours (24/7)",
]

const ReservationStatus = {
  Declined:0,
  Pending: 1,
  Approved:2,
  Canceled:3,
}

const States = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 
  'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 
  'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 
  'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

const notificationTypeIdxToTitle = [
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

const notificationTypeIdxToSub = [
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

const notificationTypeIdxToFullDescription = [
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

const makeEmailNotification = (title, caption, subtext, button, link) => (
  `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>SpareLot Notification</title></head><body style="font-family: Montserrat, sans-serif; background-color: #f4f4f4; padding: 20px; margin: 0;"><table align="center" width="100%" style="max-width: 600px; background: #ffffff; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0,0,0,0.1);"><tr><td style="background: #051d40; padding: 20px; border-top-left-radius: 8px; border-top-right-radius: 8px; text-align: center;"><h1 style="color: #ffffff; font-size: 22px; margin: 0;">${title}</h1></td></tr><tr><td style="padding: 20px; text-align: center;"><p style="font-size: 18px; color: #333333; font-weight: 500; margin: 0;">${caption}</p><p style="font-size: 16px; color: #666666; line-height: 1.5; margin-top: 10px;">${subtext}</p></td></tr><tr><td style="text-align: center; padding-bottom: 30px;"><a href="${link}" style="background: #051d40; color: #ffffff; text-decoration: none; padding: 12px 24px; font-size: 18px; font-weight: 600; border-radius: 6px; display: inline-block; margin-top: 10px;">${button}</a></td></tr><tr><td style="text-align: center; padding: 20px; font-size: 14px; color: #888888; border-top: 1px solid #dddddd;">SpareLot &bull; Safe, convenient & affordable storage</td></tr></table></body></html>`
)

const sendPushNotification = async (userId, title, body) => {
  try {
    const userDoc = await admin.firestore().collection('users').doc(userId).get();
    const fcmToken = userDoc.get('fcmToken');

    if (!fcmToken) {
      return;
    }

    const payload = {
      notification: {
        title,
        body,
      },
      token: fcmToken,
    };

    await messaging.send(payload);
  } catch (err) {
    console.error(`Error sending push to ${userId}:`, err);
  }
};

const sendAppNotification = async (toUserID, typeID, custom) => {
  const newNotification = {
    created: Date.now(),
    custom: custom,
    read: false,
    type: typeID,
  };

  await admin.firestore()
    .collection('users')
    .doc(`${toUserID}`)
    .collection('notifications')
    .add(newNotification);

  await sendPushNotification(
    toUserID,
    notificationTypeIdxToTitle[typeID],
    notificationTypeIdxToSub[typeID],
  )
}

const getDayPricing = (input, price) => {
  const x = typeof input === 'string' ? parseInt(input) : input; // represents # of days
  if (x <= 0) return 0;
  const percentage = ((100*(1 - (Math.pow(2, (-3 * Math.pow(x/32, 0.82)))))) + (0.38 * x) + 2.5)/100.00
  return percentage * price; // percentage of total fee to charge
}

const isInvalidListingInfo = (listing, uid) => {

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

exports.add_to_mailerlite = functions.https.onCall(async (data, context ) => {
  try {
    const {email, firstName, lastName} = data;

    if (!email || !firstName || !lastName) {
      throw new Error(`Missing information provided`)
    }
  
    const mailerlite_add_response = await fetch(
      `https://connect.mailerlite.com/api/subscribers`,
      {
        method:'POST',
        headers: {
          'Authorization': `Bearer ${mailerlite_key}`,
          'Content-Type':`application/json`,
        },
        body: JSON.stringify ({
          email,
          fields: {
            name:firstName,
            last_name:lastName,
          },
          groups: [mailerlite_gid],
        }),
      }
    )

    if (!mailerlite_add_response.ok) {
      const errMsg = await mailerlite_add_response.json();
      throw new Error(errMsg)
    }

    return {
      error:false,
    }
  }
  catch (err) {
    return {
      error:err.message
    }
  }
})

exports.create_user_account = functions.https.onCall(async (data, context) => {
  try {
    const {email, password, firstName, lastName} = data;
    
    if (!email || !password || !firstName || !lastName) {
      throw new Error('Missing registration info. Please fill out the entire form before submitting.')
    }

    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName:`${firstName} ${lastName}`
    });

    await admin.firestore().collection(`users`).doc(userRecord.uid).set({
      personal: {
        firstName,
        lastName,
      },
      preferences: {
        notifications: {
          app: {
            chats:true,
            reservations:true,
            reviews:true,
          },
          email: {
            chats:true,
            reservations:true,
            reviews:true,
          }
        }
      }
    })

    const mailerlite_add_response = exports.add_to_mailerlite.run({email, firstName, lastName}, context);

    if (mailerlite_add_response.error) {
      const errMsg = mailerlite_add_response.error;
      throw new Error(errMsg);
    }

    return {
      error:null,
    }
  }
  catch (err) {
    return {
      error:err.message,
    }
  }
})

exports.create_chat_for_users = functions.https.onCall(async (data, context) => {
  try {
    if (!(context?.auth?.uid)) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be logged in to create a chat');
    }

    const { participant1Id, participant2Id, reservationId } = data;

    if (!participant1Id || !participant2Id) {
      throw new functions.https.HttpsError('invalid-argument', 'Both participant IDs are required');
    }

    if (participant1Id === participant2Id) {
      throw new functions.https.HttpsError('invalid-argument', 'You cannot create a chat with yourself');
    }

    if (participant1Id !== context.auth.uid && participant2Id !== context.auth.uid) {
      throw new functions.https.HttpsError('invalid-argument', 'You must be one of the participants in this chat');
    }

    const createUser_ref = db.collection('users').doc(`${context?.auth?.uid}`);
    const createUser_doc = await createUser_ref.get();
    const createUser_data = createUser_doc.data();

    if (!createUser_doc.exists) {
      throw new functions.https.HttpsError('not-found', 'The account you are logged into has no registered profile');
    }

    const otherUserId = participant1Id === context.auth.uid ? participant2Id : participant1Id;
    const otherUser_ref = db.collection('users').doc(`${otherUserId}`);
    const otherUser_doc = await otherUser_ref.get();
    const otherUser_data = otherUser_doc.data();

    if (otherUser_data?.extra?.blocked?.includes(context.auth.uid)) {
      throw new functions.https.HttpsError('permission-denied', 'You are not allowed to create a chat with this user');
    }

    const otherUser_doc_ref = db.collection('users').doc(otherUserId);
    const otherUser_doc_check = await otherUser_doc_ref.get();
    if (!otherUser_doc_check.exists || !otherUser_doc_check.data().notifications) {
      await otherUser_doc_ref.set({ notifications: [] }, { merge: true });
    }

    const chatsRef = db.collection('chats');
    const querySnapshot1 = await chatsRef.where('participants', '==', [participant1Id, participant2Id]).get();
    const querySnapshot2 = await chatsRef.where('participants', '==', [participant2Id, participant1Id]).get();

    let chatId;
    let existingReservationId;

    // Check if chat already exists
    if (!querySnapshot1.empty || !querySnapshot2.empty) {
      const existingChatDoc = (!querySnapshot1.empty ? querySnapshot1 : querySnapshot2).docs[0];
      const existingChatData = (await existingChatDoc.ref.get()).data();
      chatId = existingChatDoc.id;
      existingReservationId = existingChatData?.reservationId;

      if (reservationId) {
        const associatedReservationRef = db.collection('reservations').doc(existingChatData?.reservationId ?? 'nonexistent_path_sub');
        const associatedReservationDoc = await associatedReservationRef.get();
        const associatedReservationData = associatedReservationDoc.data();

        if (!associatedReservationDoc.exists || [0, 3].includes(associatedReservationData?.status)) {
          await existingChatDoc.ref.set({ reservationId }, { merge: true });
          existingReservationId = reservationId;
        }
      }
    } else {
      // Create new chat document
      const chatRef = chatsRef.doc();
      chatId = chatRef.id;

      // Set up initial chat document with participants only
      await chatRef.set({
        participants: [participant1Id, participant2Id],
        ...(reservationId && { reservationId })
      });

      // Send notifications to the other user
      const first = createUser_data?.personal?.firstName;
      const last = createUser_data?.personal?.lastName;

      if (otherUser_data?.preferences?.notifications?.app?.chats) {
        const notificationIDType = 12;
        const custom = first && last ? `${first} ${last}` : 'A user';
        await sendAppNotification(otherUserId, notificationIDType, custom);
      }

      if (otherUser_data?.preferences?.notifications?.email?.chats) {
        const other_user_record = await admin.auth().getUser(otherUserId);
        const other_user_email = other_user_record.email;

        const new_chat_email = {
          to: other_user_email,
          from: 'admin@sparelot.com',
          subject: 'You have a new chat on SpareLot!',
          html: makeEmailNotification(
            'New chat on SpareLot!', 
            `${first && last ? (first + ' ' + last) : 'A user'} has started a conversation with you.`,
            `Open the chat to view their message, ask any questions, and continue the conversation at your convenience.`,
            'View Chat',
            `https://sparelot.com/messages/${chatId}`      
          )
        };
        const sg_res = await sendgrid.send(new_chat_email);
      }
    }

    return {
      chatId,
      reservationId: existingReservationId || reservationId,
    };
  } catch (error) {
    console.error('Error creating or retrieving chat:', error.message);
    throw new functions.https.HttpsError('internal', `Error creating or retrieving chat: ${error.message}`);
  }
});

exports.create_listing = functions.https.onCall(async (data, context) => {
  try {
    const {
      spaceType,
      specifications,
      street,
      city,
      state,
      zip,
      propertyType,
      spaceDescription,
      width,
      length,
      height,
      appointmentsRequired,
      timeOfDayAccess,
      accessFrequency,
      monthlyPrice,
      // minimumPrice,
      oneTimePricing,
      // isDynamicPricing,
      // isDiscountedPrice,
      rentingCapacity,
      photos, // Expecting this to be an array of blobs

      isDraft,
    } = data;

    if (!context.auth || !context.auth.uid) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated.');
    }

    if (!context.auth.token.email_verified) {
      throw new functions.https.HttpsError('unauthenticated', 'You must have a verified email in order to create a listing. If your email was recently verified, please try again later. We apologize for the inconvenience.')
    }

    const bad_info = isInvalidListingInfo({
      host: context.auth.uid,
      display: {
        spaceDescription,
        appointmentsRequired,
        timeOfDayAccess,
        accessFrequency,
        images: photos,
      },
      location: {
        street,
        city,
        state,
        zip,
      },
      logistics: {
        rentingCapacity,
        length,
        width,
        height,
        price: monthlyPrice,
        // minimumPrice: minimumPrice || null,
        // isDynamicPricing,
        // isDiscountedPrice,
        oneTimePricing,
        spaceType,
        propertyType,
        specifications,
      },
    }, context.auth.uid)

    if (bad_info) { 
      throw new functions.https.HttpsError('not-found', bad_info);
    }

    const hostUuid = context.auth.uid;
    const host_ref = admin.firestore().collection('users').doc(`${hostUuid}`);
    const host_data = (await host_ref.get()).data();

    let listingRef;

    if (isDraft) {
      listingRef = admin.firestore().collection('drafts').doc();
    }
    else {
      listingRef = admin.firestore().collection('listings').doc();
    }

    const listingId = listingRef.id;

    const address = `${street}, ${city}, ${States[state]} ${zip}`;

    // Fetch the coordinates using Google Maps API
    const geo_res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${google_maps_apikey}`
    );

    const geodata = await geo_res.json();

    let lat = 0;
    let lon = 0;

    if (geodata.status === 'OK' && geodata.results.length > 0) {
      lat = geodata.results[0].geometry.location.lat;
      lon = geodata.results[0].geometry.location.lng;
    } else {
      throw new functions.https.HttpsError(
        'not-found',
        'Unable to resolve coordinates for the given address.'
      );
    }

    const url = `https://api.imgbb.com/1/upload?key=${imgbb_apikey}`;

    const imageUploadPromises = photos.map(async (photo, index) => {
      const { base64 } = photo;

      // Make the API call
      const imgbb_res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `image=${encodeURIComponent(base64)}`, // Send the image as URL-encoded base64 string
      });

      if (!imgbb_res.ok) {
        throw new functions.https.HttpsError('not-found', imgbb_res.statusText);
      }

      const imgbb_data = await imgbb_res.json();

      return imgbb_data.data.url;
    });

    // Wait for all images to be uploaded and URLs generated
    const imageUrls = await Promise.all(imageUploadPromises);

    const listingData = {
      host: hostUuid,
      display: {
        spaceDescription,
        appointmentsRequired,
        timeOfDayAccess,
        accessFrequency,
        images: imageUrls,
      },
      location: {
        street,
        city,
        state,
        zip,
        latitude: lat,
        longitude: lon,
      },
      logistics: {
        rentingCapacity: parseInt(rentingCapacity),
        length,
        width,
        height,
        price: monthlyPrice,
        // minimumPrice: minimumPrice || null,
        // isDynamicPricing,
        // isDiscountedPrice,
        oneTimePricing,
        spaceType,
        propertyType,
        specifications,
      },
    };

    await listingRef.set(listingData);

    if (!isDraft) {
      if (!host_data?.hosting?.signUpDate) {
        await host_ref.set({
          hosting:{
            signUpDate: (new Date()).getTime(),
          }
        }, {merge:true})
      }
    }

    return {
      error:false,
      listingId,
    }
  } catch (error) {
    console.error('Error creating listing:', error);

    return {
      error:true,
      message:error.message || 'An unknown error occurred'
    };
  }
});

exports.unpublish_listing = functions.https.onCall(async (data, context) => {
  try {
    if (!context?.auth?.uid) {
      throw new functions.https.HttpsError('unauthenticated', 'You are not logged in to unpublish a listing');
    }

    const { listingId } = data;

    const listing_ref = db.collection('listings').doc(listingId);
    const listing_doc = await listing_ref.get();

    if (!listing_doc.exists) {
      throw new Error('Listing to unpublish does not exist');
    }

    const listing_data = listing_doc.data();

    if (listing_data?.host !== context?.auth?.uid) {
      throw new Error('The listing you are trying to unpublish is not your own');
    }

    const reservations_ref = db.collection('reservations');

    const pending_reservations = await reservations_ref
      .where('listing', '==', listingId)
      .where('status', '==', 1)
      .get();
    const active_reservations = await reservations_ref
      .where('listing', '==', listingId)
      .where('status', '==', 2)
      .get();
      
    if (pending_reservations.docs.length + active_reservations.docs.length > 0) {
      throw new Error('You cannot unpublish this listing, as there are pending or active reservations associated with it');
    }

    await db.runTransaction(async (transaction) => {
      const draftDocRef = db.collection('drafts').doc(listing_doc.id);
      transaction.set(draftDocRef, listing_data);
      transaction.delete(listing_ref);
    });

    return {
      error: false,
      message: 'Listing successfully moved to drafts! You can now edit this unpublished listing in your drafts until it is ready to be published again'
    };
  } catch (error) {
    console.error('Error during unpublishing:', error);
    return {
      error: true,
      message: error.message,
    };
  }
});

exports.delete_listing = functions.https.onCall(async (data, context) => {
  try {
    if (!context?.auth?.uid) {
      throw new functions.https.HttpsError('unauthenticated', 'You are not logged in to delete a listing.')
    }

    const {listingId} = data;

    // TODO:
    // check that listing exists, that listing host is ctx auth id
    // for whatever reservations are active with this listing, call cancel_reservation on them
    // for whichever are pending, call decline_reservation as an alternative mimicking action
    // for each renter that had a reservation, send a notification (nevermind: already done by functions above)
    // delete listing doc after all data that needs to be processed has been.

    const listing_ref = db.collection('listings').doc(`${listingId}`);
    const listing_doc = await listing_ref.get();
    const listing_data = listing_doc.data();

    if (!listing_doc.exists) {
      throw new Error('The listing you are trying to delete does not exist');
    }

    if (!listing_data?.host || listing_data.host !== context.auth.uid) {
      throw new Error('You are not the host of this listing to delete it')
    }

    const active_reservations = db.collection('reservations')
      .where('listing', '==', `${listingId}`)
      .where('status', '==', ReservationStatus.Approved)
      .get();

    (await active_reservations).forEach(async (active_res) => {
      await exports.cancel_reservation.run({
        reservationId: active_res.id,
      }, context)
    })

    const pending_reservations = db.collection('reservations')
      .where('listing', '==', `${listingId}`)
      .where('status', '==', ReservationStatus.Pending)
      .get();

    (await pending_reservations).forEach(async (pending_res) => {
      await exports.decline_reservation.run({
        reservationId: pending_res.id,
      }, context)
    })

    listing_ref.delete();

    const all_data_available = listing_data?.logistics && listing_data.logistics?.width && listing_data.logistics?.length && listing_data.logistics?.spaceType;
    const listing_title = all_data_available ? `${listing_data.logistics.width}' × ${listing_data.logistics.length}' ${listing_data.logistics.height && ('× ' + listing_data.logistics.height + '\'')} ${SpaceTypes[listing_data.logistics.spaceType].replaceAll('_', ' ')}` : 'listing'

    return {
      error:false,
      message:`You have deleted your ${listing_title}. If you have not already, please notify renters that had pending or active reservations of the reason why their reservations were suddenly declined and canceled. Thank you for listing with SpareLot.`
    }
  }
  catch (error) {
    return {
      error:true,
      message:error.message,
    }
  }
})

exports.create_reservation = functions.https.onCall(async (data, context) => {
  const db = admin.firestore(); // Ensure db is defined here
  const reservationRef = db.collection('reservations'); // For ease of reference

  try {
    if (!context?.auth?.uid) {
      throw new functions.https.HttpsError('unauthenticated', 'You are not logged in to create a reservation request.');
    }

    const {
      listingId,
      dateRange,
      storeDesc,
      fullName,
      address,
      idPicture,
      payment_id,
      user_email,
    } = data;

    const listing_ref = db.collection('listings').doc(`${listingId}`);
    const listing_doc = await listing_ref.get();
    const listing_data = listing_doc.data();

    if (!listing_doc.exists) {
      throw new Error('Listing does not exist.');
    }

    if (context.auth.uid === listing_data.host) {
      throw new Error('Host cannot rent their own listing!');
    }

    if (!(dateRange?.length === 2)) {
      throw new Error('Invalid date range for reservation provided.');
    }

    const renter_ref = db.collection('users').doc(`${context.auth.uid}`);
    const renter_doc = await renter_ref.get()
    const renter_data = renter_doc.data()

    if (!renter_doc.exists || !renter_data) {
      throw new Error('You must add info to your profile to file this reservation!');
    }

    if (renter_data?.extra?.blocked?.includes(listing_data.host)) {
      throw new Error('You cannot create a reservation request with a user you have blocked. Please unblock them in order to create a request.');
    }

    const host_ref = db.collection('users').doc(`${listing_data.host}`);
    const host_doc = await host_ref.get();
    const host_data = host_doc.data();

    if (!host_doc.exists || !host_data) {
      throw new Error('The owner of this listing does not exist!');
    }

    if (host_data?.extra?.blocked?.includes(context.auth.uid)) {
      throw new Error('You are not allowed to make reservation requests on this listing.');
    }

    const getDays = () => {
      const startDate = new Date(dateRange[0]);
      const endDate = new Date(dateRange[1]);
      const oneDay = 1000 * 60 * 60 * 24;
      const diffInTime = endDate - startDate;
      const diffInDays = Math.floor(diffInTime / oneDay);
      if (diffInDays < 0) {
        return 0;
      }
      return diffInDays;
    };

    if (!getDays() || (!listing_data?.logistics?.oneTimePricing && getDays() < 7)) {
      throw new Error('Not enough days provided in reservation request.');
    }

    const url = `https://api.imgbb.com/1/upload?key=${imgbb_apikey}`;
    const imgbb_res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `image=${encodeURIComponent(idPicture)}`,
    });

    if (!imgbb_res.ok) {
      throw new Error(`ImgBB: ${imgbb_res.statusText}`);
    }

    const imgbb_data = await imgbb_res.json();

    if (!payment_id || !user_email) {
      throw new Error(`Payment data provided with missing info.`);
    }

    const customer = await stripe.customers.create({
      payment_method: payment_id,
      email: user_email,
      invoice_settings: {
        default_payment_method: payment_id,
      },
    });

    const reservation_data = {
      renter: context.auth.uid,
      listing: listingId,
      startDate: new Date(dateRange[0]).getTime(),
      endDate: new Date(dateRange[1]).getTime(),
      storeDesc,
      fullName,
      address,
      idPicture: imgbb_data.data.url,
      status: 1, // pending
      customer: customer.id,
    };

    const reservation_ref = await reservationRef.add(reservation_data);  // Creates reservation

    // Create a chat for users
    const create_chat_res = await exports.create_chat_for_users.run({
      participant1Id: context.auth.uid,
      participant2Id: listing_data.host,
      reservationId: reservation_ref.id,
    }, context);

    if (create_chat_res?.reservationId !== reservation_ref.id) {
      await reservation_ref.delete();
      throw new Error('You already have an ongoing reservation for this listing with this host. Check your messages and filled out reservation requests.');
    }

    // Get the chat document and check if there are any messages from this user
    const chat_doc_ref = db.collection('chats').doc(`${create_chat_res.chatId}`);
    const messagesRef = chat_doc_ref.collection('messages');

    // Query for messages from the current user
    const userMessagesQuery = await messagesRef
      .where('senderId', '==', context.auth.uid)
      .limit(1)
      .get();

    // Only send the introductory message if the user hasn't sent any messages yet
    if (userMessagesQuery.empty) {
      const listing_title = `${listing_data.logistics.width}' × ${listing_data.logistics.length}' ${listing_data.logistics.height && ('× ' + listing_data.logistics.height + '\'')} ${SpaceTypes[listing_data.logistics.spaceType].replaceAll('_', ' ')}`;

      // Add the message to the subcollection
      await messagesRef.add({
        message: `Hi, my name is ${fullName}, and I am interested in your ${listing_title}! I have filled out a rental request that is linked to this chat. Please let me know if you have any questions. Thank you!`,
        senderId: context.auth.uid,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        type: "text",
        readBy: [context.auth.uid], // Mark as read by sender
        edited: false,
        deleted: false
      });
    }

    // Setting notifications on host's profile
    if (host_data?.preferences?.notifications?.app?.reservations) {
        const notificationIDType = 1;
        const custom = `${listing_title}`;
        await sendAppNotification(`${listing_data?.host}`, notificationIDType, custom);
    }
    if (host_data?.preferences?.notifications?.email?.reservations) {
      const host_user_record = await admin.auth().getUser(listing_data.host);
      const host_email = host_user_record.email;
      const reservation_email = {
        to: host_email,
        from: 'admin@sparelot.com',
        subject: 'New SpareLot Reservation Request!',
        html: makeEmailNotification(
          'New Reservation Request on SpareLot!', 
          `${fullName} has requested to store items in your ${listing_title}.`,
          `The requested storage period is from ${(new Date(reservation_data?.startDate)).toLocaleDateString()} to ${(new Date(reservation_data?.endDate)).toLocaleDateString()}. Review the request, communicate with the renter, and approve the reservation.`,
          'Go to Reservation Chat',
          `https://sparelot.com/messages/${create_chat_res?.id}`      
        )
      };

      const sg_res = await sendgrid.send(reservation_email);
    }

    return {
      newChatId: create_chat_res.chatId,
      requestId: reservation_ref.id,
    };
  } catch (error) {
    throw new functions.https.HttpsError('internal', error.message);
  }
});

exports.approve_reservation = functions.https.onCall(async (data, context) => {
  try {
    if (!context.auth.uid) {
      throw new functions.https.HttpsError('unauthenticated', 'Non valid context.auth provided');
    }
    
    const { reservationId } = data;

    // Retrieve the specific reservation document
    // ------------------------------------------------------------------ //
    const reservation_ref = db.collection('reservations').doc(`${reservationId}`);
    const reservation_doc = await reservation_ref.get();
    const reservation_data = reservation_doc.data();

    const reservation_startDate_GMT = (new Date(reservation_data.startDate));
    const reservation_startDate = (new Date(reservation_startDate_GMT.setHours(reservation_startDate_GMT.getHours()+24)));
    const reservation_endDate_GMT = (new Date(reservation_data.endDate))
    const reservation_endDate = (new Date(reservation_endDate_GMT.setHours(reservation_endDate_GMT.getHours()+24)));

    const rr_ar_checks = () => {
      if (!reservation_doc.exists) {
        return 'Reservation document not found!'
      }
      if (!reservation_data?.status || reservation_data.status !== 1) {
        return 'Reservation document cannot be approved! It has been declined, canceled or previously approved!'
      }
      if (isNaN(reservation_startDate) || isNaN(reservation_endDate)) {
        return 'Reservation document provided with invalid dates!'
      }
      if (reservation_startDate < (new Date()).setUTCHours(0,0,0,0)) {
        return `Reservation Start Date is in the past! Please ${reservation_data.renter === context.auth.uid ? 'either "delete" your own reservation request or tell your host to decline it. After this, you may fill out a new request for this listing.' : 'decline this reservation so the renter can fill out a new one if they are still interested.'}`
      }
      if (reservation_endDate < (new Date()).setUTCHours(0,0,0,0)) {
        return 'Reservation End Date is in the past! Please fill out a new reservation (If you are the host, decline this reservation)! '
      }
      if (reservation_endDate < reservation_startDate) {
        return 'Reservation End Date is before the reservation Start Date! Please fill out a new reservation (If you are the host, decline this reservation)! '
      }
      if (!reservation_data?.renter) {
        return 'Reservation has no associated renter!'
      }
      if (!reservation_data?.listing) {
        return 'Reservation has no associated listing!'
      }
      if (!reservation_data?.customer) {
        return 'Reservation has no customer to charge for monthly billing!'
      }
      return null
    }

    const rr_ar_checks_res = rr_ar_checks();
    if (rr_ar_checks_res) {
      return {
        error:true,
        message:rr_ar_checks_res,
      }
    }
    // ------------------------------------------------------------------ //

    // get this i need it for checks before
    const listing_ref = db.collection('listings').doc(`${reservation_data.listing}`)
    const listing_doc = await listing_ref.get()
    const listing_data = listing_doc.data();

    // Check for any overlapping approved reservations, if so, if they are less than the renting capacity.
    // ------------------------------------------------------------------ //
    const reservations_ref = db.collection('reservations');

    // Query for potentially overlapping reservations
    const overlapping_reservations = await reservations_ref
      .where('listing', '==', reservation_data.listing)
      .where('status', '==', ReservationStatus.Approved) // Approved reservations
      .where('startDate', '<=', reservation_endDate) // New reservation starts before or on an existing reservation's end date
      .where('endDate', '>=', reservation_startDate) // New reservation ends after or on an existing reservation's start date
      .get();
    
    if (overlapping_reservations.docs.length >= listing_data?.logistics?.rentingCapacity) {
      return {
        error:true,
        message:`Could not approve booking: There are already ${overlapping_reservations.docs.length} overlapping reservations, equal to or more than your renting capacity of ${listing_data?.logistics?.rentingCapacity} renters. Please wait until new dates open up.`
      }
    }
    // ------------------------------------------------------------------ //

    // listing doc error checking
    // ------------------------------------------------------------------ //

    const ld_ar_checks = () => {
      if (!listing_doc.exists) {
        return 'Listing document does not exist!'
      }
      if (!listing_data?.logistics?.price) {
        return 'Listing does not have an associated price!'
      }
    }

    const ld_ar_checks_res = ld_ar_checks();
    if (ld_ar_checks_res) {
      return {
        error:true,
        message:ld_ar_checks_res
      }
    }
    // ------------------------------------------------------------------ //



    // host doc creation, error checking
    // ------------------------------------------------------------------ //
    const host_doc_ref = db.collection('users').doc(`${listing_data.host}`);
    const host_doc = await host_doc_ref.get();
    const host_doc_data = host_doc.data();

    const hd_ar_checks = () => {
      if (!host_doc.exists) {
        return 'Host user file not found.'
      }
      if (!host_doc_data?.stripeAccountId) {
        return 'You need to connect a billing account in order to accept reservation requests! Go to your hosting dashboard to setup your Stripe bank connection.'
      }
      if (host_doc_data?.extra?.blocked?.includes(reservation_data?.renter)) {
        return 'You cannot approve this reservation, as you have this renter blocked. The renter needs to be able to contact you during the reservation. Please unblock them if you would like to approve their reservation.'
      }
      return null;
    }

    const hd_ar_checks_res = hd_ar_checks();
    if (hd_ar_checks_res) {
      return {
        error:true,
        message:hd_ar_checks_res
      }
    }
    // ------------------------------------------------------------------ //

    // renter doc: just make sure the renter didn't block the host, and that their file exists
    // ------------------------------------------------------------------ //
    const renter_doc_ref = db.collection('users').doc(`${reservation_data?.renter}`);
    const renter_doc = await renter_doc_ref.get();
    const renter_doc_data = renter_doc.data();

    const rd_ar_checks = () => {
      if (!renter_doc.exists) {
        return 'Renter user file not found.'
      }
      if (renter_doc_data?.extra?.blocked?.includes(listing_data?.host)) {
        return 'You cannot approve this reservation, as the renter has blocked you. We are not sure why this renter blocked you, but if they cannot contact you, they cannot have a reservation with you.'
      }
    }

    const rd_ar_checks_res = rd_ar_checks();
    if (rd_ar_checks_res) {
      return {
        error:true,
        message:rd_ar_checks_res,
      }
    }
    // ------------------------------------------------------------------ // 
    
    const getMonths = () => {
      if (reservation_data?.startDate && reservation_data?.endDate) {
          const startDate = new Date(reservation_data.startDate);
          const endDate = new Date(reservation_data.endDate);
          // Get the years, months, and days from both dates
          const startYear = startDate.getFullYear();
          const startMonth = startDate.getMonth(); // 0-indexed
          const startDay = startDate.getDate();
          
          const endYear = endDate.getFullYear();
          const endMonth = endDate.getMonth(); // 0-indexed
          const endDay = endDate.getDate();
  
          // Calculate the total month difference, considering years
          let monthDifference = (endYear - startYear) * 12 + (endMonth - startMonth);
  
          // Adjust for days: If the end day is greater than the start day, add 1 month
          if (endDay > startDay && monthDifference > 0) {
              monthDifference++;
          }
          if (endDay < startDay && monthDifference === 1) {
              monthDifference--;
          }
          return Math.max(monthDifference, 0);
      }
      return 0; 
    }

    const getDays = () => {
      if (reservation_data?.startDate && reservation_data?.endDate) {
          const startDate = new Date(reservation_data.startDate);
          const endDate = new Date(reservation_data.endDate);
          const oneDay = 1000 * 60 * 60 * 24;
          const diffInTime = endDate - startDate; // No Math.abs(), so difference can be negative
          const diffInDays = Math.floor(diffInTime / oneDay); // Use Math.floor instead of Math.ceil
          if (diffInDays < 0) {
              return 0;
          }
          return diffInDays; // This will return the correct number of days
      }
      return 0;
    };   

    const onlyMonths = getMonths() >= 1;

    const transactionalFee = (input) => {
      const x = typeof input === 'string' ? parseFloat(input) : input;
      const percentage = 14 + (10 * (Math.exp(-0.013 * x))) - (0.012 * x);
      const fee = (percentage/100) * x;
      const formattedFee = fee.toFixed(2);
      return formattedFee
    }

    const getDayPrice = () => {
        const days = getDays();
        const price = getDayPricing(days, listing_data.logistics.price);
        return price;
    }
    
    const getSpareLotPrice = () => { 
        if (onlyMonths) {
          return parseFloat(transactionalFee(listing_data.logistics.price)).toFixed(2)
        }
        return parseFloat(transactionalFee(getDayPrice())).toFixed(2)
    }
    
    const getTotalPrice = () => {
      return ((onlyMonths ? parseFloat(listing_data.logistics.price) : parseFloat(getDayPrice())) + parseFloat(getSpareLotPrice())).toFixed(2)
    }

    let recurring_total = getTotalPrice();

    // this extra preprocessing needs to be done, the getTotalPrice !onlyMonths switch is just to give it a fallback value i guess
    if (!onlyMonths) {
      function getDaysInMonthFromDate(date) {
        const year = date.getFullYear();
        const month = date.getMonth(); // Month is 0-indexed
        return new Date(year, month + 1, 0).getDate();
      }
      recurring_total *= parseFloat(getDaysInMonthFromDate(reservation_startDate))
      recurring_total /= parseFloat(getDays())
    }

    // Create a product for the recurring subscription
    const product = await stripe.products.create({
      name: `Renting_Payment_Cycle_${reservation_data.listing}`,
    });

    // Set up the price object for monthly recurring payments
    const price = await stripe.prices.create({
      unit_amount: parseInt(recurring_total * 100), // e.g., 13759 for $137.59 per month
      currency: 'usd',
      recurring: { interval:'month', interval_count:1 },
      product: product.id,
    });

    const trialEndDate = new Date(reservation_startDate);
    const cancelAtDate = new Date(reservation_endDate);

    // Create the subscription with monthly billing after the trial period
    const subscription = await stripe.subscriptions.create({
      customer: reservation_data.customer,
      items: [{ price: price.id }],
      trial_end: Math.floor(trialEndDate.getTime() / 1000),
      proration_behavior: 'none',
      cancel_at: Math.floor(cancelAtDate.getTime() / 1000),
      payment_behavior: 'default_incomplete',
      transfer_data: { destination: host_doc_data.stripeAccountId },
      application_fee_percent: parseFloat(((getSpareLotPrice() / recurring_total) * 100) + 4).toFixed(2),
    });

    reservation_ref.set({
      subscription: subscription.id,
      status:2,
    }, {merge:true})

    // tell renter they got approved
    const listing_title = `${listing_data?.logistics?.width}' × ${listing_data?.logistics?.length}' ${listing_data?.logistics?.height && ('× ' + listing_data?.logistics?.height + '\'')} ${SpaceTypes[listing_data?.logistics?.spaceType].replaceAll('_', ' ')}`

    if (renter_doc_data?.preferences?.notifications?.app?.reservations) {
      const notificationIDType = 2;
      const custom = `${listing_title}`
      await sendAppNotification(`${reservation_data?.renter}`, notificationIDType, custom);
    }
    if (renter_doc_data?.preferences?.notifications?.email?.reservations) {
      const renter_user_record = await admin.auth().getUser(`${reservation_data?.renter}`); 
      const renter_user_email = renter_user_record.email;
      const QSS_reservationChat = await db.collection('chats').where('reservationId', '==', reservationId).get();
      const reservationChat_ID = QSS_reservationChat?.docs[0]?.id;

      const approved_res_email = {
        to: renter_user_email,
        from: 'admin@sparelot.com',
        subject: 'Your reservation requeset was approved!',
        html: makeEmailNotification(
          'Your reservation request was approved!', 
          `Your reservation request for the ${listing_title} from ${reservation_startDate_GMT.toLocaleDateString()} to ${reservation_endDate_GMT.toLocaleDateString()} was approved!`,
          `This means you will be able to start storing or parking your items on the indicated start date at the ${listing_title}. Please consider confirming your booking location, access hours, and other storage arrangements with your host. Thank you for storing with SpareLot.`,
          (reservationChat_ID ? 'Go to chat' : 'Go to messages'),
          `https://sparelot.com/messages${reservationChat_ID ? ('/' + reservationChat_ID) : ''}`      
        )
      };

      const sg_res = await sendgrid.send(approved_res_email);
    }
    
    return {
      error:false,
      message:'Successfully approved reservation! View in your active reservations in the hosting section.'
    }
  }
  catch (error) {
    return {
      error:true,
      message:error.message,
    }
  }
})

exports.decline_reservation = functions.https.onCall(async (data, context) => {
  try {
    if (!context?.auth.uid) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'User must be authenticated to cancel their reservation.'
      );
    }

    const { reservationId } = data;

    const reservation_ref = db.collection('reservations').doc(`${reservationId}`);
    const reservation_doc = await reservation_ref.get();
    const reservation_data = reservation_doc.data();

    if (!reservation_doc.exists) {
      throw new functions.https.HttpsError(
        'not-found',
        'Reservation document not found.'
      );
    }

    const startDate = (new Date(reservation_data?.startDate)).setUTCHours(23, 59, 59, 0);

    const listing_ref = db.collection('listings').doc(`${reservation_data.listing}`);
    const listing_doc = await listing_ref.get();
    const listing_data = listing_doc.data();

    const hostfile_ref = db.collection('users').doc(`${listing_data?.host}`);
    const hostfile_doc = await hostfile_ref.get();
    const hostfile_data = hostfile_doc.data();

    // renter is cancelling bc their reservation is past its date
    if (reservation_data.renter === context.auth.uid && reservation_data.status === 1 && startDate < (new Date())) {
      reservation_ref.set({
        status:0,
      }, {merge:true})
  
      const listing_title = `${listing_data.logistics.width}' × ${listing_data.logistics.length}' ${listing_data.logistics.height && ('× ' + listing_data.logistics.height + '\'')} ${SpaceTypes[listing_data.logistics.spaceType].replaceAll('_', ' ')}`

      if (hostfile_data?.preferences?.notifications?.app?.reservations) {
        const notificationIDType = 10;
        const custom = `${listing_title}`;
        await sendAppNotification(`${listing_data?.host}`, notificationIDType, custom);
      }
      if (hostfile_data?.preferences?.notifications?.email?.reservations) {
        const host_user_record = await admin.auth().getUser(`${listing_data?.host}`);
        const host_user_email = host_user_record.email;
        const QSS_reservationChat = await db.collection('chats').where('reservationId', '==', reservationId).get();
        const reservationChat_ID = QSS_reservationChat?.docs[0]?.id;

        const self_decline_email = {
          to: host_user_email,
          from: 'admin@sparelot.com',
          subject: 'A reservation request was deleted by a renter',
          html: makeEmailNotification(
            'A reservation request was deleted by a renter', 
            `A renter${reservation_data?.fullName ? ', ' + reservation_data?.fullName + ',' : ''} deleted their reservation request for one of your listings.`,
            `The renter deleted their reservation request as it had remained pending past their requested start date. Follow up with the renter to discuss why the reservation was left unchecked, and discuss a potential follow up reservation.`,
            (reservationChat_ID ? 'Go to chat' : 'Go to messages'),
            `https://sparelot.com/messages${reservationChat_ID ? ('/' + reservationChat_ID) : ''}`      
          )
        };

        const sg_res = await sendgrid.send(self_decline_email);
      }

      return {
        error:false,
        message:'You have "deleted" your own reservation request. You may fill out a new one if you are still interested in this listing. If this continues, consider finding a new space to reserve, as the host may be inactive.'
      }
    }

    if (isNaN(startDate)) {
      return {
        error:true,
        message:'Reservation start date is invalid! Please contact support: admin@sparelot.com'
      }
    }

    if (startDate < (new Date()) && reservation_data.status === 2) { // startDate is in the past and it has already been approved
      return {
        error:true,
        message:'Reservation has already started! It cannot be declined, it must be canceled.'
      }
    }

    if (!reservation_data?.status || reservation_data.status !== 1) {
      return {
        error:true,
        message:'Reservation has already been approved, declined or canceled! It must be pending to be declined.'
      }
    }

    if (!listing_doc.exists) {
      return {
        error:true,
        message:'Listing document does not exist! Please contact support: admin@sparelot.com'
      }
    }

    if (listing_data.host !== context.auth.uid) {
      return {
        error:true,
        message:'Host must be declining their reservation request!'
      }
    }

    reservation_ref.set({
      status:0,
    }, {merge:true})

    const renterfile_ref = db.collection('users').doc(`${reservation_data?.renter}`);
    const renterfile_doc = await renterfile_ref.get();
    const renterfile_data = renterfile_doc.data();

    const listing_title = `${listing_data.logistics.width}' × ${listing_data.logistics.length}' ${listing_data.logistics.height && ('× ' + listing_data.logistics.height + '\'')} ${SpaceTypes[listing_data.logistics.spaceType].replaceAll('_', ' ')}`

    if (renterfile_data?.preferences?.notifications?.app?.reservations) {
      const notificationIDType = 3;
      const custom = `${listing_title}`;
      await sendAppNotification(`${reservation_data?.renter}`, notificationIDType, custom);
    }
    if (renterfile_data?.preferences?.notifications?.email?.reservations) {
      const renter_user_record = await admin.auth().getUser(`${reservation_data?.renter}`);
      const renter_user_email = renter_user_record.email;
      const QSS_reservationChat = await db.collection('chats').where('reservationId', '==', reservationId).get();
      const reservationChat_ID = QSS_reservationChat?.docs[0]?.id;

      const res_declined_email = {
        to: renter_user_email,
        from: 'admin@sparelot.com',
        subject: 'Your reservation request was declined',
        html: makeEmailNotification(
          'Your reservation request was declined', 
          `Your reservation request for the ${listing_title} was declined by the host.`,
          `Follow up with the host to discuss why the reservation request was ultimately declined.`,
          (reservationChat_ID ? 'Go to chat' : 'Go to messages'),
          `https://sparelot.com/messages${reservationChat_ID ? ('/' + reservationChat_ID) : ''}`      
        )
      };

      const sg_res = await sendgrid.send(res_declined_email);
    }

    return {
      error:false,
      message:'Reservation has been declined! Consider following up with the renter about why you decided to decline, and to discuss anything else important.'
    }
  }
  catch (ex) {
    return {
      error:true,
      message:`Error declining reservation: ${ex.message}`
    }
  }
})

exports.cancel_reservation = functions.https.onCall(async (data, context) => {
  try {
    // 1. Authentication Check
    if (!context?.auth?.uid) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'User must be authenticated to cancel their reservation.'
      );
    }

    const { reservationId } = data;

    const reservation_ref = db.collection('reservations').doc(`${reservationId}`);
    const reservation_doc = await reservation_ref.get();
    const reservation_data = reservation_doc.data();

    const rr_ar_checks = () => {
      if (!reservation_doc.exists) {
        return 'Reservation document does not exist.'
      }
      if (!reservation_data?.status) {
        return 'Reservation has no current status.'
      }
      if (reservation_data.status !== 2) {
        return 'Reservation cannot be canceled, it is not active (It has already been canceled or declined, or is still in a pending phase).'
      }
      if (!reservation_data?.startDate || !reservation_data?.endDate) {
        return 'Reservation does not have associated dates.'
      }
    }

    const rr_ar_checks_res = rr_ar_checks();
    if (rr_ar_checks_res) {
      return {
        error:true,
        message: rr_ar_checks_res,
      }
    }

    const listing_ref = db.collection('listings').doc(`${reservation_data.listing}`);
    const listing_doc = await listing_ref.get();
    const listing_data = listing_doc.data();

    const hostIsCancelling = listing_data.host === context.auth.uid;

    if (!hostIsCancelling && context.auth.uid !== reservation_data.renter) {
      return {
        error:true,
        message:'Neither the host nor the renter are cancelling this reservation!'
      }
    }

    const otherUser_id = hostIsCancelling ? `${reservation_data?.renter}` : `${listing_data?.host}`;
    const otherUser_ref = db.collection('users').doc(otherUser_id)
    const otherUser_doc = await otherUser_ref.get();
    const otherUser_data = otherUser_doc.data();
    const otherUser_record = await admin.auth().getUser(otherUser_id)
    const otherUser_email = otherUser_record.email;

    if (!otherUser_doc.exists) {
      return {
        error:true,
        message:'Could not find the receiving end user! Please contact support: admin@sparelot.com'
      }
    }

    if ((new Date(reservation_data.startDate)).setUTCHours(23, 59, 59, 0) < (new Date()).setUTCHours(23, 59, 59, 0)) {
      // Handle host cancellation with refund for unused days
      if (hostIsCancelling) {
        const currentDate = new Date();
        const reservationStartDate = new Date(reservation_data.startDate);

        // Calculate last billing start date
        const lastBillingStartDate = new Date(reservationStartDate);
        while (lastBillingStartDate < currentDate) {
          lastBillingStartDate.setMonth(lastBillingStartDate.getMonth() + 1);
        }
        lastBillingStartDate.setMonth(lastBillingStartDate.getMonth() - 1);

        // Calculate next billing period start date
        const nextBillingPeriodStart = new Date(lastBillingStartDate);
        nextBillingPeriodStart.setMonth(nextBillingPeriodStart.getMonth() + 1);

        // Calculate unused days
        const daysUsed = Math.ceil((currentDate - lastBillingStartDate) / (1000 * 60 * 60 * 24));
        const totalDaysInBillingPeriod = Math.ceil((nextBillingPeriodStart - lastBillingStartDate) / (1000 * 60 * 60 * 24));
        const unusedDays = totalDaysInBillingPeriod - daysUsed;

        // Calculate refund amount
        const monthlyPrice = listing_data.logistics.price;
        const refundAmount = getDayPricing(unusedDays, monthlyPrice);

        // Issue refund for unused days if amount is greater than 0
        if (refundAmount > 0) {
          // Retrieve the most recent invoice for the subscription
          const invoices = await stripe.invoices.list({
            subscription: reservation_data.subscription,
            limit: 1,
          });
          const latestInvoice = invoices.data[0];

          if (latestInvoice && latestInvoice.charge) {
            await stripe.refunds.create({
              charge: latestInvoice.charge,
              amount: Math.round(refundAmount * 100), // Stripe processes in cents
            });
          }
        }
      } else {
        // Set end date to right now if renter is canceling, no refund
        reservation_data.endDate = (new Date(Date.now())).getTime();
      }
    }

    if (reservation_data?.subscription) {
      await stripe.subscriptions.cancel(reservation_data.subscription);
    }
    
    reservation_ref.set({
      status:3,
      endDate: reservation_data.endDate,
    }, {merge:true})

    const listing_title = `${listing_data.logistics.width}' × ${listing_data.logistics.length}' ${listing_data.logistics.height && ('× ' + listing_data.logistics.height + '\'')} ${SpaceTypes[listing_data.logistics.spaceType].replaceAll('_', ' ')}`

    // send notification about cancellation to the receiving (currently unaware) end

    const notificationIDType = hostIsCancelling ? 8 : 11; // based on who is cancelling: 8 is for renter cancelling, 11 is host cancelling
    const custom = `${listing_title}`

    if (otherUser_data?.preferences?.notifications?.app?.reservations) {
      await sendAppNotification(otherUser_doc.id, notificationIDType, custom);
    }
    if (otherUser_data?.preferences?.notifications?.email?.reservations) {
      const canceled_reservation_email = {
        to:otherUser_email,
        from:'admin@sparelot.com',
        subject:notificationTypeIdxToSub[notificationIDType],
        html:makeEmailNotification(
          notificationTypeIdxToTitle[notificationIDType],
          notificationTypeIdxToSub[notificationIDType],
          notificationTypeIdxToFullDescription[notificationIDType].replaceAll('${custom}', custom),
          'Go to Reservations',
          `https://sparelot.com/${hostIsCancelling ? 'hosting/bookings/canceled' : 'account/rentals/history'}`
        )
      }
      const sg_res = await sendgrid.send(canceled_reservation_email);
    }

    return {
      error:false,
      message:'Reservation has been canceled! Consider following up as to why this cancellation took place and discussing future plans, such as moving items out or booking a new date for the future.'
    }

  } catch (error) {
    return {
      error: true,
      message: `Error cancelling reservation: ${error.message}`
    };
  }
});

// Cloud Function to create Stripe account link for hosts
exports.createStripeAccountLink = functions.https.onCall(async (data, context) => {
  try {
      // Check if the user is authenticated
      if (!context.auth) {
          throw new functions.https.HttpsError(
              'unauthenticated',
              'User must be authenticated to create a Stripe account link.'
          );
      }

      const uid = context.auth.uid;  // Firebase UID from the context

      // Get the user document from Firestore
      const userDoc = await admin.firestore().collection('users').doc(uid).get();
      if (!userDoc.exists) {
          throw new functions.https.HttpsError(
              'not-found',
              'User document not found in Firestore.'
          );
      }

      let stripeAccountId = userDoc.data()?.stripeAccountId;

      // If the user doesn't have a Stripe account, create one
      if (!stripeAccountId) {
          const account = await stripe.accounts.create({
              type: 'express',
              business_type: 'individual',  // Adjust as needed
              email: userDoc.data().email,  // Use the stored email
          });

          // Store the Stripe account ID in Firestore
          await admin.firestore().collection('users').doc(uid).set({
            stripeAccountId: account.id
          }, { merge: true });

          stripeAccountId = account.id;
      }

      // Create an account link for the host to complete setup or login to Stripe dashboard
      const accountLink = await stripe.accountLinks.create({
          account: stripeAccountId,
          refresh_url: 'https://www.sparelot.com/hosting/operations/earnings',  // Replace with your URL
          return_url: 'https://www.sparelot.com/hosting/operations/earnings',      // Replace with your URL
          type: 'account_onboarding',  // Account onboarding flow
      });

      // Return the URL to the client
      return { url: accountLink.url };

  } catch (error) {
      // Handle errors and return a custom error message to the client
      throw new functions.https.HttpsError(
          'internal',
          error.message
      );
  }
});

exports.create_review_for_user = functions.https.onCall(async (data, context) => {
  try {
    // Check if the user is authenticated
    if (!context.auth) {
      return {
        status: 'User must be logged in to create a review.'
      };
    }

    const {
      rating,
      review,
      userToBeReviewedId
    } = data;

    // Validate required fields
    if (!rating || !review || !userToBeReviewedId) {
      return {
        status: 'Missing info.'
      };
    }

    // Validate rating range
    if (rating < 0 || rating > 5) {
      return {
        status: 'Rating falls out of valid range.'
      };
    }

    // Prevent reviewing oneself
    if (userToBeReviewedId === context.auth.uid) {
      return {
        status: 'You cannot write a review for yourself.'
      };
    }

    const userToBeReviewedRef = admin.firestore().collection('users').doc(userToBeReviewedId);

    // Fetch the user document
    const userToBeReviewedSnapshot = await userToBeReviewedRef.get();
    const userToBeReviewedData = userToBeReviewedSnapshot.data();

    // Check if the user exists
    if (!userToBeReviewedSnapshot.exists) {
      return {
        status: 'User to be reviewed does not exist on SpareLot.'
      };
    }

    const query = admin.firestore()
      .collection('reviews')
      .where('to', '==', `${userToBeReviewedId}`)
      .where('from', '==', `${context.auth.uid}`)
      .count();
    
    const snapshot = await query.get()
    if (snapshot.data().count > 0) {
      throw new Error('You have already reviewed this profile. Users cannot review the same profile multiple times')
    }

    const new_review = {
      rating: rating,
      review: review,
      to: userToBeReviewedId,
      from: context.auth.uid,
      created: (new Date()).getTime(),
    };

    await admin.firestore().collection('reviews').add(new_review)

    const reviewerData = (await admin.firestore().collection('users').doc(context.auth.uid).get()).data()
    const first = reviewerData?.personal?.firstName
    const last = reviewerData?.personal?.lastName

    if (userToBeReviewedData?.preferences?.notifications?.app?.reviews) {

      const notificationIDType = 13;
      const custom = first && last ? `${first} ${last}` : 'A user';
      await sendAppNotification(`${userToBeReviewedId}`, notificationIDType, custom);
    }

    if (userToBeReviewedData?.preferences?.notifications?.email?.reviews) {
      const userToBeReviewed_record = await admin.auth().getUser(userToBeReviewedId);
      const userToBeReviewed_email = userToBeReviewed_record.email;
  
      const new_chat_email = {
        to: userToBeReviewed_email,
        from: 'admin@sparelot.com',
        subject: 'You have a new review on SpareLot!',
        html: makeEmailNotification(
          'New review on SpareLot!', 
          `${first && last ? (first + ' ' + last) : 'A user'} has put a ${rating}-star review on your profile!`,
          `${first || 'The user'} wrote: "...${review}..." - See the new ${rating}-star review on your profile!`,
          'Go to Profile',
          `https://sparelot.com/profile/${userToBeReviewedId}`      
        )
      };

      const sg_res = await sendgrid.send(new_chat_email);
    }

    return {
      error:false,
      message: null,
    };
  }
  catch (error) {
    return {
      error:true,
      message: error.message
    };
  }
});


exports.upload_profile_picture = functions.https.onCall(async (data, context) => {
  try {
    if (!context.auth) {
      return {
        message:'User must be logged in to set profile picture.',
        error:true,
      };
    }

    const {
      base64String
    } = data;

    const url = `https://api.imgbb.com/1/upload?key=${imgbb_apikey}`;

    const imgbb_res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `image=${encodeURIComponent(base64String)}`, // Send the image as URL-encoded base64 string
    });

    if (!imgbb_res.ok) {
      return {
        message:`Error uploading profile picture (ImgBB): ${imgbb_res.statusText}`,
        error:true,
      }
    }

    const imgbb_data = await imgbb_res.json();

    await admin.auth().updateUser(context.auth.uid, {
      photoURL: imgbb_data.data.url,
    })

    await admin.firestore().collection('users').doc(context.auth.uid).set({
      profile: {
        avatar: imgbb_data.data.url,
      }
    }, {merge:true})

    return {
      message:'Profile picture uploaded and user profile updated successfully.',
      error:false,
    }
  }
  catch (error) {
    return {
      message: `Error uploading profile picture: ${error.message}`,
      error: true,
    };
  }
})

exports.checkIfUserExists = functions.https.onCall(async (data, context) => {
  const {email} = data;
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    return { exists: true };
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      return { exists: false };
    } else {
      throw new functions.https.HttpsError('unknown', 'Error checking user existence');
    }
  }
});

exports.get_all_stripe_transactions = functions.https.onCall(async (data, context) => {
  try {
    // Check if the user is authenticated
    if (!context?.auth?.uid) {
      throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated to access transactions.');
    }

    const user_doc_ref = db.collection('users').doc(context.auth.uid);
    const user_doc = await user_doc_ref.get();
    const user_doc_data = user_doc.data();

    const stripeAccountId = user_doc_data?.stripeAccountId;

    if (!stripeAccountId) {
      return {
        error: false,
        transactions: [],
      };
    }

    const balanceTransactions = await stripe.balanceTransactions.list(
      {
        limit: 100,
      },
      { stripeAccount: stripeAccountId }
    );

    return {
      error: false,
      transactions: balanceTransactions.data,
    };
  } catch (error) {
    return {
      error: true,
      message: `Error retrieving Stripe transaction history: ${error.message}`,
    };
  }
});

exports.publish_draft = functions.https.onCall(async (data, context) => {
  try {
    if (!context.auth.uid) {
      throw new functions.https.HttpsError('unauthenticated', 'User is not authenticated!')
    }

    const {draftId} = data;

    const draft_ref = admin.firestore().collection('drafts').doc(`${draftId}`);
    const draft_doc = await draft_ref.get();
    if (!draft_doc.exists) {
      throw new functions.https.HttpsError('not-found', 'Draft not found!')
    }
    const draft_data = draft_doc.data();

    const host_ref = admin.firestore().collection('users').doc(`${context?.auth?.uid}`);
    const host_doc = await host_ref.get();
    const host_data = host_doc.data();

    const bad_info = isInvalidListingInfo(draft_data, context.auth.uid);

    if (bad_info) {
      throw new functions.https.HttpsError('data-loss', bad_info)
    }

    const address = `${draft_data.location.street}, ${draft_data.location.city}, ${States[draft_data.location.state]} ${draft_data.location.zip}`;

    // Fetch the coordinates using Google Maps API
    const geo_res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${google_maps_apikey}`
    );

    const geodata = await geo_res.json()

    let lat = 0;
    let lon = 0;

    if (geodata.status === 'OK' && geodata.results.length > 0) {
      lat = geodata.results[0].geometry.location.lat;
      lon = geodata.results[0].geometry.location.lng;
    } else {
      throw new functions.https.HttpsError(
        'not-found',
        `Unable to resolve coordinates for the draft's given address.`
      );
    }

    draft_data.location.latitude = lat;
    draft_data.location.longitude = lon;

    const listing_ref = admin.firestore().collection('listings').doc(`${draftId}`);

    await listing_ref.set(draft_data);
    await draft_ref.delete();

    if (!host_data?.hosting?.signUpDate) {
      await host_ref.set({
        hosting:{
          signUpDate: (new Date()).getTime(),
        }
      }, {merge:true})
    }

    return {
      error: false,
      listingId: listing_ref.id,
    }
  }
  catch (error) {
    return {
      error:true,
      message:`Error publishing draft: ${error.message}`
    }
  }
})

const ReportTypes = [
  'listing',
  'user',
  'reservation',
  'message',
]

exports.report_item = functions.https.onCall(async (data, context) => {
  try {
    if (!context?.auth?.uid) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'You must sign in to submit a report!'
      )
    }

    const {itemType, contentId, reportDescription,} = data;

    if (!itemType || !contentId || !reportDescription) {
      throw new Error('Report provided with missing data!');
    }

    if (itemType !== 'message') {
      const reportedItem_ref = db.collection(`${itemType}s`).doc(`${contentId}`);
      const reportedItem_doc = await reportedItem_ref.get();
  
      if (!reportedItem_doc.exists) {
        throw new Error('Reported content does not exist!');
      }
    }
    else {
      const [chatId, messageId] = contentId.split("::");

      const reportedMessage_ref = db
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .doc(messageId);

      const reportedMessage_doc = await reportedMessage_ref.get();

      if (!reportedMessage_doc.exists) {
        throw new Error('Reported message does not exist!');
      }
    }

    const reportsRef = db.collection('reports');
    const preExistingReportsOfContentByUserQuery = await (reportsRef
      .where('reportingUserId', '==', context.auth.uid)
      .where('reportedContentId', '==', contentId)
      .get());

    if (!preExistingReportsOfContentByUserQuery.empty) {
      throw new Error(`You have already reported this ${data?.itemType ?? 'content'}. Please do not submit new reports, as your current report is under review. Thank you for your patience.`)
    }

    const newReport_data = {
      reportingUserId: `${context.auth.uid}`,
      reportedContentId: `${contentId}`,
      reportedItemType: ReportTypes.indexOf(itemType),
      reportDescription,
      reportDate: (new Date()).getTime(),
    }
    const newReport_ref = await db.collection('reports').add(newReport_data)

    return {
      error:false,
      message:`Report submitted! (Report ID: ${newReport_ref.id})`
    }
  }
  catch (error) {
    return {
      error:true,
      message:error.message,
    }
  }
})

exports.delete_account = functions.https.onCall(async (data, context) => {
  try {
    if (!context?.auth?.uid) {
      throw new Error('You must be logged in to delete your account.');
    }

    const db = admin.firestore();
    const auth = admin.auth();
    const userId = context.auth.uid;

    // Query all listings where host === userId
    const listingsSnapshot = await db.collection('listings').where('host', '==', userId).get();
    const batch = db.batch();
    const reservationPromises = [];

    for (const listingDoc of listingsSnapshot.docs) {
      const listingId = listingDoc.id;

      // Get all reservations for this listing
      const reservationsSnapshot = await db.collection('reservations').where('listing', '==', listingId).get();

      for (const reservationDoc of reservationsSnapshot.docs) {
        const reservationData = reservationDoc.data();

        if (reservationData.status === ReservationStatus.Approved) {
          reservationPromises.push(cancel_reservation(reservationDoc.id));
        } else if (reservationData.status === ReservationStatus.Pending) {
          reservationPromises.push(decline_reservation(reservationDoc.id));
        }
      }

      // Delete the listing document
      batch.delete(listingDoc.ref);
    }

    await batch.commit();
    await Promise.all(reservationPromises);

    // Query all reservations where renter === userId
    const renterReservationsSnapshot = await db.collection('reservations').where('renter', '==', userId).get();
    const renterReservationPromises = [];

    for (const reservationDoc of renterReservationsSnapshot.docs) {
      const reservationData = reservationDoc.data();

      if (reservationData.status === ReservationStatus.Pending) {
        renterReservationPromises.push(decline_reservation(reservationDoc.id));
      } else if (reservationData.status === ReservationStatus.Approved) {
        renterReservationPromises.push(cancel_reservation(reservationDoc.id));
      }
    }

    await Promise.all(renterReservationPromises);

    // Delete user document (assuming stored in 'users' collection)
    await db.collection('users').doc(userId).delete();

    // Delete user from Firebase Authentication
    await auth.deleteUser(userId);

    return { message: 'Account successfully deleted.' };
  } catch (error) {
    console.error('Error deleting account:', error);
    return { message: 'An error occurred while deleting your account. Please try again later.' };
  }
});
