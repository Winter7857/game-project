import Link from "next/link"

export default function RegisterSuccessPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4">✅ Registration Successful!</h1>
      <p className="text-lg mb-6">You can now log in to your account.</p>
      <Link href="/login">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          Go to Login
        </button>
      </Link>
    </main>
  )
}
