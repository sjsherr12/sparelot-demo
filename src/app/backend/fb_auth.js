import { app_auth, googleProvider } from './fb_cfg';
import { 
  signOut,
  signInWithPhoneNumber,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';

const user_auth = {
  signup: {
    withEmailAndPass: (email, pass) => createUserWithEmailAndPassword(app_auth, email, pass),
    // TODO (maybe): signup with phone number
  },

  login: {
    withEmailAndPass: (email, pass) => signInWithEmailAndPassword(app_auth, email, pass),
    withPhoneNumber: (phone_number) => signInWithPhoneNumber(app_auth, phone_number),
    withGoogle: () => signInWithPopup(app_auth, googleProvider)
      .then((result) => {
        const user = result.user;
        window.location.href='/'
      })
      .catch((error) => {
        console.error('Error during Google sign-in:', error.message);
      }),
  },

  logout: () => signOut(app_auth),
};

export default user_auth;
