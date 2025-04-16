import Link from "next/link"

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-black text-white p-6 relative">
      {/* Top-right Back to Login */}
      <div className="absolute top-4 right-6">
        <Link href="/login">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            Back to Login
          </button>
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-4">🛠 Admin Panel</h1>
      <p>Welcome, Admin! You can manage users and games here.</p>
    </main>
  )
}
