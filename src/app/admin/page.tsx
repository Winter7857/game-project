"use client";

import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import AdminNavbar from "@/components/AdminNavbar";

type Game = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export default function AdminPage() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch("/api/games")
      .then((res) => res.json())
      .then((data) => {
        console.log("Games from DB:", data);
        setGames(data);
      })
      .catch((err) => console.error("Failed to fetch games:", err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-800 text-white">
      <AdminNavbar /> {/* ✅ Admin navigation bar */}

      <main className="flex-grow flex flex-col items-center text-center px-6 py-10">
        {/* Page title */}
        <h1 className="text-5xl font-bold mb-10">GAME STORE</h1>

        {/* Game cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mb-20">
          {games.length === 0 ? (
            <p className="text-gray-400">No games available</p>
          ) : (
            games.map((game) => (
              <div key={game.id} className="flex flex-col items-center">
                <div className="w-48 h-72 bg-gray-200 text-black flex items-center justify-center mb-2 overflow-hidden rounded shadow">
                  <img
                    src={game.image}
                    alt={game.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-lg font-semibold">{game.name}</p>
                <p className="text-lg">{game.price} ฿</p>
              </div>
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
