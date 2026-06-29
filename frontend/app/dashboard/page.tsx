"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { Movie } from "../../types/movie";

// Map of language codes to display names
const languageNames: { [key: string]: string } = {
  en: "English",
  fr: "French",
  ja: "Japanese",
  es: "Spanish",
  de: "German",
  hi: "Hindi",
  it: "Italian",
  cn: "Chinese",
  zh: "Chinese",
  ru: "Russian",
  ko: "Korean",
  te: "Telugu",
  ta: "Tamil",
  ml: "Malayalam",
  kn: "Kannada",
};

// Helper to format currency
function formatCurrency(value: number | null | undefined): string {
  if (value === undefined || value === null || value === 0) return "Undisclosed";
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B`;
  }
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }
  return `$${value.toLocaleString()}`;
}

export default function Dashboard() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recentViewed, setRecentViewed] = useState<any[]>([]);

  useEffect(() => {
    loadDashboardData();
    loadRecentActivity();
  }, []);

  async function loadDashboardData() {
    setIsLoading(true);
    setError(null);
    try {
      // Fetching all movies to compute KPIs and widget lists dynamically
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies?limit=5000`);
      if (!res.ok) {
        throw new Error("Unable to fetch operational overview from the database server.");
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setMovies(data);
      } else {
        setMovies([]);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to establish a secure database link.");
    } finally {
      setIsLoading(false);
    }
  }

  function loadRecentActivity() {
    try {
      const recent = localStorage.getItem("recent_viewed_movies");
      if (recent) {
        const parsed = JSON.parse(recent);
        if (Array.isArray(parsed)) {
          setRecentViewed(parsed.slice(0, 5));
        }
      }
    } catch (e) {
      console.error("Failed to load recent activity:", e);
    }
  }

  // --- Dynamic calculations from database response using reduce to prevent TypeScript type narrowing ---
  const totalMovies = movies.length;

  const uniqueLanguages = Array.from(
    new Set(movies.map((m) => m.original_language).filter(Boolean))
  );
  const totalLanguages = uniqueLanguages.length;

  const ratedMovies = movies.filter(
    (m) => typeof m.vote_average === "number" && m.vote_average > 0
  );
  const averageRating =
    ratedMovies.length > 0
      ? (
          ratedMovies.reduce((sum, m) => sum + (m.vote_average || 0), 0) /
          ratedMovies.length
        ).toFixed(1)
      : "0.0";

  const highestRevenueMovie = movies.reduce<Movie | null>((prev, current) => {
    if (!prev) return current;
    return (current.revenue || 0) > (prev.revenue || 0) ? current : prev;
  }, null);

  const highestBudgetMovie = movies.reduce<Movie | null>((prev, current) => {
    if (!prev) return current;
    return (current.budget || 0) > (prev.budget || 0) ? current : prev;
  }, null);

  const mostPopularMovie = movies.reduce<Movie | null>((prev, current) => {
    if (!prev) return current;
    return (current.popularity || 0) > (prev.popularity || 0) ? current : prev;
  }, null);

  // Calculate dominant language
  const langCounts = movies.reduce<{ [key: string]: number }>((acc, m) => {
    if (m.original_language) {
      acc[m.original_language] = (acc[m.original_language] || 0) + 1;
    }
    return acc;
  }, {});

  const dominantLangCode = Object.keys(langCounts).reduce((prev, current) => {
    return langCounts[current] > (langCounts[prev] || 0) ? current : prev;
  }, "");

  const dominantLanguage = languageNames[dominantLangCode] || dominantLangCode || "English";

  // Calculate high ROI movie (budget > $1M to filter out extreme low-budget outliers)
  const highestROIMovie = movies.reduce<Movie | null>((prev, current) => {
    if (!current.budget || current.budget <= 1_000_000 || !current.revenue) return prev;
    if (!prev) return current;
    const currentROI = current.revenue / current.budget;
    const prevROI = (prev.revenue || 0) / (prev.budget || 1);
    return currentROI > prevROI ? current : prev;
  }, null);

  // --- Widget dataset sorting ---
  const top5Rated = [...movies]
    .filter((m) => m.vote_average && m.vote_count && m.vote_count >= 10)
    .sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0))
    .slice(0, 5);

  const top5Revenue = [...movies]
    .filter((m) => m.revenue)
    .sort((a, b) => (b.revenue || 0) - (a.revenue || 0))
    .slice(0, 5);

  const top5Recent = [...movies]
    .filter((m) => m.release_date)
    .sort((a, b) => b.release_date!.localeCompare(a.release_date!))
    .slice(0, 5);

  // Helper to format raw dates into user-friendly ones
  function formatReleaseDate(dateStr: string | null | undefined): string {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F2EEF6] p-6 md:p-10 text-[#322442]">
        <div className="max-w-7xl mx-auto space-y-10">
          
          {/* Dashboard Header */}
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">
              Operational Dashboard
            </h1>
            <p className="text-gray-600 text-base md:text-lg">
              Operational intelligence and telemetry overview for the TMDB gold dataset.
            </p>
          </div>

          {isLoading ? (
            /* --- LOADING SKELETON STATE --- */
            <div className="animate-pulse space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-3xl p-6 border border-[#CBBDDB]/40 shadow-sm h-36 flex flex-col justify-between"
                  >
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10 bg-purple-200/50 rounded-xl"></div>
                      <div className="w-16 h-4 bg-purple-200/50 rounded-full"></div>
                    </div>
                    <div className="w-28 h-6 bg-purple-200/50 rounded-full mt-4"></div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-3xl p-8 border border-[#CBBDDB]/40 shadow-md h-96 space-y-4"
                  >
                    <div className="w-36 h-6 bg-purple-200/50 rounded-full mb-6"></div>
                    {[...Array(5)].map((_, j) => (
                      <div
                        key={j}
                        className="flex justify-between items-center py-3 border-b border-purple-100/30"
                      >
                        <div className="w-40 h-4 bg-purple-200/50 rounded-full"></div>
                        <div className="w-12 h-4 bg-purple-200/50 rounded-full"></div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ) : error ? (
            /* --- ERROR STATE --- */
            <div className="max-w-xl mx-auto my-16 bg-white border border-red-200 rounded-3xl p-10 text-center shadow-xl">
              <div className="text-red-500 text-5xl mb-6">⚠️</div>
              <h3 className="text-2xl font-bold text-red-950 mb-3">
                Dashboard Offline
              </h3>
              <p className="text-red-700 mb-8">{error}</p>
              <button
                onClick={loadDashboardData}
                className="px-8 py-4 bg-[#7D59A6] text-white font-semibold rounded-xl hover:bg-[#644785] transition shadow-md hover:shadow-lg"
              >
                Retry Loading
              </button>
            </div>
          ) : movies.length === 0 ? (
            /* --- EMPTY STATE --- */
            <div className="max-w-md mx-auto my-16 bg-white border border-[#CBBDDB] rounded-3xl p-10 text-center shadow-lg">
              <div className="text-6xl mb-6">📭</div>
              <h3 className="text-2xl font-bold text-[#322442] mb-3">
                No Operational Data
              </h3>
              <p className="text-gray-600 mb-8">
                The database is connected but contains no movie metadata items.
              </p>
              <button
                onClick={loadDashboardData}
                className="px-6 py-3 bg-[#7D59A6] text-white font-semibold rounded-xl hover:bg-[#644785] transition shadow-md"
              >
                Refresh
              </button>
            </div>
          ) : (
            /* --- RENDER REAL DATA --- */
            <>
              {/* Top Section: 6 KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                
                {/* 1. Total Movies */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-purple-600 bg-purple-50 p-2.5 rounded-2xl text-xl">
                      🎬
                    </span>
                    <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase">
                      Catalog
                    </span>
                  </div>
                  <div className="mt-4">
                    <span className="text-slate-500 text-xs font-semibold block mb-1">
                      Total Movies
                    </span>
                    <span className="text-3xl font-extrabold text-[#322442]">
                      {totalMovies.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* 2. Total Languages */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-indigo-600 bg-indigo-50 p-2.5 rounded-2xl text-xl">
                      🌐
                    </span>
                    <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase">
                      Localization
                    </span>
                  </div>
                  <div className="mt-4">
                    <span className="text-slate-500 text-xs font-semibold block mb-1">
                      Total Languages
                    </span>
                    <span className="text-3xl font-extrabold text-[#322442]">
                      {totalLanguages}
                    </span>
                  </div>
                </div>

                {/* 3. Average Rating */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-yellow-600 bg-yellow-50 p-2.5 rounded-2xl text-xl">
                      ⭐
                    </span>
                    <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase">
                      Rating
                    </span>
                  </div>
                  <div className="mt-4">
                    <span className="text-slate-500 text-xs font-semibold block mb-1">
                      Average Rating
                    </span>
                    <span className="text-3xl font-extrabold text-[#322442]">
                      {averageRating} <span className="text-sm font-medium text-gray-400">/10</span>
                    </span>
                  </div>
                </div>

                {/* 4. Highest Revenue */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-emerald-600 bg-emerald-50 p-2.5 rounded-2xl text-xl">
                      💰
                    </span>
                    <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase">
                      Revenue
                    </span>
                  </div>
                  <div className="mt-4">
                    <span className="text-slate-500 text-xs font-semibold block mb-1 truncate" title={highestRevenueMovie?.title || "Highest Revenue"}>
                      Top Grossing: {highestRevenueMovie?.title || "N/A"}
                    </span>
                    <span className="text-2xl font-extrabold text-[#322442] block truncate">
                      {formatCurrency(highestRevenueMovie?.revenue)}
                    </span>
                  </div>
                </div>

                {/* 5. Highest Budget */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-red-600 bg-red-50 p-2.5 rounded-2xl text-xl">
                      💼
                    </span>
                    <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase">
                      Investment
                    </span>
                  </div>
                  <div className="mt-4">
                    <span className="text-slate-500 text-xs font-semibold block mb-1 truncate" title={highestBudgetMovie?.title || "Highest Budget"}>
                      Top Costly: {highestBudgetMovie?.title || "N/A"}
                    </span>
                    <span className="text-2xl font-extrabold text-[#322442] block truncate">
                      {formatCurrency(highestBudgetMovie?.budget)}
                    </span>
                  </div>
                </div>

                {/* 6. Most Popular */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-pink-600 bg-pink-50 p-2.5 rounded-2xl text-xl">
                      🔥
                    </span>
                    <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase">
                      Telemetry
                    </span>
                  </div>
                  <div className="mt-4">
                    <span className="text-slate-500 text-xs font-semibold block mb-1 truncate" title={mostPopularMovie?.title || "Most Popular"}>
                      Trend: {mostPopularMovie?.title || "N/A"}
                    </span>
                    <span className="text-2xl font-extrabold text-[#322442] block truncate">
                      {mostPopularMovie?.popularity ? mostPopularMovie.popularity.toFixed(1) : "0.0"}
                    </span>
                  </div>
                </div>

              </div>

              {/* Middle Section: Widgets */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Widget 1: Top Rated Movies */}
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold">⭐ Top Rated Movies</h2>
                      <span className="text-xs bg-yellow-50 text-yellow-800 font-semibold px-2.5 py-1 rounded-full border border-yellow-100">
                        Rating Scale
                      </span>
                    </div>

                    <div className="space-y-4">
                      {top5Rated.map((m, index) => (
                        <div
                          key={m.id}
                          className="flex justify-between items-center py-2.5 border-b border-gray-100 last:border-b-0 hover:bg-slate-50 rounded-xl px-2 transition"
                        >
                          <div className="flex items-center gap-3 overflow-hidden">
                            <span className="text-gray-400 font-semibold w-4">
                              {index + 1}
                            </span>
                            <Link
                              href={`/movies/${m.id}`}
                              className="text-gray-800 font-medium hover:text-[#7D59A6] transition block truncate"
                              title={m.title}
                            >
                              {m.title}
                            </Link>
                          </div>
                          <span className="font-bold text-yellow-600 bg-yellow-50 px-2.5 py-0.5 rounded-lg border border-yellow-100 text-sm">
                            ⭐ {m.vote_average?.toFixed(1) || "0.0"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Link
                    href="/movies"
                    className="mt-6 text-[#7D59A6] hover:text-[#4B3663] text-sm font-semibold inline-flex items-center gap-1 group self-start"
                  >
                    View All Movies <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>

                {/* Widget 2: Highest Revenue Movies */}
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold">💰 Highest Revenue</h2>
                      <span className="text-xs bg-emerald-50 text-emerald-800 font-semibold px-2.5 py-1 rounded-full border border-emerald-100">
                        Box Office
                      </span>
                    </div>

                    <div className="space-y-4">
                      {top5Revenue.map((m, index) => (
                        <div
                          key={m.id}
                          className="flex justify-between items-center py-2.5 border-b border-gray-100 last:border-b-0 hover:bg-slate-50 rounded-xl px-2 transition"
                        >
                          <div className="flex items-center gap-3 overflow-hidden">
                            <span className="text-gray-400 font-semibold w-4">
                              {index + 1}
                            </span>
                            <Link
                              href={`/movies/${m.id}`}
                              className="text-gray-800 font-medium hover:text-[#7D59A6] transition block truncate"
                              title={m.title}
                            >
                              {m.title}
                            </Link>
                          </div>
                          <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-100 text-sm">
                            {formatCurrency(m.revenue)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Link
                    href="/movies"
                    className="mt-6 text-[#7D59A6] hover:text-[#4B3663] text-sm font-semibold inline-flex items-center gap-1 group self-start"
                  >
                    View Financials <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>

                {/* Widget 3: Recent Releases */}
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold">📅 Recent Releases</h2>
                      <span className="text-xs bg-indigo-50 text-indigo-800 font-semibold px-2.5 py-1 rounded-full border border-indigo-100">
                        Timeline
                      </span>
                    </div>

                    <div className="space-y-4">
                      {top5Recent.map((m, index) => (
                        <div
                          key={m.id}
                          className="flex justify-between items-center py-2.5 border-b border-gray-100 last:border-b-0 hover:bg-slate-50 rounded-xl px-2 transition"
                        >
                          <div className="flex items-center gap-3 overflow-hidden">
                            <span className="text-gray-400 font-semibold w-4">
                              {index + 1}
                            </span>
                            <Link
                              href={`/movies/${m.id}`}
                              className="text-gray-800 font-medium hover:text-[#7D59A6] transition block truncate"
                              title={m.title}
                            >
                              {m.title}
                            </Link>
                          </div>
                          <span className="text-gray-600 bg-gray-50 px-2.5 py-0.5 rounded-lg border border-gray-200 text-sm font-medium">
                            {formatReleaseDate(m.release_date)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Link
                    href="/movies"
                    className="mt-6 text-[#7D59A6] hover:text-[#4B3663] text-sm font-semibold inline-flex items-center gap-1 group self-start"
                  >
                    Explore Calendar <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>

              </div>

              {/* Bottom Section Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Insights Column (left side, 2 cols span) */}
                <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                  <h2 className="text-2xl font-bold mb-6">💡 Operational Insights</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base text-gray-700">
                    
                    <div className="flex gap-4 p-4 hover:bg-[#F2EEF6]/40 rounded-2xl transition duration-300">
                      <span className="text-2xl mt-0.5">⭐</span>
                      <div>
                        <strong className="text-slate-900 block font-semibold mb-0.5">Average Metadata Score</strong>
                        The average movie rating computed from the collection is <span className="text-purple-700 font-bold">{averageRating} / 10</span>.
                      </div>
                    </div>

                    <div className="flex gap-4 p-4 hover:bg-[#F2EEF6]/40 rounded-2xl transition duration-300">
                      <span className="text-2xl mt-0.5">🗣️</span>
                      <div>
                        <strong className="text-slate-900 block font-semibold mb-0.5">Language Dominance</strong>
                        <span className="text-[#7D59A6] font-bold">{dominantLanguage}</span> is the dominant language spoken in the database catalog.
                      </div>
                    </div>

                    <div className="flex gap-4 p-4 hover:bg-[#F2EEF6]/40 rounded-2xl transition duration-300">
                      <span className="text-2xl mt-0.5">🏆</span>
                      <div>
                        <strong className="text-slate-900 block font-semibold mb-0.5">Highest Revenue Generation</strong>
                        Highest revenue movie <span className="italic font-medium text-slate-800">"{highestRevenueMovie?.title}"</span> generated <span className="text-emerald-700 font-bold">{highestRevenueMovie?.revenue ? formatCurrency(highestRevenueMovie.revenue) : "N/A"}</span>.
                      </div>
                    </div>

                    {highestROIMovie && (
                      <div className="flex gap-4 p-4 hover:bg-[#F2EEF6]/40 rounded-2xl transition duration-300">
                        <span className="text-2xl mt-0.5">📈</span>
                        <div>
                          <strong className="text-slate-900 block font-semibold mb-0.5">Top Investment Yield (ROI)</strong>
                          The movie with the highest return on investment is <span className="italic font-medium text-slate-800">"{highestROIMovie.title}"</span> yielding <span className="text-purple-700 font-bold">{roiData(highestROIMovie)}</span>.
                        </div>
                      </div>
                    )}

                  </div>
                </div>

                {/* Recent Activity Column */}
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-6">🕒 Recent Activity</h2>
                    {recentViewed.length === 0 ? (
                      <div className="py-12 text-center text-gray-500 flex flex-col items-center">
                        <span className="text-4xl mb-4">👀</span>
                        <p className="text-sm font-medium">No recently viewed movies</p>
                        <p className="text-xs text-gray-400 mt-1 max-w-[200px]">
                          Clicking "View Details" on movie cards will record your navigation history here.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {recentViewed.map((m, idx) => (
                          <div
                            key={`${m.id}-${idx}`}
                            className="flex items-center gap-3.5 p-2 hover:bg-slate-50 rounded-xl transition border-l-4 border-[#7D59A6] pl-3"
                          >
                            <div className="min-w-0 flex-1">
                              <Link
                                href={`/movies/${m.id}`}
                                className="text-gray-800 font-semibold hover:text-[#7D59A6] transition block truncate"
                              >
                                {m.title}
                              </Link>
                              <span className="text-xs text-gray-400 block mt-0.5">
                                Rating: ⭐ {m.rating} • Lang: {m.language}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Quick Navigation Panel */}
              <div>
                <h2 className="text-2xl font-bold mb-6">🚀 Quick Navigation</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  
                  {/* Movies Link */}
                  <Link
                    href="/movies"
                    className="group relative bg-gradient-to-br from-[#4B3663] to-[#322442] p-8 rounded-3xl text-white shadow-md hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 border border-[#4B3663]/40 overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full filter blur-xl -mr-10 -mt-10 group-hover:bg-purple-500/20 transition-all duration-300"></div>
                    <span className="text-3xl mb-3 block">🎬</span>
                    <h3 className="text-xl font-bold mb-2">Movie Collection</h3>
                    <p className="text-gray-300 text-xs mb-6 leading-relaxed">
                      Explore, search, and filter the database of over 5,000 blockbuster releases.
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-purple-300 group-hover:text-white transition">
                      Explore Movies <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </Link>

                  {/* Analytics Link */}
                  <Link
                    href="/analytics"
                    className="group relative bg-gradient-to-br from-[#4B3663] to-[#322442] p-8 rounded-3xl text-white shadow-md hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 border border-[#4B3663]/40 overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full filter blur-xl -mr-10 -mt-10 group-hover:bg-indigo-500/20 transition-all duration-300"></div>
                    <span className="text-3xl mb-3 block">📊</span>
                    <h3 className="text-xl font-bold mb-2">Analytics Hub</h3>
                    <p className="text-gray-300 text-xs mb-6 leading-relaxed">
                      Review key stats, revenue distributions, and deep-dive metadata metrics.
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-purple-300 group-hover:text-white transition">
                      Go to Analytics <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </Link>

                  {/* About Link */}
                  <Link
                    href="/about"
                    className="group relative bg-gradient-to-br from-[#4B3663] to-[#322442] p-8 rounded-3xl text-white shadow-md hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 border border-[#4B3663]/40 overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full filter blur-xl -mr-10 -mt-10 group-hover:bg-pink-500/20 transition-all duration-300"></div>
                    <span className="text-3xl mb-3 block">ℹ️</span>
                    <h3 className="text-xl font-bold mb-2">About Platform</h3>
                    <p className="text-gray-300 text-xs mb-6 leading-relaxed">
                      Learn more about Azure SQL Database, Microsoft Fabric, and Power BI integrations.
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-purple-300 group-hover:text-white transition">
                      Read Details <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </Link>

                </div>
              </div>
            </>
          )}

        </div>
      </main>
    </>
  );
}

// ROI formatter utility for insights
function roiData(movie: Movie): string {
  if (!movie.revenue || !movie.budget || movie.budget === 0) return "N/A";
  const ratio = movie.revenue / movie.budget;
  if (ratio >= 1) {
    return `${ratio.toFixed(1)}x return`;
  }
  return `${((movie.revenue / movie.budget) * 100).toFixed(1)}%`;
}
