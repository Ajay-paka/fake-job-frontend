function ResultCard({ result }) {
    const scoreColor =
        result.score >= 80
            ? "bg-green-500"
            : result.score >= 50
                ? "bg-yellow-500"
                : "bg-red-500";

    return (
        <div className="mt-8 bg-black/50 backdrop-blur-xl border border-green-500/30 rounded-2xl p-6 text-green-200 shadow-[0_0_40px_rgba(0,255,128,0.15)]">

            <h2 className="text-2xl font-bold mb-4 tracking-wide text-green-400">
                ANALYSIS RESULT
            </h2>

            {/* HIGH RISK ALERT */}
            {result.risk?.toLowerCase() === "high" && (
                <div className="mb-4 text-red-500 font-bold animate-pulse drop-shadow-[0_0_10px_rgba(255,0,0,0.9)]">
                    ⚠ HIGH RISK DETECTED ⚠
                </div>
            )}

            {/* Score */}
            <p className="mb-2">
                <strong>Score:</strong> {result.score}%
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden mb-4">
                <div
                    className={`${scoreColor} h-4 transition-all duration-700 shadow-[0_0_15px_rgba(0,255,128,0.6)]`}
                    style={{ width: `${result.score}%` }}
                />
            </div>

            {/* Risk Level */}
            <p className="mb-4">
                <strong>Risk Level:</strong>{" "}
                <span
                    className={`font-bold ${result.risk === "Low"
                        ? "text-green-400"
                        : result.risk === "Medium"
                            ? "text-yellow-400"
                            : "text-red-400"
                        }`}
                >
                    {result.risk}
                </span>
            </p>

            {/* Flags */}
            <h4 className="font-semibold mb-2 text-green-400">
                Detected Issues:
            </h4>

            {result.flags.length === 0 ? (
                <p className="text-green-400">
                    No red flags detected ✅
                </p>
            ) : (
                <ul className="space-y-2">
                    {result.flags.map((flag, index) => (
                        <li
                            key={index}
                            className="bg-red-500/10 border border-red-500/30 text-red-400 px-3 py-2 rounded-lg"
                        >
                            {flag}
                        </li>
                    ))}
                </ul>
            )}

            {/* Matched Keywords */}
            {result.matched_words && result.matched_words.length > 0 && (
                <div className="mt-6">
                    <h4 className="font-semibold mb-2 text-green-400">
                        Matched Keywords:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {result.matched_words.map((word, index) => (
                            <span
                                key={index}
                                className="bg-red-500/10 text-red-400 border border-red-500/40 px-3 py-1 rounded-full text-sm"
                            >
                                {word}
                            </span>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
}

export default ResultCard;