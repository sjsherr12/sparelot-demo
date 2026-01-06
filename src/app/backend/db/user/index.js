import { doc, getDoc, getFirestore } from "firebase/firestore";

export const getUser = async (user_uuid) => {
    const db = getFirestore();

    const userDocRef = doc(db, `users/${user_uuid}`);

    try {
      // Fetch the document
      const userDoc = await getDoc(userDocRef);
  
      // Check if the document exists
      if (userDoc.exists()) {
        return userDoc.data();
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
};