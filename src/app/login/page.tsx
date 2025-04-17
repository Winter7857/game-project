"use client";

import { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";

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

      // ✅ Store user data in localStorage
localStorage.setItem(
  "user",
  JSON.stringify({ email, role })
);

// ✅ Store cookie for middleware use
document.cookie = `user=${encodeURIComponent(JSON.stringify({ email, role }))}; path=/`;


      // 🔀 Redirect based on role
      if (role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } else {
      const msg = await res.text();
      setError(msg || "Something went wrong.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-800 to-slate-500 text-white px-4">
      <div className="bg-white text-black p-8 rounded-lg shadow-lg w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">
          {isRegistering ? "Register" : "Login"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="border p-2 w-full rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="border p-2 w-full rounded"
          />
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 w-full rounded"
          >
            {isRegistering ? "Register" : "Login"}
          </button>
        </form>

        <button
          onClick={() => {
            setError("");
            setIsRegistering(!isRegistering);
          }}
          className="text-sm text-center text-gray-600 underline w-full"
        >
          {isRegistering
            ? "Already have an account? Log in"
            : "No account? Register now"}
        </button>
      </div>
    </div>
  );
}
