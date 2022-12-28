"use client";

import { collection, addDoc, getDocs } from "firebase/firestore";
import { createNewUser, logInUser, logOutUser } from "@lib/auth";
import db from "@lib/database";
import HelloWorld from "@components/HelloWorld";
import { useAuthState } from "@hooks/useAuthState";

export default function Home() {
  const [user] = useAuthState();
  const createPost = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        first: "John",
        middle: "A",
        last: "Smith",
        born: 2000,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const logPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  };

  const signUp = async () => {
    const user = await createNewUser("test@gmail.com", "password");
    return user;
  };
  const signIn = async () => {
    const user = await logInUser("test@gmail.com", "password");
    return user;
  };

  const signOut = async () => {
    const success = await logOutUser();
    return success;
  };

  return (
    <main>
      <HelloWorld />
      <button onClick={createPost} className="border border-black">
        Create Post
      </button>
      <button onClick={logPosts} className="border border-black">
        Log Posts
      </button>
      <p>{"current user: " + user?.email}</p>

      <button onClick={signUp} className="border border-black">
        Sign Up
      </button>
      <button onClick={signIn} className="border border-black">
        Sign In
      </button>
      <button onClick={signOut} className="border border-black">
        Sign Out
      </button>
    </main>
  );
}
