"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import MovieCard from "../../components/MovieCard";
import SearchBar from "../../components/SearchBar";
import FilterBar from "../../components/FilterBar";
import { Movie } from "../../types/movie";

export default function Movies() {
  const [dbMovies, setDbMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load database movies based on search or language filter
  useEffect(() => {
    // Scenario 1: Search is active (language will have been cleared)
    if (search.trim() !== "") {
      const timer = setTimeout(() => {
        fetchSearchMovies(search);
      }, 300);
      return () => clearTimeout(timer);
    }

    // Scenario 2: Search is empty, but language filter is active
    if (selectedLanguage !== "") {
      fetchLanguageMovies(selectedLanguage);
      return;
    }

    // Scenario 3: Both search and language are empty (restore all movies)
    loadMovies();
  }, [search, selectedLanguage]);

  async function loadMovies() {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("http://127.0.0.1:8000/movies");
      if (!res.ok) {
        throw new Error("Failed to connect to the movies database.");
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setDbMovies(data);
      } else {
        setDbMovies([]);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load movies.");
      setDbMovies([]);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchSearchMovies(value: string) {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/movies/search?title=${encodeURIComponent(value)}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch search results from server.");
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setDbMovies(data);
      } else {
        setDbMovies([]);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Search query failed.");
      setDbMovies([]);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchLanguageMovies(language: string) {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/movies/language/${language}`
      );
      if (!res.ok) {
        throw new Error(`Failed to load movies for language code: ${language}`);
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setDbMovies(data);
      } else {
        setDbMovies([]);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Language filter query failed.");
      setDbMovies([]);
    } finally {
      setIsLoading(false);
    }
  }

  function searchMovies(value: string) {
    setSearch(value);
    // Clear language filter if user types in search box
    if (value.trim() !== "") {
      setSelectedLanguage("");
    }
  }

  function filterByLanguage(language: string) {
    setSelectedLanguage(language);
    // Clear search box if user selects a language filter
    if (language !== "") {
      setSearch("");
    }
  }

  function resetAllFilters() {
    setSearch("");
    setSelectedLanguage("");
    setSelectedRating("");
    setSelectedYear("");
  }

  // Frontend-only filters for Rating and Release Year
  const filteredMovies = dbMovies.filter((movie) => {
    // 1. Rating filter
    if (selectedRating) {
      const minRating = parseFloat(selectedRating);
      if (
        movie.vote_average === undefined ||
        movie.vote_average === null ||
        movie.vote_average < minRating
      ) {
        return false;
      }
    }

    // 2. Release Year filter
    if (selectedYear) {
      const minYear = parseInt(selectedYear);
      if (!movie.release_date) {
        return false;
      }
      const releaseYear = parseInt(movie.release_date.split("-")[0]);
      if (isNaN(releaseYear) || releaseYear < minYear) {
        return false;
      }
    }

    return true;
  });

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F2EEF6] p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[#322442] mb-3">
            Movie Collection
          </h1>

          <p className="text-gray-600 mb-10 text-base md:text-lg">
            Explore blockbuster movies from the TMDB dataset.
          </p>

          <SearchBar value={search} onSearch={searchMovies} />

          <FilterBar
            selectedLanguage={selectedLanguage}
            selectedRating={selectedRating}
            selectedYear={selectedYear}
            onLanguageChange={filterByLanguage}
            onRatingChange={setSelectedRating}
            onYearChange={setSelectedYear}
          />

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="w-16 h-16 border-4 border-t-[#7D59A6] border-r-transparent border-b-[#7D59A6] border-l-transparent rounded-full animate-spin"></div>
              <p className="mt-6 text-lg font-semibold text-[#4B3663] animate-pulse">
                Curating your movie collection...
              </p>
            </div>
          ) : error ? (
            <div className="max-w-xl mx-auto my-12 bg-white border border-red-200 rounded-3xl p-8 text-center shadow-lg">
              <div className="text-red-500 text-5xl mb-4">⚠️</div>
              <h3 className="text-2xl font-bold text-red-950 mb-2">
                Unable to load movies
              </h3>
              <p className="text-red-700 mb-6">{error}</p>
              <button
                onClick={loadMovies}
                className="px-6 py-3 bg-[#7D59A6] text-white font-semibold rounded-xl hover:bg-[#644785] transition"
              >
                Try Again
              </button>
            </div>
          ) : filteredMovies.length === 0 ? (
            <div className="max-w-md mx-auto my-16 bg-white border border-[#CBBDDB] rounded-3xl p-10 text-center shadow-lg">
              <div className="text-6xl mb-6">🎬</div>
              <h3 className="text-2xl font-bold text-[#322442] mb-3">
                No Movies Found
              </h3>
              <p className="text-gray-600 mb-8">
                We couldn't find any movies matching your current filters. Try searching for a different title or resetting the filters.
              </p>
              <button
                onClick={resetAllFilters}
                className="px-6 py-3 bg-[#7D59A6] text-white font-semibold rounded-xl hover:bg-[#644785] transition shadow-md"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  language={movie.original_language || "N/A"}
                  rating={movie.vote_average || 0}
                  revenue={movie.revenue || 0}
                  releaseDate={movie.release_date || "N/A"}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}