import { addDoc, collection, getDocs, getFirestore, setDoc, doc } from "firebase/firestore";
import firebaseApp from "@lib/firebase";

// Initialize Cloud Firestore
export const db = getFirestore(firebaseApp);

// create a new user document in the users collection
// params display_name and email are strings to be associated with the user's database entry
// returns true if successful, false if an error occurred
export const createUserDocument = async (
  uid: string,
  display_name: string,
  email: string
): Promise<boolean> => {
  try {
    const docRef = await setDoc(doc(db, "users", uid), {
      display_name: display_name,
      email: email,
    });
    console.log("Document written with ID: ", uid);
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
