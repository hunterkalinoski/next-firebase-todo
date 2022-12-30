"use client";

import { createNewUser, logInUser, logOutUser } from "@lib/auth";
import HelloWorld from "@components/HelloWorld";
import { getCurrentUserDoc } from "@lib/database";
import { useContext, useEffect, useState } from "react";
import { AuthUserContext } from "@lib/authUserContext";

export default function Home() {
  const authUser = useContext(AuthUserContext);
  const [usersName, setUsersName] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    getCurrentUserDoc().then((userDoc) => {
      setUsersName(userDoc?.display_name);
    });
  }, [authUser]);

  // create both an auth user and a user database entry
  const signUp = async (display_name: string, email: string, password: string) => {
    await createNewUser(display_name, email, password);
  };

  const signIn = async (email: string, password: string) => {
    await logInUser(email, password);
  };

  const signOut = async () => {
    await logOutUser();
  };

  return (
    <main>
      <HelloWorld />
      <HelloWorld />
      <HelloWorld />
      <HelloWorld />
      <HelloWorld />
      <HelloWorld />
      <label>Display Name: </label>
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

      <p>{"current user: " + usersName}</p>

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
