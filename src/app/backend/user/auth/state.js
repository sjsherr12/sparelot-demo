const { app_auth } = require("app/backend/fb_cfg");
const { onAuthStateChanged } = require("firebase/auth");

export const isUserLoggedIn = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(app_auth, (user) => {
      unsubscribe(); // Unsubscribe to stop listening after the initial check
      resolve(user); // Resolve the promise with the user object or null
    }, (error) => {
      unsubscribe();
      reject(error); // Reject the promise if there's an error
    });
  }).then(user => {
    return user !== null; // Return true if user is not null, false otherwise
  }).catch(error => {
    return false; // Return false in case of error
  });
};