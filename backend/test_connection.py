import pyodbc

try:
    conn = pyodbc.connect(
        "DRIVER={ODBC Driver 18 for SQL Server};"
        "SERVER=movieanalyticssqlserver.database.windows.net;"
        "DATABASE=movieanalyticsdb2;"
        "UID=movieadmin;"
        "PWD=mokshitha@007;"
        "Encrypt=yes;"
        "TrustServerCertificate=no;"
        "Connection Timeout=30;"
    )

    print("✅ Connected successfully!")

    cursor = conn.cursor()
    cursor.execute("SELECT TOP 5 title FROM dbo.tmdb_5000_movies_gold")

    for row in cursor.fetchall():
        print(row)

    conn.close()

except Exception as e:
    print("❌ Error:")
    print(e)