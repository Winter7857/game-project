"use client"

import Footer from "@/components/Footer";

export default function AdminPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-800 text-white">
      {/* Content */}
      <main className="flex-grow flex flex-col items-center text-center p-6">
        {/* Logout button */}
        <div className="w-full flex justify-end mb-4">
          <button
            onClick={() => window.location.href = "/login"}
            className="bg-gray-200 text-black px-4 py-1 rounded"
          >
            logout
          </button>
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold mb-10">GAME STORE</h1>

        {/* Game cards */}
        <div className="flex gap-10 mb-20">
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex flex-col items-center">
              <div className="w-48 h-28 bg-gray-200 text-black flex items-center justify-center mb-2">
                img
              </div>
              <p className="text-lg">Game {n}</p>
              <p className="text-lg">{999 - (n - 1) * 200} ฿</p>
            </div>
          ))}
        </div>

        {/* Buttons moved to the bottom */}
        <div className="mt-auto mb-8 flex gap-6">
        <button
    onClick={() => window.location.href = "/games/new"}
    className="bg-gray-200 text-black px-6 py-2 rounded"
  >
    add
  </button>
          <button className="bg-gray-200 text-black px-6 py-2 rounded">edit</button>
          <button className="bg-gray-200 text-black px-6 py-2 rounded">delete</button>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
