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
      <AdminNavbar />

      <main className="flex-grow flex flex-col px-4 py-6 sm:px-6 md:px-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center">
          GAME STORE
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
          {games.length === 0 ? (
            <p className="text-gray-400 col-span-full text-center">
              No games available
            </p>
          ) : (
            games.map((game) => (
              <div
                key={game.id}
                className="flex flex-col items-center bg-slate-700 p-4 rounded-lg shadow hover:shadow-lg transition-all"
              >
                <div className="w-48 h-72 bg-gray-200 text-black flex items-center justify-center mb-2 overflow-hidden rounded shadow">
  <img
    src={game.image}
    alt={game.name}
    className="w-full h-full object-cover"
  />
</div>

                <p className="text-base sm:text-lg font-semibold text-center">{game.name}</p>
                <p className="text-base sm:text-lg mb-2 text-center">{game.price} ฿</p>
              </div>
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
