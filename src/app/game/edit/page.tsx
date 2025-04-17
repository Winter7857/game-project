"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Game = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export default function EditGamePage() {
  const [games, setGames] = useState<Game[]>([]);
  const [search, setSearch] = useState("");
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/games")
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.error("Failed to fetch games:", err));
  }, []);

  const handleSelectGame = (game: Game) => {
    setSelectedGame(game);
    setName(game.name);
    setPrice(game.price.toString());
    setImage(game.image);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/games", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: selectedGame?.id,
        name,
        price: parseInt(price),
        image,
      }),
    });

    if (res.ok) {
      alert("Game updated!");
      router.push("/admin");
    } else {
      alert("Failed to update.");
    }
  };

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-slate-900 text-white px-4 py-10 sm:px-10">
      {/* Back button on top-right */}
      <div className="absolute top-4 right-4 z-50">
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="bg-cyan-400 hover:bg-cyan-500 text-black font-semibold py-2 px-4 rounded shadow"
        >
          Back to Admin Dashboard
        </button>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">Edit Game</h1>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search game by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 rounded text-white bg-slate-700 w-full max-w-lg mx-auto block mb-6"
      />

      {/* Game selection list */}
      {filteredGames.length > 0 && !selectedGame && (
        <div className="flex flex-wrap gap-4 justify-center">
          {filteredGames.map((game) => (
            <button
              key={game.id}
              onClick={() => handleSelectGame(game)}
              className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-yellow-300"
            >
              {game.name}
            </button>
          ))}
        </div>
      )}

      {/* Edit form */}
      {selectedGame && (
        <form
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col gap-4 max-w-md w-full mx-auto bg-slate-800 p-6 rounded-lg"
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 rounded text-white bg-slate-700 placeholder-gray-400"
            placeholder="Game Name"
            required
          />

          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-2 rounded text-white bg-slate-700 placeholder-gray-400"
            placeholder="Price"
            required
          />

          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="p-2 rounded text-white bg-slate-700 placeholder-gray-400"
            placeholder="Image URL"
            required
          />

          <button
            type="submit"
            className="bg-yellow-400 text-black font-semibold py-2 rounded"
          >
            Update Game
          </button>

          <button
            type="button"
            onClick={() => setSelectedGame(null)}
            className="bg-gray-500 text-white py-2 rounded"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}
