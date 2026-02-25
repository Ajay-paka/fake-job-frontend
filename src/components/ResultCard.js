function ResultCard({ result }) {
    const scoreColor =
        result.score >= 80
            ? "green"
            : result.score >= 50
                ? "orange"
                : "red";

    return (
        <div
            style={{
                marginTop: "30px",
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                textAlign: "left",
                backgroundColor: "#fafafa"
            }}
        >
            <h2>Analysis Result</h2>

            {/* Score */}
            <p><strong>Score:</strong> {result.score}</p>

            {/* Progress Bar */}
            <div
                style={{
                    height: "20px",
                    background: "#eee",
                    borderRadius: "10px",
                    overflow: "hidden",
                    marginBottom: "15px"
                }}
            >
                <div
                    style={{
                        width: `${result.score}%`,
                        background: scoreColor,
                        height: "100%"
                    }}
                />
            </div>

            {/* Risk Level */}
            <p>
                <strong>Risk Level:</strong>{" "}
                <span style={{ color: scoreColor, fontWeight: "bold" }}>
                    {result.risk}
                </span>
            </p>

            {/* Flags */}
            <h4>Detected Issues:</h4>
            {result.flags.length === 0 ? (
                <p style={{ color: "green" }}>No red flags detected ✅</p>
            ) : (
                <ul>
                    {result.flags.map((flag, index) => (
                        <li key={index}>{flag}</li>
                    ))}
                </ul>
            )}
            {result.matched_words && result.matched_words.length > 0 && (
                <div style={{ marginTop: "15px" }}>
                    <h4>Matched Keywords:</h4>
                    <ul>
                        {result.matched_words.map((word, index) => (
                            <li key={index} style={{ color: "red" }}>
                                {word}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default ResultCard;