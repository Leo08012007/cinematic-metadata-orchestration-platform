import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative h-[85vh] bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/hero-banner.png')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#322442]/70"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="max-w-7xl mx-auto px-10">

          <h1 className="text-6xl font-bold text-white leading-tight">
            Cinematic Metadata Orchestration & 
            <br />
            Intelligence Platform
          </h1>

          <p className="mt-8 max-w-2xl text-xl text-gray-200">
            Explore over 5,000 movies through Azure-powered metadata analytics,
            Microsoft Fabric, Power BI dashboards, and intelligent search.
          </p>

          <div className="mt-10 flex gap-5">

            <Link href="/movies">
              <button className="rounded-xl bg-[#7D59A6] px-8 py-4 text-white font-semibold hover:bg-[#644785] transition">
                Explore Movies
              </button>
            </Link>

            <Link href="/dashboard">
              <button className="rounded-xl border border-white px-8 py-4 text-white hover:bg-white hover:text-[#322442] transition">
                View Dashboard
              </button>
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
}
