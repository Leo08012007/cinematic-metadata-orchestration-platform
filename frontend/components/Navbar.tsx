import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#4B3663]/95 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-10 py-5">

        <div>
          <h1 className="text-3xl font-bold text-white">
            🎬 Cinematic Intelligence
          </h1>

          <p className="text-sm text-gray-300">
            Azure • Fabric • Power BI
          </p>
        </div>

        <div className="flex gap-10 text-white font-medium">

          <Link href="/">Home</Link>

          <Link href="/movies">Movies</Link>

          <Link href="/dashboard">Dashboard</Link>

          <Link href="/analytics">Analytics</Link>

          <Link href="/about">About</Link>

        </div>

      </div>
    </nav>
  );
}
