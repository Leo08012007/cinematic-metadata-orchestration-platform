import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";

export default function Analytics() {
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
            Movie Analytics Dashboard
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-3xl mx-auto leading-relaxed font-light">
            Interactive Business Intelligence powered by Microsoft Fabric and Power BI.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <main className="min-h-screen bg-[#F2EEF6] py-10 text-[#322442] overflow-hidden">
        <div className="space-y-10">
          
          {/* Centered Analytics Container (occupies up to 1600px) */}
          <div className="max-w-[1600px] mx-auto w-full px-4 md:px-8">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden animate-fade-in-up">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <h2 className="text-lg md:text-xl font-bold text-[#322442] flex items-center gap-2">
                  📊 Interactive Power BI Report
                </h2>
                <span className="text-xs bg-purple-50 text-[#7D59A6] border border-purple-200 px-3 py-1 rounded-full font-bold">
                  Microsoft Fabric Live Sync
                </span>
              </div>

              {/* Force Desktop Presentation Height using inline styles */}
              <div 
                className="relative w-full bg-[#1E112C]/5"
                style={{ height: "850px", minHeight: "850px" }}
              >
                <iframe
                  title="Cinematic Analytics Report"
                  src="https://app.fabric.microsoft.com/reportEmbed?reportId=592a7a74-eb57-4380-b41b-9881d06857aa&autoAuth=true&ctid=7b8d4885-765a-4299-9a92-4edb30779085"
                  width="100%"
                  height="100%"
                  allowFullScreen={true}
                  className="w-full h-full border-0"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Standard Width Container for other sections */}
          <div className="max-w-7xl mx-auto w-full px-4 md:px-8 space-y-10">
            
            {/* Analytics Highlights */}
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-extrabold text-center text-[#322442]">
                Analytics Highlights
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Revenue Analysis */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-48 animate-fade-in-up [animation-delay:100ms]">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl p-2 bg-emerald-50 text-emerald-600 rounded-xl inline-block shadow-sm">
                        💰
                      </span>
                      <h3 className="text-lg font-bold text-[#322442]">Revenue Analysis</h3>
                    </div>
                    <p className="text-[#4B5563] text-xs md:text-sm leading-relaxed">
                      Track box office performance, net profit margins, and return on investment (ROI) metrics across major production budgets.
                    </p>
                  </div>
                </div>

                {/* Budget Distribution */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-48 animate-fade-in-up [animation-delay:150ms]">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl p-2 bg-purple-50 text-[#7D59A6] rounded-xl inline-block shadow-sm">
                        💼
                      </span>
                      <h3 className="text-lg font-bold text-[#322442]">Budget Distribution</h3>
                    </div>
                    <p className="text-[#4B5563] text-xs md:text-sm leading-relaxed">
                      Analyze investment capital allocated across film productions and map standard capital budgets to resulting return metrics.
                    </p>
                  </div>
                </div>

                {/* Movie Ratings */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-48 animate-fade-in-up [animation-delay:200ms]">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl p-2 bg-yellow-50 text-yellow-600 rounded-xl inline-block shadow-sm">
                        ⭐
                      </span>
                      <h3 className="text-lg font-bold text-[#322442]">Movie Ratings</h3>
                    </div>
                    <p className="text-[#4B5563] text-xs md:text-sm leading-relaxed">
                      Review audience scores, voting distribution curves, and compare critic metrics against general box office performance.
                    </p>
                  </div>
                </div>

                {/* Popularity Trends */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-48 animate-fade-in-up [animation-delay:250ms]">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl p-2 bg-pink-50 text-pink-600 rounded-xl inline-block shadow-sm">
                        🔥
                      </span>
                      <h3 className="text-lg font-bold text-[#322442]">Popularity Trends</h3>
                    </div>
                    <p className="text-[#4B5563] text-xs md:text-sm leading-relaxed">
                      Monitor audience popularity scores and identify trending titles based on live dynamic telemetry and voting behavior.
                    </p>
                  </div>
                </div>

                {/* Language Distribution */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-48 animate-fade-in-up [animation-delay:300ms]">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl p-2 bg-indigo-50 text-indigo-600 rounded-xl inline-block shadow-sm">
                        🌐
                      </span>
                      <h3 className="text-lg font-bold text-[#322442]">Language Distribution</h3>
                    </div>
                    <p className="text-[#4B5563] text-xs md:text-sm leading-relaxed">
                      Investigate original language distribution and segment international releases, revealing dominant regional patterns.
                    </p>
                  </div>
                </div>

                {/* Genre Analysis */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-48 animate-fade-in-up [animation-delay:350ms]">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl p-2 bg-blue-50 text-blue-600 rounded-xl inline-block shadow-sm">
                        🎭
                      </span>
                      <h3 className="text-lg font-bold text-[#322442]">Genre Analysis</h3>
                    </div>
                    <p className="text-[#4B5563] text-xs md:text-sm leading-relaxed">
                      Break down movie attributes by genre to identify high-yield categories, runtime profiles, and release popularity.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* High-Contrast Technology Stack Section */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl animate-fade-in-up [animation-delay:400ms]">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#322442] mb-2">
                  Analytics Technology Stack
                </h2>
                <p className="text-[#4B5563] text-xs md:text-sm max-w-2xl mx-auto">
                  Powering end-to-end data orchestration, loading, and visualization.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                
                {/* Fabric */}
                <div className="bg-[#F2EEF6] rounded-2xl p-5 text-center border border-[#CBBDDB]/45 hover:bg-[#E8E2EE] hover:shadow-md transition-all duration-300">
                  <span className="text-4xl mb-3 block">💎</span>
                  <strong className="text-[#322442] block text-base font-extrabold mb-1">Microsoft Fabric</strong>
                  <span className="text-xs text-[#4B5563] block font-medium">SaaS Lakehouse</span>
                </div>

                {/* Power BI */}
                <div className="bg-[#F2EEF6] rounded-2xl p-5 text-center border border-[#CBBDDB]/45 hover:bg-[#E8E2EE] hover:shadow-md transition-all duration-300">
                  <span className="text-4xl mb-3 block">📊</span>
                  <strong className="text-[#322442] block text-base font-extrabold mb-1">Power BI</strong>
                  <span className="text-xs text-[#4B5563] block font-medium">Interactive BI</span>
                </div>

                {/* Azure SQL */}
                <div className="bg-[#F2EEF6] rounded-2xl p-5 text-center border border-[#CBBDDB]/45 hover:bg-[#E8E2EE] hover:shadow-md transition-all duration-300">
                  <span className="text-4xl mb-3 block">🛢️</span>
                  <strong className="text-[#322442] block text-base font-extrabold mb-1">Azure SQL DB</strong>
                  <span className="text-xs text-[#4B5563] block font-medium">Cloud RDBMS</span>
                </div>

                {/* FastAPI */}
                <div className="bg-[#F2EEF6] rounded-2xl p-5 text-center border border-[#CBBDDB]/45 hover:bg-[#E8E2EE] hover:shadow-md transition-all duration-300">
                  <span className="text-4xl mb-3 block">⚡</span>
                  <strong className="text-[#322442] block text-base font-extrabold mb-1">FastAPI</strong>
                  <span className="text-xs text-[#4B5563] block font-medium">REST JSON API</span>
                </div>

                {/* Next.js */}
                <div className="bg-[#F2EEF6] rounded-2xl p-5 text-center border border-[#CBBDDB]/45 hover:bg-[#E8E2EE] hover:shadow-md transition-all duration-300">
                  <span className="text-4xl mb-3 block">⚛️</span>
                  <strong className="text-[#322442] block text-base font-extrabold mb-1">Next.js</strong>
                  <span className="text-xs text-[#4B5563] block font-medium">App Router</span>
                </div>

                {/* Tailwind */}
                <div className="bg-[#F2EEF6] rounded-2xl p-5 text-center border border-[#CBBDDB]/45 hover:bg-[#E8E2EE] hover:shadow-md transition-all duration-300">
                  <span className="text-4xl mb-3 block">🎨</span>
                  <strong className="text-[#322442] block text-base font-extrabold mb-1">Tailwind CSS</strong>
                  <span className="text-xs text-[#4B5563] block font-medium">Vanilla Styling</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
