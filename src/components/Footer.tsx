// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white w-full mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-4 text-center text-sm">
        © {new Date().getFullYear()} <span className="font-semibold">Game Store</span>. All rights reserved.
      </div>
    </footer>
  );
}
