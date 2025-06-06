import React, { useEffect, useState } from "react";
import { fetchHollywoodMovies } from "./tmdbApi";

/**
 * Generates a simple quiz question from a movie object.
 * For Hollywood: asks for the release year of a movie.
 */
function makeQuestion(movie) {
  return {
    question: `What is the release year of "${movie.title}"?`,
    answer: movie.release_date ? movie.release_date.slice(0, 4) : "",
    movie,
  };
}

// PUBLIC_INTERFACE
/**
 * HollywoodQuiz component - shows a movie question in English, answer is release year.
 * Uses modern sans-serif font.
 */
function HollywoodQuiz() {
  const [quiz, setQuiz] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch quiz data
  async function getQuiz() {
    setLoading(true);
    setFeedback(null);
    setUserAnswer("");
    try {
      // Pick a random page (to avoid repetition)
      const randPage = Math.floor(Math.random() * 5) + 1;
      const results = await fetchHollywoodMovies({ page: randPage });
      const movs = (results.results || []).filter(m => m.release_date && m.title);
      const movie = movs[Math.floor(Math.random() * movs.length)];
      if (!movie) throw new Error("No Hollywood movies found.");
      setQuiz(makeQuestion(movie));
    } catch (e) {
      setQuiz(null);
      setFeedback("Failed to fetch quiz question.");
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
      setFeedback(`❌ Incorrect. The correct answer is ${quiz.answer}.`);
    }
  }

  return (
    <div
      className="quiz-section"
      style={{
        fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
        background: "rgba(20,30,60,0.67)",
        borderRadius: 10,
        padding: 24,
        margin: "0 auto",
        boxShadow: "0 2px 12px #2223 0.1)",
        maxWidth: 400,
      }}
    >
      <h2 style={{
        fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
        fontWeight: 600,
        color: "#e87a41",
        fontSize: "1.6rem"
      }}>Hollywood Quiz</h2>
      {loading && <div>Loading...</div>}
      {quiz && !loading && (
        <>
          <div style={{ margin: "1rem 0", fontSize: "1.1rem", lineHeight: 1.5 }}>
            {quiz.question}
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
            style={{ marginTop: 18, background: "#222", color: "#fff" }}
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

export default HollywoodQuiz;
