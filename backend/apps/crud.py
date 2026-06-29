from sqlalchemy.orm import Session
from . import models
from sqlalchemy import extract


def get_movies(db: Session, skip: int = 0, limit: int = 100):
    return (
        db.query(models.Movie)
        .order_by(models.Movie.id)
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_movie(db: Session, movie_id: int):
    return (
        db.query(models.Movie)
        .filter(models.Movie.id == movie_id)
        .first()
    )


def search_movies(db: Session, title: str):
    return (
        db.query(models.Movie)
        .filter(models.Movie.title.ilike(f"%{title}%"))
        .order_by(models.Movie.title)
        .all()
    )


def get_movies_by_genre(db: Session, genre: str):
    return (
        db.query(models.Movie)
        .filter(models.Movie.genres.ilike(f"%{genre}%"))
        .order_by(models.Movie.vote_average.desc())
        .all()
    )


def get_movies_by_language(db: Session, language: str):
    return (
        db.query(models.Movie)
        .filter(models.Movie.original_language == language)
        .order_by(models.Movie.vote_average.desc())
        .all()
    )


def get_movies_by_year(db: Session, year: int):
    return (
        db.query(models.Movie)
        .filter(extract("year", models.Movie.release_date) == year)
        .order_by(models.Movie.release_date)
        .all()
    )


def get_top_rated_movies(db: Session, limit: int = 20):
    return (
        db.query(models.Movie)
        .order_by(models.Movie.vote_average.desc())
        .limit(limit)
        .all()
    )


def get_high_budget_movies(db: Session, budget: int = 100000000):
    return (
        db.query(models.Movie)
        .filter(models.Movie.budget >= budget)
        .order_by(models.Movie.budget.desc())
        .all()
    )