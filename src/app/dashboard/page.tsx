"use client";

import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

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
      <Header /> {/* ✅ Reusable nav */}

      <main className="flex-grow flex flex-col px-6 py-8">
        <h1 className="text-5xl font-bold mb-10 text-center">GAME STORE</h1>

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
