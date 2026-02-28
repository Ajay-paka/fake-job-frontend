function TextAreaInput({ text, setText }) {
    return (
        <div className="text-left mb-6">

            <label className="block text-green-400 font-semibold tracking-wide mb-2">
                Paste Job Description
            </label>

            <textarea
                className="w-full min-h-[150px] p-4 rounded-xl bg-black/60 text-green-300 border border-green-500/30 focus:outline-none focus:border-green-400 focus:shadow-[0_0_10px_rgba(0,255,128,0.6)] resize-y transition duration-300"
                placeholder="Paste job description here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <div className="text-right text-xs text-green-500 mt-2">
                {text.length} characters
            </div>

        </div>
    );
}

export default TextAreaInput;