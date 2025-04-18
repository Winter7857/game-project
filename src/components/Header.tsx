"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Header() {
  const router = useRouter();
  const handleLogout = async () => {
    // Call the API to remove the session cookie
  await fetch("/api/logout", {
    method: "POST",
    credentials: "include", // Make sure cookies are sent
  });
    
    router.push("/login"); // 🔁 Redirect to login
    
  };
  return (
    <header className="w-full bg-slate-900 text-white border-b border-slate-700 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo + LIST GAMES */}
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 text-white font-bold text-lg md:text-xl"
        >
          <Image
            src="/uploads/dice.png"
            alt="Dice Icon"
            width={28}
            height={28}
            className="w-6 h-6"
          />
          <span>LIST GAMES</span>
        </button>

        {/* Right Buttons */}
        <div className="flex gap-2 md:gap-4">
          <button
            onClick={() => router.push("/dashboard/cart")}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-1 rounded text-sm md:text-base"
          >
            🛒 Cart
          </button>

          <button
             onClick={handleLogout}
            className="bg-gray-200 text-black px-4 py-1 rounded text-sm md:text-base"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
