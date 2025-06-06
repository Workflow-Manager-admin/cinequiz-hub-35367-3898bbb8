import React, { useEffect, useState } from "react";
import { fetchKollywoodMovies } from "./tmdbApi";

/**
 * Generates a quiz question for Kollywood:
 * Shows the movie title in Tamil script (if available).
 * Question and all quiz text are presented in English.
 * The answer is the release year (in English numerals).
 */
function makeKollywoodQuestion(movie) {
  // Use TMDB's original_title if it's likely Tamil script, else use title.
  const tamilTitle = movie.original_title || movie.title || "";
  return {
    // Question in English, refer to "movie below": title is shown separately in Tamil.
    question: `What is the release year of this Kollywood movie?`,
    answer: movie.release_date ? movie.release_date.slice(0, 4) : "",
    tamilTitle,
    movie,
  };
}

const tamilFontStack = `'Noto Sans Tamil', 'Latha', 'Bamini', 'Arial Unicode MS', 'sans-serif'`;

// PUBLIC_INTERFACE
/**
 * KollywoodQuiz component - shows Tamil movie question in Tamil script font, wants release year in English.
 * Movie names must display in Tamil-supporting font for proper script rendering.
 */
function KollywoodQuiz() {
  const [quiz, setQuiz] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getQuiz() {
    setLoading(true);
    setFeedback(null);
    setUserAnswer("");
    try {
      // Pick a random page to get variety
      const randPage = Math.floor(Math.random() * 5) + 1;
      const results = await fetchKollywoodMovies({ page: randPage });
      // Only movies with valid title and release
      const movs = (results.results || []).filter(
        m => m.release_date && (m.original_title || m.title)
      );
      const movie = movs[Math.floor(Math.random() * movs.length)];
      if (!movie) throw new Error("No Kollywood movies found!");
      setQuiz(makeKollywoodQuestion(movie));
    } catch (e) {
      setQuiz(null);
      setFeedback("Failed to fetch Kollywood quiz question.");
    }
    setLoading(false);
  }

  useEffect(() => {
    getQuiz();
    // eslint-disable-next-line
  }, []);

  function submit(e) {
    e.preventDefault();
    if (!quiz) return;
    if (userAnswer.trim() === quiz.answer) {
      setFeedback("✅ Correct!");
    } else {
      setFeedback(`❌ Incorrect. The correct year is ${quiz.answer}.`);
    }
  }

  return (
    <div
      className="quiz-section"
      style={{
        // Use default sans-serif for English quiz text, override for Tamil title below
        fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
        background: "rgba(242,218,248,0.91)",
        borderRadius: 10,
        padding: 24,
        margin: "0 auto",
        boxShadow: "0 2px 12px #aaa2 0.1)",
        maxWidth: 400,
        color: "#222"
      }}
    >
      <h2 style={{
        fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
        color: "#9932cc",
        fontWeight: 600,
        fontSize: "1.6rem"
      }}>
        Kollywood Quiz
      </h2>
      {loading && <div>Loading...</div>}
      {quiz && !loading && (
        <>
          <div style={{ margin: "1rem 0 0.4rem 0", fontSize: "1.13rem", lineHeight: 1.55 }}>
            {quiz.question}
          </div>
          {/* Movie title in Tamil script, styled with Tamil-supporting font */}
          <div
            style={{
              fontFamily: tamilFontStack,
              fontSize: "1.25rem",
              color: "#ca007a",
              margin: "0.6rem 0 1.1rem 0",
              textAlign: "center",
              wordBreak: "break-word"
            }}
            aria-label="Kollywood Movie Title (Tamil)"
          >
            {quiz.tamilTitle}
          </div>
          <form onSubmit={submit} style={{ display: "flex", gap: 8 }}>
            <input
              type="text"
              placeholder="Enter year"
              value={userAnswer}
              onChange={e => { setUserAnswer(e.target.value); setFeedback(null); }}
              style={{
                fontFamily: "inherit",
                flex: 1,
                padding: "8px",
                border: "1px solid #eee",
                borderRadius: 4,
                fontSize: "1.1rem"
              }}
              aria-label="Your Answer"
              autoFocus
            />
            <button className="btn" style={{ padding: "8px 18px" }} type="submit">
              Check
            </button>
          </form>
          {feedback && (
            <div style={{ marginTop: 16, fontWeight: 500 }}>{feedback}</div>
          )}
          <button
            className="btn"
            style={{ marginTop: 18, background: "#9932cc", color: "#fff" }}
            type="button"
            onClick={getQuiz}
          >
            Next Question
          </button>
        </>
      )}
      {!quiz && !loading && (
        <button className="btn" onClick={getQuiz}>Try Again</button>
      )}
    </div>
  );
}

export default KollywoodQuiz;
