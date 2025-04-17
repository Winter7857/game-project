"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewGamePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/games", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price: parseInt(price),
        image: imageUrl,
      }),
    });

    if (res.ok) {
      alert("Game added!");
      router.push("/admin");
    } else {
      alert("Failed to add game.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-800 text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-slate-600 p-6 sm:p-8 rounded-lg flex flex-col gap-4"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">Add Game</h1>

        <input
          type="text"
          placeholder="Game name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 rounded text-black"
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="p-2 rounded text-black"
          required
        />

        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="p-2 rounded text-black"
          required
        />

        <button
          type="submit"
          className="bg-cyan-400 hover:bg-cyan-500 text-black font-semibold py-2 rounded"
        >
          Upload Game
        </button>

        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 rounded"
        >
          Back to Admin Dashboard
        </button>
      </form>
    </div>
  );
}
