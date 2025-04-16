// src/components/Footer.tsx
export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white w-full">
        <div className="max-w-6xl mx-auto px-4 py-4 text-center text-sm">
          © {new Date().getFullYear()} Game Store. All rights reserved.
        </div>
      </footer>
    );
  }
  