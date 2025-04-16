"use client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Footer from "@/components/Footer";

export default function AdminPage() {
  // Placeholder game data for demo
    const router = useRouter();
  const games = [
    {
      id: 1,
      name: "Game 1",
      price: 999,
      img: "https://via.placeholder.com/200x120?text=img",
    },
    {
      id: 2,
      name: "Game 2",
      price: 699,
      img: "https://via.placeholder.com/200x120?text=img",
    },
    {
      id: 3,
      name: "Game 3",
      price: 499,
      img: "https://via.placeholder.com/200x120?text=img",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-800 text-white relative flex flex-col items-center">
      {/* Logout Button */}
      <div className="absolute top-4 right-8">
        <button
          onClick={() => router.push("/login")}
          className="bg-gray-200 text-black px-4 py-1 rounded"
        >
          logout
        </button>
      </div>

      {/* Title */}
      <h1 className="text-5xl font-light mt-14 mb-10">GAME STORE</h1>

      {/* Game Grid */}
      <div className="flex flex-row gap-12 mb-16">
        {games.map((game) => (
          <div key={game.id} className="flex flex-col items-center">
            <div className="w-52 h-28 bg-gray-200 text-black flex items-center justify-center mb-4 text-xl font-normal">
              img
            </div>
            <div className="text-center">
              <div className="text-lg">{game.name}</div>
              <div className="text-lg">{game.price} ฿</div>
            </div>
          </div>
        ))}
      </div>
      {/* Action Buttons */}
      <div className="flex flex-row gap-10">
        <button className="bg-gray-200 text-black px-8 py-3 rounded text-xl font-normal">add</button>
        <button className="bg-gray-200 text-black px-8 py-3 rounded text-xl font-normal">edit</button>
        <button className="bg-gray-200 text-black px-8 py-3 rounded text-xl font-normal">delete</button>
      </div>
      <Footer />
    </main>
    
  );
}
