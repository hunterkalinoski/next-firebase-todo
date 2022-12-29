"use client";

import { collection, addDoc, getDocs } from "firebase/firestore";
import { createNewUser, logInUser, logOutUser } from "@lib/auth";
import { db, createUserDocument, logUsersCollection } from "@lib/database";
import HelloWorld from "@components/HelloWorld";
import { useContext, useState } from "react";
import { UserContext } from "@lib/userContext";

export default function Home() {
  const user = useContext(UserContext);
  const [displayName, setDisplayName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // create both an auth user and a user database entry
  const signUp = async (display_name: string, email: string, password: string) => {
    console.log(`display_name: ${display_name}, email: ${email}, password: ${password}`);
    const user = await createNewUser(email, password);
    if (user) {
      createUserDocument(display_name, email);
    }
  };

  const signIn = async (email: string, password: string) => {
    const user = await logInUser(email, password);
    return user;
  };

  const signOut = async () => {
    const success = await logOutUser();
    return success;
  };

  return (
    <main>
      <HelloWorld />
      <HelloWorld />
      <HelloWorld />
      <HelloWorld />
      <HelloWorld />
      <HelloWorld />
      <label>Username: </label>
      <input
        type="text"
        name="display_name"
        onChange={(e) => setDisplayName(e.currentTarget.value)}
        className="border border-black"
      />
      <label>Email: </label>
      <input
        type="text"
        name="email"
        onChange={(e) => setEmail(e.currentTarget.value)}
        className="border border-black"
      />
      <label>Password</label>
      <input
        type="text"
        name="password"
        onChange={(e) => setPassword(e.currentTarget.value)}
        className="border border-black"
      />

      <button onClick={logUsersCollection} className="border border-black">
        Log Posts
      </button>
      <p>{"current user: " + user?.email}</p>

      <button onClick={() => signUp(displayName, email, password)} className="border border-black">
        Sign Up
      </button>
      <button onClick={() => signIn(email, password)} className="border border-black">
        Sign In
      </button>
      <button onClick={signOut} className="border border-black">
        Sign Out
      </button>
    </main>
  );
}
