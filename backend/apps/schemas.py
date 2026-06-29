from pydantic import BaseModel
from datetime import date


class Movie(BaseModel):
    id: int
    title: str
    original_title: str | None = None
    original_language: str | None = None
    genres: str | None = None

    budget: int | None = None
    revenue: int | None = None

    popularity: float | None = None
    runtime: int | None = None

    vote_average: float | None = None
    vote_count: int | None = None

    release_date: date | None = None

    homepage: str | None = None
    keywords: str | None = None
    overview: str | None = None

    production_companies: str | None = None
    production_countries: str | None = None
    spoken_languages: str | None = None

    status: str | None = None
    tagline: str | None = None

    class Config:
        from_attributes = True