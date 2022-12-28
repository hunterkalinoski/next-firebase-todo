"use client";

import { useAuthState } from "@hooks/useAuthState";
import { UserContext } from "@lib/userContext";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [user] = useAuthState();

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <UserContext.Provider value={user}>{children}</UserContext.Provider>
      </body>
    </html>
  );
}
