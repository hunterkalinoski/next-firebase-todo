import firebaseApp from "@lib/firebase";
import { createUserDocument } from "@lib/database";

import {
  User,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  Auth,
  deleteUser,
} from "firebase/auth";

// initialize firebase auth
export const auth: Auth = getAuth(firebaseApp);

// function to create a new user
// takes in email and password strings
// returns the user that was created, or undefined if an error occurrs
// also displays an alert on errors
const createUserAuth = async (email: string, password: string): Promise<User | undefined> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(`${errorCode} ${errorMessage}`);
    return undefined;
  }
};

// create a new auth user account, as well as a user document in the database
export const createNewUser = async (
  display_name: string,
  email: string,
  password: string
): Promise<boolean> => {
  const user = await createUserAuth(email, password);
  if (!user) {
    return false;
  }

  const docCreated = createUserDocument(user.uid, display_name, email);
  // if doc does not get created for any reason, delete the auth user
  // if auth user exists, doc must also exist
  if (!docCreated) {
    deleteUser(user);
  }
  return true;
};

// function to log in to a users account
// takes in email and password strings
// returns the user that was signed in to, or undefined if an error occurrs
// also displays an alert on errors
export const logInUser = async (email: string, password: string): Promise<User | undefined> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(`${errorCode} ${errorMessage}`);
    return undefined;
  }
};

// function to log out of the existing user
// returns true if operation was successful, false if an error was caught
// also displays an alert on errors
export const logOutUser = async (): Promise<boolean> => {
  try {
    signOut(auth);
    return true;
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(`${errorCode} ${errorMessage}`);
    return false;
  }
};
