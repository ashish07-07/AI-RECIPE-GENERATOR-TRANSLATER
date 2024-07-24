"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const languages = [
    { ln: "english", code: "kn" },
    { ln: "tamil", code: "tn" },
    { ln: "hindi", code: "hi" },
    { ln: "telugu", code: "te" },
    { ln: "malayalam", code: "ml" },
    { ln: "marathi", code: "mr" },
    { ln: "gujarati", code: "gu" },
    { ln: "bengali", code: "bn" },
    { ln: "tamil", code: "tn" },
    { ln: "punjabi", code: "pa" },
    { ln: "kannada", code: "kn" },
    { ln: "portuguese", code: "pt-BR" },
    { ln: "german", code: "de" },
    { ln: "japanese", code: "ja" },
    { ln: "korean", code: "ko" },
    { ln: "spanish", code: "es" },
  ];

  const [language, setLanguage] = useState("");

  return (
    <div>
      <h1>Search</h1>
      <input
        type="text"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      ></input>

      <button
        onClick={() => {
          if (language) {
            console.log(language);
          } else {
            alert("wtf");
          }
        }}
      >
        Search
      </button>

      <div>
        {languages
          .filter((val) => {
            const input = language.toLowerCase();
            const in2 = val.ln.toLowerCase();

            return input && in2.includes(input);
          })
          .map((inp) => {
            return <div key={inp.code}>{inp.ln}</div>;
          })}
      </div>
    </div>
  );
}
