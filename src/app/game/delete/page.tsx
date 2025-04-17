"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Game = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export default function DeleteGameByNamePage() {
  const [games, setGames] = useState<Game[]>([]);
  const [search, setSearch] = useState("");
  const router = useRouter();

  // Fetch all games from the database
  useEffect(() => {
    fetch("/api/games")
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.error("Failed to fetch games:", err));
  }, []);

  // Filter by name
  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(search.toLowerCase())
  );

  // Handle delete by name
  const handleDeleteByName = async (name: string) => {
    const confirmDelete = confirm(`Are you sure you want to delete "${name}"?`);
    if (!confirmDelete) return;

    const res = await fetch("/api/games", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (res.ok) {
      alert(`Game "${name}" deleted successfully!`);
      // remove from local state
      setGames((prev) => prev.filter((g) => g.name !== name));
      setSearch(""); // optional: clear search after delete
    } else {
      alert("Failed to delete.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-10 relative">
      {/* Back to admin */}
      <div className="absolute top-6 right-6">
        <button
          onClick={() => router.push("/admin")}
          className="bg-cyan-400 hover:bg-cyan-500 text-black font-semibold py-2 px-4 rounded shadow"
        >
          Back to Admin Dashboard
        </button>
      </div>

      <h1 className="text-3xl font-bold text-center mb-6">Delete Game by Name</h1>

      <input
        type="text"
        placeholder="Search game name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 rounded text-white bg-slate-700 placeholder-gray-400 w-full max-w-md mx-auto mb-8 block"
      />

      {filteredGames.length > 0 ? (
        <div className="flex flex-wrap gap-4 justify-center">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="bg-slate-800 border border-slate-600 rounded p-4 flex flex-col items-center"
            >
              <img
                src={game.image}
                alt={game.name}
                className="w-40 h-52 object-cover mb-2 rounded"
              />
              <p className="text-lg font-semibold">{game.name}</p>
              <p className="text-sm text-gray-300">{game.price} ฿</p>
              <button
                onClick={() => handleDeleteByName(game.name)}
                className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">No matching games found.</p>
      )}
    </div>
  );
}
