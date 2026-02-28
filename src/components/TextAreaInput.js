import { useRef } from "react";

function TextAreaInput({ text, setText }) {
    const textareaRef = useRef(null);

    const handleChange = (e) => {
        setText(e.target.value);

        const textarea = textareaRef.current;
        textarea.style.height = "auto";

        const newHeight = textarea.scrollHeight;
        const maxHeight = window.innerHeight * 0.7;

        textarea.style.height =
            newHeight > maxHeight ? maxHeight + "px" : newHeight + "px";
    };

    return (
        <div className="text-left mb-6">
            <label className="block text-red-400 font-semibold tracking-wide mb-3">
                Paste Job Description
            </label>

            <textarea
                ref={textareaRef}
                value={text}
                onChange={handleChange}
                placeholder="Paste job description here..."
                className="w-full min-h-[250px] max-h-[70vh] overflow-y-auto resize-none p-5 text-lg rounded-xl bg-black/60 text-red-300 border border-red-500/30 focus:outline-none focus:border-red-400 focus:shadow-[0_0_15px_rgba(255,0,0,0.6)] transition-all duration-200" />

            <div className="text-right text-xs text-red-400 mt-2">
                {text.length} characters
            </div>
        </div>
    );
}

export default TextAreaInput;