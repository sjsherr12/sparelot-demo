import { connectAuthEmulator, getAuth, getRedirectResult, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getAnalytics  } from 'firebase/analytics';
import { connectFirestoreEmulator, doc, getDoc, getFirestore, setDoc  } from 'firebase/firestore';
import { connectFunctionsEmulator, getFunctions, httpsCallable } from 'firebase/functions';
import { isMobile } from 'react-device-detect';

const firebase_config = {
  apiKey: "AIzaSyAqHcorO9BkcopnPlFaM9yA6zw8nMvVkBA",
  authDomain: "spare-lot-app.firebaseapp.com",
  databaseURL: "https://spare-lot-app-default-rtdb.firebaseio.com",
  projectId: "spare-lot-app",
  storageBucket: "spare-lot-app.appspot.com",
  messagingSenderId: "255427688324",
  appId: "1:255427688324:web:b979b8525ae83bfb0f4fd1",
  measurementId: "G-CQC1C6LF25"
};

const app = initializeApp(firebase_config);

export const firebase_app = app;
export const app_auth  = getAuth(app);
export const firestore = getFirestore(app);
export const analytics = getAnalytics(app);
export const functions = getFunctions(app);

export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const popupPromise = signInWithPopup(auth, googleProvider)
    .then(result => handleUserLogin(result).then(() => result));

  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Popup timeout or canceled")), 5000) // adjust as needed
  );

  return Promise.race([popupPromise, timeoutPromise])
    .catch(error => {
      console.error("Error signing in with Google:", error);
      throw error;
    });
};

// Function to handle user login logic
const handleUserLogin = async (result) => {
  const user = result.user;
  const { uid, displayName, email, photoURL } = user;
  
  const nameParts = displayName.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  const userDocRef = doc(firestore, "users", uid);
  const userDocSnap = await getDoc(userDocRef);

  if (!userDocSnap.exists()) {
      await setDoc(userDocRef, {
          personal: { firstName, lastName },
          profile: { avatar: photoURL || null },
      });

      await httpsCallable(functions, "add_to_mailerlite")({
          email,
          firstName,
          lastName,
      });
  }
};