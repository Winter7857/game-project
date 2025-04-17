"use client";

import { useEffect, useState } from "react";
import Footer from "@/components/Footer";

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
      {/* Content */}
      <main className="flex-grow flex flex-col items-center text-center p-6">
        {/* Logout button */}
        <div className="w-full flex justify-end mb-4">
          <button
            onClick={() => (window.location.href = "/login")}
            className="bg-gray-200 text-black px-4 py-1 rounded"
          >
            logout
          </button>
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold mb-10">GAME STORE</h1>

        {/* Game cards */}
        <div className="flex flex-wrap gap-10 mb-20 justify-center">
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

        {/* Buttons */}
        <div className="mt-auto mb-8 flex gap-6">
          <button
            onClick={() => (window.location.href = "/games/new")}
            className="bg-gray-200 text-black px-6 py-2 rounded"
          >
            add
          </button>
          <button
  onClick={() => (window.location.href = "/game/edit")}
  className="bg-gray-200 text-black px-6 py-2 rounded"
>
  Edit
</button>
          <button className="bg-gray-200 text-black px-6 py-2 rounded">
            delete
          </button>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
