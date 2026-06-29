import os
from dotenv import load_dotenv
from sqlalchemy import create_engine,text
from sqlalchemy.orm import sessionmaker, declarative_base
from urllib.parse import quote_plus

load_dotenv()

SERVER = os.getenv("DB_SERVER")
DATABASE = os.getenv("DB_DATABASE")
USERNAME = os.getenv("DB_USERNAME")
PASSWORD = os.getenv("DB_PASSWORD")
DRIVER = os.getenv("DB_DRIVER")

connection_string = (
    f"mssql+pyodbc://{USERNAME}:{quote_plus(PASSWORD)}@{SERVER}:1433/{DATABASE}"
    f"?driver={quote_plus(DRIVER)}"
    "&Encrypt=yes"
    "&TrustServerCertificate=yes"
"&timeout=30"
)

engine = create_engine(
    connection_string,
    pool_pre_ping=True,
    echo=True
)
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        

try:
    with engine.connect() as conn:
        result = conn.execute(text("SELECT TOP 1 title FROM dbo.tmdb_5000_movies_gold"))
        print("✅ SQLAlchemy Connected!")
        print(result.fetchone())
except Exception as e:
    print("❌ SQLAlchemy Error:")
    print(e)
