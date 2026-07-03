# 🎬 Cinematic Metadata Orchestration & Intelligence Platform

An end-to-end cloud-based **Movie Analytics Platform** built using **Microsoft Fabric**, **Azure SQL Database**, **FastAPI**, **Next.js**, and **Power BI**.

The platform processes raw TMDB movie datasets through the **Medallion Architecture (Bronze → Silver → Gold)**, transforms them into analytics-ready datasets, and delivers an interactive web application for movie exploration and business intelligence.

---

## 🚀 Project Overview

The Cinematic Metadata Orchestration & Intelligence Platform demonstrates a complete Azure Data Engineering workflow by integrating cloud-based data processing, backend APIs, frontend development, and interactive analytics into a unified solution.

The project follows the modern **ETL pipeline** approach:

```
TMDB Dataset
      │
      ▼
Microsoft Fabric Lakehouse
      │
      ▼
Bronze Layer
      │
      ▼
Silver Layer
      │
      ▼
Gold Layer
      │
      ▼
Azure SQL Database
      │
      ▼
FastAPI Backend
      │
 ┌────┴────┐
 ▼         ▼
Next.js   Power BI
Website   Dashboard
```

---

# ✨ Features

- 📥 End-to-End ETL Pipeline using Microsoft Fabric
- 🏗️ Medallion Architecture (Bronze, Silver & Gold Layers)
- ☁️ Azure SQL Database Integration
- ⚡ FastAPI REST APIs
- 💻 Responsive Next.js Web Application
- 🔍 Advanced Movie Search & Filtering
- 📊 Interactive Power BI Dashboard
- 🚀 Cloud Deployment using Render & Vercel

---

# 🛠️ Technology Stack

## Cloud & Data Engineering

- Microsoft Azure
- Microsoft Fabric
- Lakehouse
- Medallion Architecture
- ETL Pipeline

## Database

- Azure SQL Database
- SQLAlchemy

## Backend

- Python
- FastAPI

## Frontend

- Next.js
- React
- TypeScript

## Analytics

- Microsoft Power BI

## Deployment

- Render
- Vercel

## Version Control

- Git
- GitHub

---

# 📂 Project Structure

```
cinematic-metadata-orchestration-platform/
│
├── backend/
│   ├── apps/
│   ├── requirements.txt
│   └── main.py
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── public/
│   └── package.json
│
├── assets/
│
├── documentation/
│
└── README.md
```

---

# 📊 Data Engineering Pipeline

### Bronze Layer
- Stores raw TMDB datasets.
- Preserves original data.

### Silver Layer
- Cleans and validates movie metadata.
- Handles missing values.
- Standardizes dataset structure.

### Gold Layer
- Generates analytics-ready datasets.
- Optimized for reporting and dashboards.

---

# 🌐 Web Application Features

- Movie Search
- Language Filter
- Rating Filter
- Release Year Filter
- Popularity Filter
- Detailed Movie Information
- Responsive UI

---

# 📈 Power BI Dashboard

The Power BI dashboard provides interactive insights including:

- Revenue Analysis
- Budget Analysis
- Genre Distribution
- Movie Ratings
- Popularity Trends
- Release Year Analysis

> **Note:** The Power BI dashboard is published within Microsoft Fabric. Public access is restricted due to organizational tenant security policies.

---

# 🚀 Deployment

| Service | Platform |
|----------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | Azure SQL Database |
| Data Engineering | Microsoft Fabric |
| Analytics | Power BI |

---

# 🎯 Project Outcome

The platform successfully transforms raw TMDB movie datasets into meaningful business insights through a scalable cloud-based architecture.

Users can:

- 🔍 Search movies efficiently
- 🎯 Filter movies based on multiple criteria
- 📄 View detailed movie information
- 📊 Explore interactive analytics dashboards
- ⚡ Access movie metadata through a responsive web application

---

# 🔮 Future Enhancements

- AI-powered Movie Recommendation System
- User Authentication
- Real-time Data Ingestion
- Automated ETL Pipelines
- Predictive Analytics
- CI/CD Pipeline
- Mobile Application

---

# 📚 Dataset

**TMDB Movie Metadata Dataset**

Contains information about:

- 4,803 Movies
- Genres
- Languages
- Budget
- Revenue
- Ratings
- Popularity
- Release Dates

---

# 👩‍💻 Author

**T. Mokshitha**

B.Tech Computer Science Engineering

Vel Tech University, Chennai

Summer Internship 2026

SITER Academy, Norge

---

## ⭐ If you found this project useful, consider giving it a star!
deployment link : https://cinematic-metadata-orchestration-pl.vercel.app/ 
