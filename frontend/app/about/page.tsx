import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";

const architectureSteps = [
  { num: "01", name: "Movie Dataset", desc: "Raw TMDB metadata files containing budget, revenue, and telemetry data." },
  { num: "02", name: "Bronze Layer", desc: "Fabric Lakehouse raw folder landing, archiving unaltered source datasets." },
  { num: "03", name: "Silver Layer", desc: "Data cleaning, schema alignment, casting, and deduplication via PySpark." },
  { num: "04", name: "Gold Layer", desc: "Aggregated, dimensionalized tables ready for business analytics consumption." },
  { num: "05", name: "Azure SQL DB", desc: "High-performance SQL relational storage containing the curated Gold tables." },
  { num: "06", name: "FastAPI REST API", desc: "Fast API layer supplying JSON payloads to the frontend via SQLAlchemy ORM." },
  { num: "07", name: "Next.js Web App", desc: "Modern App Router user interface presenting the movie collection dynamically." },
  { num: "08", name: "Power BI Dashboard", desc: "Rich analytical reports synchronized directly to Microsoft Fabric." },
];

const technologies = [
  { name: "Next.js", icon: "⚛️", desc: "React framework with Server Component data fetching and optimized App Router." },
  { name: "TypeScript", icon: "📘", desc: "Strictly typed language additions preventing compilation errors and runtime faults." },
  { name: "Tailwind CSS", icon: "🎨", desc: "Modern styling framework utilized for custom layouts and responsiveness." },
  { name: "FastAPI", icon: "⚡", desc: "High-performance Python REST API framework delivering lightning-fast JSON endpoints." },
  { name: "Python", icon: "🐍", desc: "Core language driving Spark ETL pipelines, local processing scripts, and FastAPI." },
  { name: "SQLAlchemy", icon: "🔌", desc: "Python SQL ORM facilitating secure database query operations." },
  { name: "Azure SQL DB", icon: "☁️", desc: "Fully managed, secure cloud relational database hosting gold operational data." },
  { name: "Microsoft Fabric", icon: "💎", desc: "End-to-end unified SaaS data lakehouse platform powering ingestion and Spark jobs." },
  { name: "Power BI", icon: "📊", desc: "Business Intelligence visualization tool building executive dashboards." },
  { name: "Git", icon: "🌳", desc: "Distributed version control system managing application revisions and source code." },
  { name: "GitHub", icon: "🐙", desc: "Hosting platform facilitating workspace collaboration, code reviews, and deployments." },
];

const keyFeatures = [
  { title: "Movie Search", icon: "🔍", desc: "Debounced real-time movie queries executing search requests only after typing pauses." },
  { title: "Movie Details", icon: "🍿", desc: "Detailed page presenting financial statistics, cast languages, and parsed production items." },
  { title: "Language Filter", icon: "🗣️", desc: "FastAPI-connected dropdown to view movie counts and scores grouped by language." },
  { title: "Rating Filter", icon: "⭐", desc: "Instant frontend filter segmenting loaded movies by their rating threshold." },
  { title: "Release Year Filter", icon: "📅", desc: "Chronological filter separating movie lists by release decades dynamically." },
  { title: "REST API", icon: "🚀", desc: "Structured, validated FastAPI endpoints serving localized filters and search items." },
  { title: "Interactive Dashboard", icon: "📈", desc: "Executive dashboard visualizing catalog totals, trend telemetry, and timeline data." },
  { title: "Power BI Analytics", icon: "📊", desc: "Direct embedding of Power BI reports allowing complex sorting and visual drill-downs." },
  { title: "Responsive UI", icon: "📱", desc: "Tailwind CSS utility alignment providing clean desktop, tablet, and mobile layouts." },
  { title: "Modern Architecture", icon: "🏗️", desc: "Cohesive medallion lakehouse pipeline feeding SQL data stores and web endpoints." },
];

