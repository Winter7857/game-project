"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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

  // Fetch all games
  useEffect(() => {
    fetch("/api/games")
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.error("Failed to fetch games:", err));
  }, []);

  // Filter by search
  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeleteByName = (name: string) => {
    toast((t) => (
      <div className="text-white">
        <p>Are you sure you want to delete <b>{name}</b>?</p>
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
  
              const res = await fetch("/api/games", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name }),
              });
  
              if (res.ok) {
                toast.success(` "${name}" deleted`);
                setGames((prev) => prev.filter((g) => g.name !== name));
                setSearch("");
              } else {
                toast.error("❌ Failed to delete.");
              }
            }}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Confirm
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-gray-500 text-white px-3 py-1 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    ), {
      duration: 10000,
      style: {
        background: "#1e293b",
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white px-4 py-8 sm:px-10">
      {/* Back Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => router.push("/admin")}
          className="bg-cyan-400 hover:bg-cyan-500 text-black font-semibold py-2 px-4 rounded shadow"
        >
          Back to Admin Dashboard
        </button>
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6">
        Delete Game by Name
      </h1>

      {/* Search Field */}
      <input
        type="text"
        placeholder="Search game name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-3 rounded text-white bg-slate-700 placeholder-gray-400 w-full max-w-md mx-auto block mb-8"
      />

      {/* Games */}
      {filteredGames.length > 0 ? (
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="bg-slate-800 border border-slate-600 rounded-lg p-4 flex flex-col items-center"
            >
              <div className="w-full max-w-[220px] aspect-[2/3] bg-gray-200 overflow-hidden rounded shadow">
  <img
    src={game.image}
    alt={game.name}
    className="w-full h-full object-cover object-top"
  />
</div>


              <p className="text-lg font-semibold">{game.name}</p>
              <p className="text-sm text-gray-300">{game.price} ฿</p>
              <button
                onClick={() => handleDeleteByName(game.name)}
                className="mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 mt-8">
          No matching games found.
        </p>
      )}
    </div>
  );
}
