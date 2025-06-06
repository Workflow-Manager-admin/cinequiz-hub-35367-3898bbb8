import React from "react";
import HollywoodQuiz from "./HollywoodQuiz";
import KollywoodQuiz from "./KollywoodQuiz";

/**
 * MainContainer (Dashboard) for CineQuiz Hub.
 * Renders Hollywood and Kollywood Quiz components side-by-side.
 * - HollywoodQuiz is on the left (modern sans-serif font).
 * - KollywoodQuiz is on the right (Tamil-supporting font for movie names).
 * - Responsive for smaller screens.
 */
// PUBLIC_INTERFACE
function MainContainer({ user }) {
  return (
    <div style={{ minHeight: "100vh", width: "100%", background: "var(--base-dark)", color: "var(--text-color)" }}>
      {/* Simple top nav with plain branding and username */}
      <nav
        style={{
          width: "100%",
          background: "var(--base-dark)",
          color: "var(--text-color)",
          borderBottom: "1px solid var(--border-color)",
          padding: "18px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "fixed",
          top: 0,
          zIndex: 100,
        }}
      >
        <span style={{ fontWeight: 700, fontSize: "1.23rem" }}>CineQuiz Hub</span>
        <span style={{ fontSize: "1rem", color: "var(--base-light)", fontWeight: 500 }}>
          {user ? `Welcome, ${user.username}` : ""}
        </span>
      </nav>
      {/* Spacer for navbar height */}
      <div style={{ height: 62 }} />
      {/* Minimal two-column layout for quizzes */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "stretch",
          gap: 0,
          width: "100%",
          maxWidth: 1000,
          margin: "0 auto",
        }}
      >
        {/* Left: Hollywood */}
        <div style={{ flex: 1, minWidth: 0, padding: "0 0.5vw" }}>
          <HollywoodQuiz />
        </div>
        {/* Right: Kollywood */}
        <div style={{ flex: 1, minWidth: 0, padding: "0 0.5vw" }}>
          <KollywoodQuiz />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
