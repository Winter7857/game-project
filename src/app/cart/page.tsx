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

export default function CartPage() {
  const [cart, setCart] = useState<Game[]>([]);
  const router = useRouter();

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const totalPrice = cart.reduce((total, game) => total + game.price, 0);

  const handleCheckout = () => {
    localStorage.removeItem("cart");
    setCart([]);
    toast.success(" Order placed successfully!"); // ✅ Toast instead of alert
    router.push("/dashboard");
  };
  

  const handleRemove = (id: string) => {
    toast((t) => (
      <div className="text-white">
        <p>Remove this game from your cart?</p>
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              const newCart = cart.filter((game) => game.id !== id);
              setCart(newCart);
              localStorage.setItem("cart", JSON.stringify(newCart));
              toast.success("Game removed from cart.", {
                duration: 2000,
                icon: "🗑️",
              });
              
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
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">🛒 Your Cart</h1>
        <button
          onClick={() => router.push("/dashboard")}
          className="bg-cyan-400 hover:bg-cyan-500 text-black font-semibold px-4 py-2 rounded"
        >
          Back to Store
        </button>
      </div>

      {cart.length === 0 ? (
        <p className="text-gray-400 text-center">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {cart.map((game) => (
            <div
              key={game.id}
              className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-800 p-4 rounded shadow"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left w-full">
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-24 h-32 object-cover rounded mx-auto sm:mx-0"
                />
                <div>
                  <p className="text-xl font-semibold">{game.name}</p>
                  <p className="text-sm text-gray-300">{game.price} ฿</p>
                </div>
              </div>

              <button
                onClick={() => handleRemove(game.id)}
                className="text-red-400 hover:text-red-600 font-bold text-xl mt-2 sm:mt-0"
                title="Remove from Cart"
              >
                ❌
              </button>
            </div>
          ))}

          <div className="text-right mt-6">
            <p className="text-2xl font-bold mb-4">
              Total: <span className="text-green-400">{totalPrice} ฿</span>
            </p>
            <button
              onClick={handleCheckout}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded font-semibold"
            >
              ✅ Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
