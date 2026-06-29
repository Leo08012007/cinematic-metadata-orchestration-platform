from sqlalchemy import Column, Integer, BigInteger, Float, String, Date
from .database import Base


class Movie(Base):
    __tablename__ = "tmdb_5000_movies_gold"
    __table_args__ = {"schema": "dbo"}

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String)
    original_title = Column(String)
    original_language = Column(String)
    genres = Column(String)

    budget = Column(BigInteger)
    revenue = Column(BigInteger)

    popularity = Column(Float)
    runtime = Column(Integer)

    vote_average = Column(Float)
    vote_count = Column(Integer)

    release_date = Column(Date)

    homepage = Column(String)
    keywords = Column(String)
    overview = Column(String)

    production_companies = Column(String)
    production_countries = Column(String)
    spoken_languages = Column(String)

    status = Column(String)
    tagline = Column(String)