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
      <Header />

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
                <div className="w-full max-w-[180px] aspect-[2/3] bg-gray-200 overflow-hidden rounded shadow mb-2">
  <img
    src={game.image}
    alt={game.name}
    className="w-full h-full object-cover object-top"
  />
</div>

                <p className="text-base sm:text-lg font-semibold text-center">{game.name}</p>
                <p className="text-base sm:text-lg mb-2 text-center">{game.price} ฿</p>
                <button
                  onClick={() => handleAddToCart(game)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 text-sm sm:text-base rounded transition"
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
