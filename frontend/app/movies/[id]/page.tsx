import Link from "next/link";
import Navbar from "../../../components/Navbar";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

// Safe JSON array parsing helper
function parseJsonArray(jsonStr: string | null | undefined): string[] {
  if (!jsonStr) return [];
  try {
    const parsed = JSON.parse(jsonStr);
    if (Array.isArray(parsed)) {
      return parsed.map((item: any) => item.name);
    }
  } catch (e) {
    // Fallback if already comma-separated or plain text
    if (jsonStr.includes(",")) {
      return jsonStr.split(",").map((s) => s.trim());
    }
    return [jsonStr];
  }
  return [];
}

// Currency formatting helper
function formatCurrency(value: number | null | undefined): string {
  if (value === undefined || value === null || value === 0) return "Undisclosed";
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

// Profit calculation helper
function calculateProfit(
  revenue: number | null | undefined,
  budget: number | null | undefined
): { value: number; text: string; isPositive: boolean } | null {
  if (!revenue || !budget) return null;
  const profit = revenue - budget;
  return {
    value: profit,
    text: profit.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }),
    isPositive: profit >= 0,
  };
}

// ROI calculation helper
function calculateROI(
  revenue: number | null | undefined,
  budget: number | null | undefined
): string | null {
  if (!revenue || !budget || budget === 0) return null;
  const roi = (revenue / budget) * 100;
  return `${roi.toLocaleString("en-US", { maximumFractionDigits: 1 })}%`;
}

// Date formatting helper
function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Runtime formatting helper
function formatRuntime(minutes: number | null | undefined): string {
  if (!minutes) return "N/A";
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hrs > 0) {
    return `${hrs}h ${mins}m`;
  }
  return `${mins}m`;
}

