from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from .database import get_db
from . import crud, schemas

app = FastAPI(
    title="Cinematic Metadata Orchestration Platform API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Cinematic Metadata Orchestration Platform API is running!"
    }


@app.get("/movies", response_model=list[schemas.Movie])
def get_movies(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    return crud.get_movies(db, skip, limit)


@app.get("/movies/search", response_model=list[schemas.Movie])
def search_movies(
    title: str,
    db: Session = Depends(get_db)
):
    return crud.search_movies(db, title)


@app.get("/movies/genre/{genre}", response_model=list[schemas.Movie])
def get_movies_by_genre(
    genre: str,
    db: Session = Depends(get_db)
):
    return crud.get_movies_by_genre(db, genre)


@app.get("/movies/language/{language}", response_model=list[schemas.Movie])
def get_movies_by_language(
    language: str,
    db: Session = Depends(get_db)
):
    return crud.get_movies_by_language(db, language)


@app.get("/movies/year/{year}", response_model=list[schemas.Movie])
def get_movies_by_year(
    year: int,
    db: Session = Depends(get_db)
):
    return crud.get_movies_by_year(db, year)


@app.get("/movies/top-rated", response_model=list[schemas.Movie])
def get_top_rated_movies(
    limit: int = 20,
    db: Session = Depends(get_db)
):
    return crud.get_top_rated_movies(db, limit)


@app.get("/movies/high-budget", response_model=list[schemas.Movie])
def get_high_budget_movies(
    budget: int = 100000000,
    db: Session = Depends(get_db)
):
    return crud.get_high_budget_movies(db, budget)


@app.get("/movies/{movie_id}", response_model=schemas.Movie)
def get_movie(
    movie_id: int,
    db: Session = Depends(get_db)
):
    movie = crud.get_movie(db, movie_id)

    if movie is None:
        raise HTTPException(
            status_code=404,
            detail="Movie not found"
        )

    return movie