export default function About() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-[#1E112C] text-white overflow-hidden py-12 md:py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E112C] via-[#322442] to-[#4B3663] opacity-90"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full filter blur-3xl -ml-20 -mb-20"></div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-10 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            About the Platform
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-4xl mx-auto leading-relaxed font-light">
            An end-to-end Azure Data Engineering and Business Intelligence platform for ingesting, transforming, storing, querying, and visualizing cinematic metadata using Microsoft Fabric and Power BI.
          </p>
        </div>
      </section>

      <main className="min-h-screen bg-[#F2EEF6] py-10 text-[#322442] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-10">
          
          {/* Project Overview */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-md border border-gray-100 animate-fade-in-up">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#322442] mb-4">Platform Overview</h2>
            <div className="text-[#4B5563] leading-relaxed text-sm md:text-base space-y-3 font-light">
              <p>
                This platform showcases a complete modern data engineering workflow designed to process large volumes of cinematic metadata. The source data runs through an orchestration system, where it is cleansed, transformed, and aggregated to generate business intelligence metrics.
              </p>
              <p>
                By connecting Microsoft Fabric's SaaS data lakehouse capabilities with Azure's cloud relational storage and custom REST APIs, the system transforms raw movie datasets into interactive dashboards and responsive front-end representations.
              </p>
            </div>
          </div>

          {/* System Architecture */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-center text-[#322442]">System Architecture</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {architectureSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="relative bg-white rounded-2xl p-5 border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-36 animate-fade-in-up [animation-delay:100ms]"
                >
                  <div className="flex justify-between items-start">
                    <span 
                      className="text-[#7D59A6] font-semibold text-lg"
                      style={{ fontFamily: "Arial, sans-serif", letterSpacing: "0.08em" }}
                    >
                      {step.num}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-[#322442] text-sm md:text-base mb-0.5">{step.name}</h3>
                    <p className="text-[#4B5563] text-xs leading-relaxed font-light">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Data Engineering Pipeline & Business Intelligence */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Medallion Pipeline */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-md animate-fade-in-up [animation-delay:200ms]">
              <h2 className="text-xl md:text-2xl font-bold text-[#322442] mb-5 flex items-center gap-2">
                💎 Medallion Architecture
              </h2>
              <div className="space-y-5">
                <div className="border-l-4 border-amber-500 pl-4">
                  <h3 className="font-bold text-[#322442] text-base">Bronze Layer (Raw)</h3>
                  <p className="text-[#4B5563] text-xs md:text-sm mt-1 leading-relaxed font-light">
                    Maintains the historical integrity of the ingested movie metadata, archiving unchanged raw records directly.
                  </p>
                </div>
                <div className="border-l-4 border-slate-400 pl-4">
                  <h3 className="font-bold text-[#322442] text-base">Silver Layer (Enriched)</h3>
                  <p className="text-[#4B5563] text-xs md:text-sm mt-1 leading-relaxed font-light">
                    Performs schema normalization, data cleaning, filtering of incomplete values, and formatting of language tags.
                  </p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h3 className="font-bold text-[#322442] text-base">Gold Layer (Curated)</h3>
                  <p className="text-[#4B5563] text-xs md:text-sm mt-1 leading-relaxed font-light">
                    Builds optimized star-schema aggregates and operational tables ready for high-performance visual analysis and REST consumption.
                  </p>
                </div>
              </div>
            </div>

            {/* Business Intelligence */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-md animate-fade-in-up [animation-delay:300ms]">
              <h2 className="text-xl md:text-2xl font-bold text-[#322442] mb-5 flex items-center gap-2">
                📊 Business Intelligence
              </h2>
              <p className="text-[#4B5563] text-xs md:text-sm mb-5 leading-relaxed font-light">
                The Power BI reports integrated into the platform extract aggregated records from the Microsoft Fabric warehouse, delivering deep telemetry visualizations:
              </p>
              <div className="grid grid-cols-2 gap-4 text-xs font-bold text-[#322442]">
                <span className="bg-[#F2EEF6] p-2.5 rounded-xl border border-[#CBBDDB]/45 block">💰 Revenue Analysis</span>
                <span className="bg-[#F2EEF6] p-2.5 rounded-xl border border-[#CBBDDB]/45 block">💼 Budget Analysis</span>
                <span className="bg-[#F2EEF6] p-2.5 rounded-xl border border-[#CBBDDB]/45 block">🔥 Popularity Trends</span>
                <span className="bg-[#F2EEF6] p-2.5 rounded-xl border border-[#CBBDDB]/45 block">🎭 Genre Segmentations</span>
                <span className="bg-[#F2EEF6] p-2.5 rounded-xl border border-[#CBBDDB]/45 block">🌐 Languages</span>
                <span className="bg-[#F2EEF6] p-2.5 rounded-xl border border-[#CBBDDB]/45 block">⭐ Movie Ratings</span>
              </div>
              <p className="text-[#4B5563] text-xs mt-5 leading-relaxed italic font-light">
                Users can engage with dynamic slicers, cross-filtering, and hierarchy drill-downs inside the Analytics hub.
              </p>
            </div>

          </div>

          {/* Technology Stack */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-center text-[#322442]">Technology Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {technologies.map((tech, idx) => (
                <div
                  key={tech.name}
                  className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300 animate-fade-in-up [animation-delay:350ms]"
                >
                  <span className="text-4xl mb-3 block">{tech.icon}</span>
                  <h3 className="font-extrabold text-[#322442] text-base mb-1">{tech.name}</h3>
                  <p className="text-[#4B5563] text-xs leading-relaxed font-light">{tech.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-center text-[#322442]">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {keyFeatures.map((feature, idx) => (
                <div
                  key={feature.title}
                  className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300 h-36 flex flex-col justify-between animate-fade-in-up [animation-delay:400ms]"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl block">{feature.icon}</span>
                      <h3 className="font-extrabold text-[#322442] text-xs md:text-sm">{feature.title}</h3>
                    </div>
                    <p className="text-[#4B5563] text-[11px] leading-relaxed font-light">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Objectives & Developer */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Objectives */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-md animate-fade-in-up [animation-delay:500ms]">
              <h2 className="text-2xl font-bold text-[#322442] mb-5">Project Objectives</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm text-[#4B5563] font-light">
                <div className="flex gap-2 items-start">
                  <span className="text-[#7D59A6] font-bold">✔</span>
                  Build a scalable movie metadata ingestion and telemetry platform.
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-[#7D59A6] font-bold">✔</span>
                  Demonstrate Azure Cloud Data Engineering medallion workflow structures.
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-[#7D59A6] font-bold">✔</span>
                  Showcase Spark ETL execution within Microsoft Fabric workspaces.
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-[#7D59A6] font-bold">✔</span>
                  Expose REST API endpoints leveraging FastAPI and SQLAlchemy.
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-[#7D59A6] font-bold">✔</span>
                  Directly embed interactive dashboard reporting using Power BI workspace URLs.
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-[#7D59A6] font-bold">✔</span>
                  Deploy a responsive, production-ready full-stack portfolio app.
                </div>
              </div>
            </div>

            {/* Developer Section */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-md flex flex-col justify-between text-center animate-fade-in-up [animation-delay:550ms]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#7D59A6] block mb-2">Architecture & Build</span>
                <h2 className="text-2xl font-extrabold text-[#322442] mb-4">Developer</h2>
                <p className="text-[#4B5563] text-xs md:text-sm leading-relaxed font-light">
                  This project was developed as a full-stack Azure Data Engineering portfolio project demonstrating modern cloud data engineering practices, REST API development, interactive analytics, and responsive web application design.
                </p>
              </div>
              <span className="text-[#7D59A6] font-semibold text-xs mt-6 block">Cinematic Intelligence Platform</span>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
