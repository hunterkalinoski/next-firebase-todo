import {
  collection,
  getDocs,
  getFirestore,
  setDoc,
  doc,
  getDoc,
  DocumentData,
} from "firebase/firestore";
import firebaseApp from "@lib/firebase";
import { auth } from "@lib/auth";

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
    return true;
  } catch (e) {
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

export const getCurrentUserDoc = async (): Promise<DocumentData | null> => {
  const currUser = auth.currentUser;
  if (!currUser) {
    return null;
  }
  const uid = currUser.uid;
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};
