export interface Movie {
  id: number;
  title: string;
  original_title: string | null;
  original_language: string | null;
  genres: string | null;
  budget: number | null;
  revenue: number | null;
  popularity: number | null;
  runtime: number | null;
  vote_average: number | null;
  vote_count: number | null;
  release_date: string | null; // ISO date string (YYYY-MM-DD)
  homepage: string | null;
  keywords: string | null;
  overview: string | null;
  production_companies: string | null;
  production_countries: string | null;
  spoken_languages: string | null;
  status: string | null;
  tagline: string | null;
}
