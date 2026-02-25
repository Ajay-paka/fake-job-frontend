function TextAreaInput({ text, setText }) {
    return (
        <div style={{ textAlign: "left", marginBottom: "20px" }}>
            <label style={{ fontWeight: "bold" }}>
                Paste Job Description
            </label>

            <textarea
                style={{
                    width: "100%",
                    height: "150px",
                    padding: "10px",
                    fontSize: "16px",
                    marginTop: "8px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    outline: "none",
                    resize: "vertical"
                }}
                placeholder="Paste job description here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <div style={{ textAlign: "right", fontSize: "12px", color: "#777" }}>
                {text.length} characters
            </div>
        </div>
    );
}

export default TextAreaInput;