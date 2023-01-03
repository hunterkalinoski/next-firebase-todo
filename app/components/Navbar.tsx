"use client";

import { useAuthState } from "@hooks/useAuthState";
import { logOutUser } from "@lib/auth";
import Link from "next/link";
import { useState } from "react";

export default function NavBar({}) {
  const [auth] = useAuthState();
  const [authFetched, setAuthFetched] = useState(0);

  return (
    <>
      <div className="flex flex-row w-full justify-between bg-slate-900 text-gray-200 p-5 items-center h-20">
        <Link href="/" className="hover:underline">
          <h2>Next-Firebase Todos</h2>
        </Link>
        {auth ? (
          <button onClick={logOutUser}>Sign Out</button>
        ) : authFetched ? (
          <span className="flex flex-row gap-5">
            <Link href="/signin">
              <button>Sign In</button>
            </Link>
            <Link href="/signup">
              <button>Sign Up</button>
            </Link>
          </span>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
