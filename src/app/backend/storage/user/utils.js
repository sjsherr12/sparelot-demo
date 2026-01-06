import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, setDoc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { app_auth } from 'app/backend/fb_cfg';
import { firestore } from 'app/backend/fb_cfg';

export const uploadProfilePicture = async (file) => {
  const storage = getStorage();
  
  // Check file size
  if (file.size > (2 * 1024 * 1024)) {
    return { msg: 'File size exceeds the 2MB limit.', error: true };
  }

  const user = app_auth.currentUser;

  if (!user) {
    return { msg: 'User not authenticated.', error: true };
  }

  const storageRef = ref(storage, `profile_pictures/${user.uid}`);

  try {
    // Upload file to Firebase Storage
    await uploadBytes(storageRef, file);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(storageRef);

    // Update Firebase Auth profile photo URL
    await updateProfile(user, { photoURL: downloadURL });

    // Update Firestore
    await setDoc(doc(firestore, `users`, user.uid), {
      profile: {
          avatar: downloadURL
      }
    }, {merge:true});

    return { msg: 'Profile picture uploaded and user profile updated successfully.', error: false };

  } catch (error) {
    return { msg: `Error uploading profile picture: ${error.message}`, error: true };
  }
};