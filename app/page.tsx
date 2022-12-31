"use client";

import Link from "next/link";
import { useAuthState } from "@hooks/useAuthState";
import { logOutUser } from "@lib/auth";
import { getCurrentUserDoc } from "@lib/database";
import { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";

export default function Page() {
  const [auth] = useAuthState();
  const [userDoc, setUserDoc] = useState<DocumentData | null>(null);

  useEffect(() => {
    getCurrentUserDoc().then((userDoc) => {
      setUserDoc(userDoc);
    });
  }, [auth]);

  return (
    <>
      {auth ? (
        <>
          <div>Hello {userDoc?.display_name}</div>
          <button onClick={logOutUser}>Sign Out</button>
          <Link href="/create">
            <button>Create a new Todo</button>
          </Link>
        </>
      ) : (
        <>
          <h1>Welcome to Next-Firebase todos</h1>
          <p>This is a todo app built with Nextjs and Firebase(Auth and Firestore)</p>
          <span className="flex flex-row gap-2">
            <Link href="/signup">
              <button>Sign up</button>
            </Link>
            <p>or</p>
            <Link href="/signin">
              <button>Sign in</button>
            </Link>
            <p>to get started</p>
          </span>
        </>
      )}
    </>
  );
}
