const splitChars = (text) =>
    text.split("").map((char, index) => (
        <span key={index} className="char" style={{ "--i": index }}>
            {char === " " ? " " : char}
        </span>
    ));

export default splitChars;
