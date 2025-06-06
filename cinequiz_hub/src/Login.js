import React, { useState } from "react";

/**
 * Login component for CineQuiz Hub.
 * Renders a login form, manages demo authentication, and calls onLogin on success.
 * No backend; stateful authentication demo only.
 * 
 * @param {function} onLogin - Callback called on successful login.
 */
// PUBLIC_INTERFACE
function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Demo login validation: just checks fields are filled
  function handleSubmit(e) {
    e.preventDefault();
    if (username.trim() === "" || password.trim() === "") {
      setError("Please enter both username and password.");
      return;
    }
    // Simulate authentication and call parent callback
    setError(null);
    onLogin({ username });
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--base-dark)"
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#12152b",
          color: "var(--text-color)",
          borderRadius: 12,
          boxShadow: "0 6px 32px #0004",
          padding: "42px 32px 30px 32px",
          minWidth: 320,
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
        aria-label="Login Form"
      >
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <span style={{
            fontSize: "2rem",
            fontWeight: 700,
            color: "#ed06fe",
            letterSpacing: 1
          }}>CineQuiz Hub</span>
          <div style={{
            fontSize: "1.15rem",
            color: "var(--base-light)",
            marginTop: 4
          }}>
            Sign in to continue
          </div>
        </div>
        <label style={{ fontWeight: 500 }}>
          Username
          <input
            type="text"
            value={username}
            autoFocus
            onChange={e => setUsername(e.target.value)}
            style={{
              width: "100%",
              marginTop: 4,
              padding: "10px 8px",
              border: "1px solid #ddd",
              borderRadius: 4,
              fontSize: "1.05rem"
            }}
            placeholder="Enter username"
            autoComplete="username"
          />
        </label>
        <label style={{ fontWeight: 500 }}>
          Password
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{
              width: "100%",
              marginTop: 4,
              padding: "10px 8px",
              border: "1px solid #ddd",
              borderRadius: 4,
              fontSize: "1.05rem"
            }}
            placeholder="Enter password"
            autoComplete="current-password"
          />
        </label>
        <button
          type="submit"
          className="btn btn-large"
          style={{
            marginTop: 10,
            backgroundColor: "#ed06fe",
            color: "#fff",
            fontWeight: 600,
            fontSize: "1.12rem"
          }}
        >
          Log in
        </button>
        {error && (
          <div style={{ color: "#fe4066", marginTop: -6, fontWeight: 500 }}>
            {error}
          </div>
        )}
        <div style={{
          fontSize: "0.87rem",
          color: "var(--text-secondary)",
          textAlign: "right",
          marginTop: 10
        }}>
          <span>Demo login: enter any username/password</span>
        </div>
      </form>
    </div>
  );
}

export default Login;
