"use client";

import { useRouter } from "next/navigation";

type MovieCardProps = {
  id: number;
  title: string;
  language: string;
  rating: number;
  revenue: number;
  releaseDate: string;
};

export default function MovieCard({
  id,
  title,
  language,
  rating,
  revenue,
  releaseDate,
}: MovieCardProps) {
  const router = useRouter();

  const handleViewDetails = () => {
    try {
      const recent = localStorage.getItem("recent_viewed_movies");
      let list = recent ? JSON.parse(recent) : [];
      if (!Array.isArray(list)) {
        list = [];
      }

      // Remove existing item to avoid duplicates, and prepend new one
      list = list.filter((item: any) => item.id !== id);
      list.unshift({
        id,
        title,
        language,
        rating,
        revenue,
        releaseDate,
        viewedAt: new Date().toISOString(),
      });

      // Keep only the top 10 recently viewed items
      if (list.length > 10) {
        list = list.slice(0, 10);
      }

      localStorage.setItem("recent_viewed_movies", JSON.stringify(list));
    } catch (e) {
      console.error("Failed to save recently viewed movie:", e);
    }
    router.push(`/movies/${id}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition">
      <h2 className="text-2xl font-bold text-[#322442]">{title}</h2>

      <div className="grid grid-cols-2 gap-3 mt-4 text-gray-700">
        <p>
          <span className="font-semibold">Language:</span> {language}
        </p>

        <p>
          <span className="font-semibold">Rating:</span> ⭐ {rating}
        </p>

        <p>
          <span className="font-semibold">Revenue:</span> ${revenue.toLocaleString()}
        </p>

        <p>
          <span className="font-semibold">Release:</span> {releaseDate}
        </p>
      </div>

      <button
        onClick={handleViewDetails}
        className="mt-6 w-full bg-[#644785] text-white rounded-xl py-3 hover:bg-[#4B3663] transition font-semibold"
      >
        View Details
      </button>
    </div>
  );
}