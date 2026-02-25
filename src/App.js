import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import TextAreaInput from "./components/TextAreaInput";
import ResultCard from "./components/ResultCard";
import RiskChart from "./components/RiskChart";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [filterRisk, setFilterRisk] = useState("All");

  const thStyle = {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left"
  };

  const tdStyle = {
    border: "1px solid #ddd",
    padding: "8px"
  };

  const analyzeJob = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("https://fake-job-backend.up.railway.app/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      setResult(data);
      fetchHistory(); // Refresh history after analysis
    } catch (error) {
      console.error("Error:", error);
    }

    setLoading(false);
  };

  const fetchHistory = async () => {
    try {
      const response = await fetch("https://fake-job-backend.up.railway.app/history");
      const data = await response.json();
      setHistory(data);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };
  useEffect(() => {
    fetchHistory();
  }, []);
  const deleteHistory = async (id) => {
    try {
      await fetch(`https://fake-job-backend.up.railway.app/history/${id}`, {
        method: "DELETE"
      });
      fetchHistory(); // refresh after delete
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "50px auto", textAlign: "center" }}>
      <Header />
      <TextAreaInput text={text} setText={setText} />

      <button onClick={analyzeJob} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {loading && <p>Scanning job description... 🔍</p>}
      {result && <ResultCard result={result} />}

      {history.length > 0 && (
        <div style={{ marginTop: "40px", textAlign: "left" }}>
          <h3>Scan History</h3>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ marginRight: "10px" }}>Filter by Risk:</label>
            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <ul>
            {history
              .filter(item =>
                filterRisk === "All" ? true : item.risk === filterRisk
              )
              .map((item) => (
                <li key={item.id}>
                  {item.created_at}  —    Score:{item.score}    —   {" "}
                  <span
                    style={{
                      color:
                        item.risk === "Low"
                          ? "green"
                          : item.risk === "Medium"
                            ? "orange"
                            : "red"
                    }}
                  >
                    {item.risk}
                  </span>
                  <button
                    onClick={() => deleteHistory(item.id)}
                    style={{
                      marginLeft: "15px",
                      background: "red",
                      color: "white",
                      border: "none",
                      padding: "3px 8px",
                      cursor: "pointer"
                    }}
                  >
                    Delete
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}
      {history.length > 0 && <RiskChart history={history} />}
    </div>
  );
}

export default App;