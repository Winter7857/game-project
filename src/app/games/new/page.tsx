"use client"

import { useState } from "react"

import { useRouter } from "next/navigation"
export default function AddGamePage() {
  const [preview, setPreview] = useState("")
  const router = useRouter()
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    if (res.ok) {
      alert("Uploaded successfully!")
      e.currentTarget.reset()
      setPreview("")
    } else {
      alert("Upload failed.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto bg-slate-800 rounded text-white space-y-4">
      <h1 className="text-2xl font-bold text-center">Add Game</h1>
      <input name="name" placeholder="Game name" required className="text-black p-2 w-full rounded" />
      <input name="price" type="number" placeholder="Price" required className="text-black p-2 w-full rounded" />
      <input
        name="image"
        type="file"
        accept="image/*"
        required
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) setPreview(URL.createObjectURL(file))
        }}
        className="text-white"
      />
      {preview && <img src={preview} alt="Preview" className="w-48 mx-auto rounded" />}
      <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded w-full">
        Upload Game
      </button>
      <button
          onClick={() => router.push("/admin")}
          className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded w-full"
        >
          Back to Admin
        </button>
    </form>
  )
}
