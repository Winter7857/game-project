"use client";

import { useEffect, useState } from "react";
import Footer from "@/components/Footer";

type Game = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export default function UserDashboardPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [cart, setCart] = useState<Game[]>([]); // ✅ cart state

  useEffect(() => {
    fetch("/api/games")
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.error("Failed to fetch games:", err));
  }, []);

  const handleAddToCart = (game: Game) => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
  
    const alreadyInCart = existingCart.find((item: Game) => item.id === game.id);
    if (alreadyInCart) {
      alert(`${game.name} is already in the cart.`);
      return;
    }
  
    const newCart = [...existingCart, game];
    localStorage.setItem("cart", JSON.stringify(newCart));
    alert(`${game.name} added to cart!`);
  };
  

  return (
    <div className="min-h-screen flex flex-col bg-slate-800 text-white">
      <main className="flex-grow flex flex-col items-center text-center p-6">
        {/* Logout button */}
        <div className="w-full flex justify-between mb-4">
  <button
    onClick={() => window.location.href = "/dashboard"}
    className="bg-transparent text-white font-bold text-xl"
  >
    LIST GAMES
  </button>

  <div className="flex gap-4">
    <button
      onClick={() => window.location.href = "/cart"}
      className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-1 rounded"
    >
      🛒 Cart
    </button>

    <button
      onClick={() => (window.location.href = "/login")}
      className="bg-gray-200 text-black px-4 py-1 rounded"
    >
      Logout
    </button>
  </div>
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
                <button
                  onClick={() => handleAddToCart(game)}
                  className="mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
                >
                  Add to Cart
                </button>
              </div>
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
