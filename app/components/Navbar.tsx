import Link from "next/link";

export default function NavBar({}) {
  return (
    <div className="flex flex-row w-full justify-between bg-slate-900 text-gray-200 p-5 items-center">
      <Link href="/" prefetch className="hover:underline">
        <h2>Next-Firebase Todos</h2>
      </Link>
      <span className="flex flex-row gap-5">
        <Link href="/signin" prefetch>
          <button className="hover:bg-opacity-25 hover:bg-white">Sign In</button>
        </Link>
        <Link href="/signup" prefetch>
          <button className="hover:bg-opacity-25 hover:bg-white">Sign Up</button>
        </Link>
      </span>
    </div>
  );
}
