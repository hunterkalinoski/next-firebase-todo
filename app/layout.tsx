"use client";

import { useAuthState } from "@hooks/useAuthState";
import { AuthUserContext } from "@lib/authUserContext";
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
        <AuthUserContext.Provider value={user}>{children}</AuthUserContext.Provider>
      </body>
    </html>
  );
}
