import React, { useState, useEffect } from "react";
import TextAreaInput from "./components/TextAreaInput";
import ResultCard from "./components/ResultCard";
import RiskChart from "./components/RiskChart";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [filterRisk, setFilterRisk] = useState("All");

  const API_URL = process.env.REACT_APP_API_URL || "https://fake-job-backend.up.railway.app";

  const analyzeJob = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      setResult(data);
      fetchHistory();
    } catch (error) {
      console.error("Error:", error);
    }

    setLoading(false);
  };

  const fetchHistory = async () => {
    try {
      const response = await fetch(`${API_URL}/history`);
      const data = await response.json();
      setHistory(data);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  useEffect(() => {
    fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteHistory = async (id) => {
    try {
      await fetch(`${API_URL}/history/${id}`, {
        method: "DELETE",
      });
      fetchHistory();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-green-300 overflow-x-hidden">

      {/* Cyber Grid Background */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,255,128,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,128,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* HERO SECTION */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 scan-lines">

        {/* Glitch Frame & Title */}
        <div className="glitch-frame-wrapper">
          <div className="glitch-box">
            {/* tracking-[0.15em] adds the spacing you need */}
            <h1 className="glitch-main text-5xl md:text-7xl font-black tracking-[0.15em] uppercase" data-text="FAKE JOB DETECTOR">
              FAKE JOB DETECTOR
            </h1>

            {/* Subtitle with even wider spacing */}
            <div className="glitch-sub text-cyan-400 tracking-[0.8em] text-xs md:text-sm mt-4 font-bold" data-text="CYBER INTELLIGENCE">
              CYBER INTELLIGENCE
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="mt-14 max-w-2xl text-lg text-green-400 leading-relaxed font-mono opacity-80">
          Advanced cyber risk intelligence system designed to detect fraudulent job
          postings, scam patterns, and financial traps in recruitment offers.
        </p>

        {/* Start Button */}
        <div className="mt-16">
          <button
            onClick={() =>
              document
                .getElementById("analyzer")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="px-12 py-4 border-2 border-cyan-400 text-cyan-400 rounded-none text-lg font-bold hover:bg-cyan-400 hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,255,255,0.3)] uppercase tracking-[0.2em]"
          >
            START SCANNING
          </button>
        </div>
      </section>


      {/* ANALYZER SECTION */}
      <section id="analyzer" className="relative z-10 py-20 px-6 flex justify-center">
        <div className="w-full max-w-4xl bg-black/50 backdrop-blur-2xl border border-green-500/30 rounded-3xl p-8 shadow-[0_0_50px_rgba(0,255,128,0.15)]">

          <h2 className="text-2xl font-bold mb-6 text-green-400">
            Analyze Job Description
          </h2>

          <TextAreaInput text={text} setText={setText} />

          {/* FUTURE UPLOAD BUTTON (Disabled for now) */}
          <div className="mt-4 text-sm text-green-500 opacity-60">
            PDF / Image Upload (Coming Soon 🚀)
          </div>

          <button
            onClick={analyzeJob}
            disabled={loading}
            className="mt-6 w-full bg-black border border-red-400 text-red-400 font-semibold py-3 rounded-xl transition duration-300 hover:bg-red-500 hover:text-black"
          >
            {loading ? "Analyzing..." : "Analyze Job"}
          </button>

        </div>
      </section>

      {/* RESULT SECTION */}
      {result && (
        <section className="relative z-10 py-16 px-6 flex justify-center">
          <div className="w-full max-w-4xl">
            <ResultCard result={result} />
          </div>
        </section>
      )}

      {/* RISK CHART SECTION */}
      {history.length > 0 && (
        <section className="relative z-10 py-16 px-6 flex justify-center">
          <div className="w-full max-w-4xl">
            <RiskChart history={history} />
          </div>
        </section>
      )}

    </div>
  );
}

export default App;