import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white text-[#4B5563] border-t border-[#CBBDDB] mt-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-[#CBBDDB]/40 pb-6 mb-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-[#322442] flex items-center justify-center md:justify-start gap-2">
              🎬 Cinematic Intelligence
            </h2>
            <p className="text-xs text-[#4B5563] mt-1">
              Azure Data Engineering & Business Intelligence Platform
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-sm font-semibold text-[#322442]">
            <Link href="/" className="hover:text-[#7D59A6] transition">
              Home
            </Link>
            <Link href="/movies" className="hover:text-[#7D59A6] transition text-nowrap">
              Movies
            </Link>
            <Link href="/dashboard" className="hover:text-[#7D59A6] transition text-nowrap">
              Dashboard
            </Link>
            <Link href="/analytics" className="hover:text-[#7D59A6] transition text-nowrap">
              Analytics
            </Link>
            <Link href="/about" className="hover:text-[#7D59A6] transition text-nowrap">
              About
            </Link>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-[#4B5563]">
          <p className="text-center md:text-left leading-relaxed">
            Built with ❤️ using <span className="text-[#322442] font-semibold">Microsoft Fabric</span> •{" "}
            <span className="text-[#322442] font-semibold">Azure SQL</span> •{" "}
            <span className="text-[#322442] font-semibold">FastAPI</span> •{" "}
            <span className="text-[#322442] font-semibold">Next.js</span> •{" "}
            <span className="text-[#322442] font-semibold">Power BI</span> •{" "}
            <span className="text-[#322442] font-semibold">Tailwind CSS</span>
          </p>
          <p className="text-center md:text-right">© {new Date().getFullYear()} Cinematic Intelligence. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
