"use client";

import { useState } from "react";
import { createNewUser } from "@lib/auth";
import { useRouter } from "next/navigation";
import { TailSpin } from "react-loader-spinner";

export default function Page() {
  const [displayName, setDisplayName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function signUp() {
    setLoading(true);
    const success = await createNewUser(displayName, email, password);
    if (success) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }

  return (
    <>
      <div className='flex flex-col gap-2 items-end'>
        <div>
          <label htmlFor='displayNameInput'>Display Name: </label>
          <input
            type='text'
            name='displayNameInput'
            onChange={(e) => setDisplayName(e.currentTarget.value)}
          />
        </div>
        <div>
          <label htmlFor='emailInput'>Email: </label>
          <input type='text' name='emailInput' onChange={(e) => setEmail(e.currentTarget.value)} />
        </div>
        <div>
          <label htmlFor='passwordInput'>Password: </label>
          <input
            type='text'
            name='passwordInput'
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
      </div>

      <button
      //onClick={signUp}
      >
        Sign Up
      </button>
      {loading && (
        <TailSpin
          height='80'
          width='80'
          color='#334155'
          ariaLabel='tail-spin-loading'
          radius='1'
          wrapperStyle={{}}
          wrapperClass=''
          visible={true}
        />
      )}
    </>
  );
}
