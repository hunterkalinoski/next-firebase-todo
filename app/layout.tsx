import NavBar from "app/components/Navbar";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="bg-slate-800 text-gray-200 flex flex-col gap-4 items-center text-center">
        <NavBar />
        {children}
      </body>
    </html>
  );
}
