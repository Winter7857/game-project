"use client";

import { useRouter } from "next/navigation";

export default function AdminNavbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user");
    document.cookie = "user=; path=/; max-age=0"; // ❌ Clear cookie
    router.push("/login"); // 🔁 Redirect to login
  };

  return (
    <header className="w-full bg-slate-900 text-white px-6 py-4 border-b border-slate-700">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">🎮 GAME STORE Admin</h1>

        <div className="flex gap-4">
          <button
            onClick={() => router.push("/games/new")}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
          >
            ➕ Add
          </button>
          <button
            onClick={() => router.push("/game/edit")}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-1 rounded"
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => router.push("/game/delete")}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
          >
            🗑️ Delete
          </button>

          {/* ✅ LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
