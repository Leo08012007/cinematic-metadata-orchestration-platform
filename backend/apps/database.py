import os
import urllib.parse
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

load_dotenv()

SERVER = os.getenv("DB_SERVER")
DATABASE = os.getenv("DB_DATABASE")
USERNAME = os.getenv("DB_USERNAME")
PASSWORD = os.getenv("DB_PASSWORD")

# Format and URL-encode credentials for Azure SQL & pymssql compatibility
server_short = SERVER.split(".")[0] if SERVER else ""
formatted_username = f"{USERNAME}@{server_short}" if USERNAME and "@" not in USERNAME else USERNAME

encoded_username = urllib.parse.quote_plus(formatted_username) if formatted_username else ""
encoded_password = urllib.parse.quote_plus(PASSWORD) if PASSWORD else ""

connection_string = (
    f"mssql+pymssql://{encoded_username}:{encoded_password}@{SERVER}:1433/{DATABASE}"
)

engine = create_engine(
    connection_string,
    connect_args={"tds_version": "7.4"},
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