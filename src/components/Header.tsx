"use client";

import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <header className="w-full bg-slate-900 text-white border-b border-slate-700 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <button
          onClick={() => router.push("/dashboard")}
          className="text-white font-bold text-xl"
        >
          LIST GAMES
        </button>

        <div className="flex gap-4">
          <button
            onClick={() => router.push("/cart")}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-1 rounded"
          >
            🛒 Cart
          </button>

          <button
            onClick={() => router.push("/login")}
            className="bg-gray-200 text-black px-4 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
