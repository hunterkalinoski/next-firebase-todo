import Image from "next/image";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <div className="bg-blue-200 text-cyan-700">Hello World</div>
    </main>
  );
}
