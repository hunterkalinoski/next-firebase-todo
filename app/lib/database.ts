import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import firebaseApp from "@lib/firebase";

// Initialize Cloud Firestore
export const db = getFirestore(firebaseApp);

// create a new user document in the users collection
// params display_name and email are strings to be associated with the user's database entry
// returns true if successful, false if an error occurred
export const createUserDocument = async (display_name: string, email: string): Promise<boolean> => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      display_name: display_name,
      email: email,
    });
    console.log("Document written with ID: ", docRef.id);
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
};

// log out a list of all currently signed up users
export const logUsersCollection = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
};
