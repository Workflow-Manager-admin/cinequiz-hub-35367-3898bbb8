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
    <div
      style={{
        minHeight: "100vh",
        padding: "96px 0 32px 0",
        background: "var(--base-dark)",
        color: "var(--text-color)",
      }}
    >
      <nav className="navbar" style={{ position: "fixed", width: "100%", top: 0, zIndex: 100 }}>
        <div className="container" style={{ width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <div className="logo">
              <span className="logo-symbol">*</span> CineQuiz Hub
            </div>
            <span style={{
              fontWeight: 500,
              color: "var(--base-light)",
              marginRight: 8,
            }}>
              {user ? <>Welcome, {user.username}</> : ""}
            </span>
          </div>
        </div>
      </nav>
      <div
        className="container"
        style={{
          marginTop: 32,
          marginBottom: 32,
        }}
      >
        <div
          className="quiz-dashboard"
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 36,
            justifyContent: "center",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          {/* Hollywood Quiz - Left Column */}
          <div style={{ flex: 1, minWidth: 320, maxWidth: 410 }}>
            <HollywoodQuiz />
          </div>
          {/* Kollywood Quiz - Right Column */}
          <div style={{ flex: 1, minWidth: 320, maxWidth: 410 }}>
            <KollywoodQuiz />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
