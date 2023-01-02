import {
  collection,
  getDocs,
  getFirestore,
  setDoc,
  doc,
  getDoc,
  DocumentData,
  addDoc,
  serverTimestamp,
  deleteDoc,
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

export const createTodo = async (title: string, description: string, color: string) => {
  try {
    const currUser = auth.currentUser;
    if (!currUser) {
      return null;
    }
    const uid = currUser.uid;
    const todoDocRef = await addDoc(collection(db, `users/${uid}/todos`), {
      title,
      description,
      color,
      timeAdded: serverTimestamp(),
    });
    return true;
  } catch (e) {
    return false;
  }
};

export const deleteTodo = async (todoId: string) => {
  try {
    const currUser = auth.currentUser;
    if (!currUser) {
      return null;
    }
    const uid = currUser.uid;
    await deleteDoc(doc(db, `users/${uid}/todos`, todoId));
    return true;
  } catch (e) {
    return false;
  }
};

// returns list of the current user's todos
// the list is sorted by the timeAdded field,
// values at an earlier time are first in the list
export const getCurrentUserTodos = async () => {
  try {
    const currUser = auth.currentUser;
    if (!currUser) {
      return null;
    }
    const uid = currUser.uid;
    const querySnapshot = await getDocs(collection(db, `users/${uid}/todos`));
    let list: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      list = [...list, doc];
    });
    const sortedList = list.sort((a, b) => (a.data().timeAdded > b.data().timeAdded ? 1 : -1));
    return sortedList;
  } catch (e) {
    return null;
  }
};