export default async function MovieDetails({ params }: Props) {
  const { id } = await params;

  let movie;
  try {
    const res = await fetch(`http://127.0.0.1:8000/movies/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Movie fetch failed");
    }
    movie = await res.json();
  } catch (err) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#F2EEF6] flex flex-col items-center justify-center p-6">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 text-center border border-red-100">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h1 className="text-3xl font-bold text-red-950 mb-3">
              Movie Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              We couldn't retrieve the details for this movie. It might not exist in the database or the connection failed.
            </p>
            <Link href="/movies">
              <button className="px-6 py-3 bg-[#7D59A6] text-white font-semibold rounded-xl hover:bg-[#644785] transition">
                Return to Collection
              </button>
            </Link>
          </div>
        </main>
      </>
    );
  }

  // Parse fields
  const genres = movie.genres
    ? movie.genres.split(",").map((s: string) => s.trim())
    : [];
  const companies = parseJsonArray(movie.production_companies);
  const countries = parseJsonArray(movie.production_countries);
  const languages = parseJsonArray(movie.spoken_languages);
  const profitData = calculateProfit(movie.revenue, movie.budget);
  const roiData = calculateROI(movie.revenue, movie.budget);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F2EEF6] p-6 md:p-10">
        <div className="max-w-6xl mx-auto">
          {/* Navigation link */}
          <Link
            href="/movies"
            className="inline-flex items-center gap-2 text-[#7D59A6] hover:text-[#4B3663] transition font-semibold mb-6 group"
          >
            <span className="text-xl group-hover:-translate-x-1 transition-transform">
              ←
            </span>{" "}
            Back to Collection
          </Link>

          {/* Premium Hero Banner */}
          <div className="bg-gradient-to-br from-[#1E112C] via-[#322442] to-[#4B3663] text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden mb-10 border border-[#4B3663]/40">
            {/* Absolute decorative gradient highlights */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full filter blur-3xl -ml-20 -mb-20"></div>

            <div className="relative z-10">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
                {movie.title}
              </h1>

              {movie.tagline && (
                <p className="italic text-purple-200 text-lg md:text-xl font-light mb-8 border-l-4 border-[#7D59A6] pl-4">
                  "{movie.tagline}"
                </p>
              )}

              {/* Badges Row */}
              <div className="flex flex-wrap gap-4 text-sm md:text-base text-gray-200 font-medium">
                <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                  ⭐ <strong className="text-white">{movie.vote_average?.toFixed(1) || "0.0"}</strong>/10 ({movie.vote_count?.toLocaleString()} votes)
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                  ⏱️ {formatRuntime(movie.runtime)}
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                  📅 {formatDate(movie.release_date)}
                </span>
                {movie.status && (
                  <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                    🏷️ {movie.status}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Page content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left side: Overview and financial performance */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview Card */}
              <div className="bg-white rounded-3xl shadow-md p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-[#322442] mb-4">
                  Overview
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg font-light">
                  {movie.overview || "No overview available for this movie."}
                </p>
              </div>

              {/* Financial & Performance Card */}
              <div className="bg-white rounded-3xl shadow-md p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-[#322442] mb-6">
                  Financial Metadata
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Budget */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                    <span className="text-sm font-semibold text-slate-500 block mb-1">
                      Budget
                    </span>
                    <span className="text-2xl font-bold text-[#322442]">
                      {formatCurrency(movie.budget)}
                    </span>
                  </div>

                  {/* Revenue */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                    <span className="text-sm font-semibold text-slate-500 block mb-1">
                      Revenue
                    </span>
                    <span className="text-2xl font-bold text-[#322442]">
                      {formatCurrency(movie.revenue)}
                    </span>
                  </div>

                  {/* Profit */}
                  {profitData && (
                    <div
                      className={`p-5 rounded-2xl border ${
                        profitData.isPositive
                          ? "bg-emerald-50/70 border-emerald-100 text-emerald-950"
                          : "bg-rose-50/70 border-rose-100 text-rose-950"
                      }`}
                    >
                      <span className="text-sm font-semibold text-slate-500 block mb-1">
                        Net Profit
                      </span>
                      <span
                        className={`text-2xl font-extrabold ${
                          profitData.isPositive
                            ? "text-emerald-700"
                            : "text-rose-700"
                        }`}
                      >
                        {profitData.text}
                      </span>
                    </div>
                  )}

                  {/* ROI */}
                  {roiData && (
                    <div className="bg-purple-50/50 p-5 rounded-2xl border border-purple-100">
                      <span className="text-sm font-semibold text-purple-500 block mb-1">
                        Return on Investment (ROI)
                      </span>
                      <span className="text-2xl font-extrabold text-purple-700">
                        {roiData}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right side: Detailed sidebar statistics */}
            <div className="space-y-8">
              <div className="bg-white rounded-3xl shadow-md p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-[#322442] mb-6">
                  Technical Details
                </h2>

                <div className="space-y-6 text-base">
                  {/* Original Title */}
                  {movie.original_title &&
                    movie.original_title !== movie.title && (
                      <div>
                        <strong className="text-slate-500 block text-sm font-semibold mb-1">
                          Original Title
                        </strong>
                        <span className="text-gray-800">
                          {movie.original_title}
                        </span>
                      </div>
                    )}

                  {/* Genres */}
                  {genres.length > 0 && (
                    <div>
                      <strong className="text-slate-500 block text-sm font-semibold mb-2">
                        Genres
                      </strong>
                      <div className="flex flex-wrap gap-2">
                        {genres.map((genre: string) => (
                          <span
                            key={genre}
                            className="bg-purple-50 text-[#7D59A6] border border-purple-200 px-3 py-1 rounded-full text-xs font-semibold"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Original Language */}
                  <div>
                    <strong className="text-slate-500 block text-sm font-semibold mb-1">
                      Original Language
                    </strong>
                    <span className="text-gray-800 uppercase font-medium">
                      {movie.original_language || "N/A"}
                    </span>
                  </div>

                  {/* Popularity */}
                  {movie.popularity !== undefined &&
                    movie.popularity !== null && (
                      <div>
                        <strong className="text-slate-500 block text-sm font-semibold mb-1">
                          Popularity Score
                        </strong>
                        <div className="flex items-center gap-3">
                          <span className="text-gray-800 font-semibold">
                            {movie.popularity.toFixed(2)}
                          </span>
                          {/* Visual progress bar representation of popularity */}
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#7D59A6] rounded-full"
                              style={{
                                width: `${Math.min(
                                  (movie.popularity / 250) * 100,
                                  100
                                )}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}

                  <hr className="border-gray-100 my-4" />

                  {/* Production Companies */}
                  {companies.length > 0 && (
                    <div>
                      <strong className="text-slate-500 block text-sm font-semibold mb-1">
                        Production Companies
                      </strong>
                      <p className="text-gray-800 text-sm leading-relaxed">
                        {companies.join(", ")}
                      </p>
                    </div>
                  )}

                  {/* Production Countries */}
                  {countries.length > 0 && (
                    <div>
                      <strong className="text-slate-500 block text-sm font-semibold mb-1">
                        Production Countries
                      </strong>
                      <p className="text-gray-800 text-sm">
                        {countries.join(", ")}
                      </p>
                    </div>
                  )}

                  {/* Spoken Languages */}
                  {languages.length > 0 && (
                    <div>
                      <strong className="text-slate-500 block text-sm font-semibold mb-1">
                        Spoken Languages
                      </strong>
                      <p className="text-gray-800 text-sm">
                        {languages.join(", ")}
                      </p>
                    </div>
                  )}

                  {/* Website link */}
                  {movie.homepage && (
                    <div className="pt-4">
                      <a
                        href={movie.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center bg-[#7D59A6] hover:bg-[#644785] text-white font-semibold py-3 px-4 rounded-xl transition shadow-md hover:shadow-lg"
                      >
                        Visit Official Website
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}