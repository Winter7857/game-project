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
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-500 p-8 rounded-lg flex flex-col gap-4 w-96"
      >
        <h1 className="text-2xl font-bold text-center">Add Game</h1>

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
          className="bg-cyan-400 hover:bg-cyan-500 text-black font-semibold py-2 rounded"
        >
          Back to Admin
        </button>
      </form>
    </div>
  );
}
