"use client";

import { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function LoginPage() {
  const router = useRouter();
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const result = schema.safeParse(data);
    if (!result.success) {
      setError("Invalid email or password (min 6 characters).");
      return;
    }

    const endpoint = isRegistering ? "/api/register" : "/api/login";

    const res = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const result = await res.json();
      const { email, role } = result;

      localStorage.setItem("user", JSON.stringify({ email, role }));

      if (role === "admin") {
        redirect("/admin");
      } else {
        router.push("/dashboard");
      }
    } else {
      const msg = await res.text();
      setError(msg || "Something went wrong.");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-slate-800 to-slate-500 text-white">
    {/* ✅ Main Topic Title */}
    <h1 className="text-6xl font-bold mb-6">🎮 Game Store 🎮</h1>

    <div className="bg-white text-black rounded-lg shadow-lg p-6 sm:p-8 w-full max-w-sm sm:max-w-md lg:max-w-lg space-y-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-center">
          {isRegistering ? "Register" : "Login"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
          >
            {isRegistering ? "Register" : "Login"}
          </button>
        </form>

        <button
          onClick={() => {
            setError("");
            setIsRegistering(!isRegistering);
          }}
          className="w-full text-sm text-center text-gray-600 underline"
        >
          {isRegistering
            ? "Already have an account? Log in"
            : "No account? Register now"}
        </button>
      </div>
    </div>
  );
}
