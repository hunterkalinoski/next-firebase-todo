"use client";

import { useState } from "react";
import { logInUser } from "@lib/auth";
import { useRouter } from "next/navigation";

export default function Page() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  async function signUp() {
    const success = await logInUser(email, password);
    if (success) {
      router.push("/");
    }
  }

  return (
    <>
      <div className="flex flex-col gap-2 items-end">
        <div>
          <label htmlFor="emailInput">Email: </label>
          <input type="text" name="emailInput" onChange={(e) => setEmail(e.currentTarget.value)} />
        </div>
        <div>
          <label htmlFor="passwordInput">Password: </label>
          <input
            type="text"
            name="passwordInput"
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
      </div>

      <button onClick={signUp}>Sign In</button>
    </>
  );
}
