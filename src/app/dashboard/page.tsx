import Link from "next/link"

export default function SomePage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Welcome to Game Store 🎮</h1>

      <Link href="/login">
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Go to Login
        </button>
      </Link>
    </main>
  )
}
