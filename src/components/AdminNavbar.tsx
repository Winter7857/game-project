"use client";

import { useRouter } from "next/navigation";

export default function AdminNavbar() {
  const router = useRouter();

  return (
    <header className="w-full bg-slate-900 text-white px-4 py-3 border-b border-slate-700">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Title */}
        <h1 className="text-2xl font-bold flex items-center gap-2">
          🎮 <span>GAME STORE Admin</span>
        </h1>

        {/* Button group */}
        <div className="flex flex-wrap gap-2 md:gap-4">
          <button
            onClick={() => router.push("/games/new")}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded text-sm md:text-base"
          >
            ➕ Add
          </button>

          <button
            onClick={() => router.push("/game/edit")}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-1 rounded text-sm md:text-base"
          >
            ✏️ Edit
          </button>

          <button
            onClick={() => router.push("/game/delete")}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm md:text-base"
          >
            🗑️ Delete
          </button>

          <button
            onClick={() => router.push("/login")}
            className="bg-gray-300 text-black px-4 py-1 rounded text-sm md:text-base"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
