import React, { useState } from 'react';
import './App.css';
import Login from './Login';
import MainContainer from './MainContainer';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

/**
 * App routes authentication and dashboard.
 * Now uses react-router-dom for navigation between login and dashboard (MainContainer) based on authentication state.
 */
function App() {
  const [user, setUser] = useState(null);

  // PUBLIC_INTERFACE
  function handleLogin(userObj) {
    setUser(userObj);
  }

  // Helper for logout in the future (not used here but helpful for extensibility)
  function handleLogout() {
    setUser(null);
  }

  // Simple route guard logic
  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            !user ? <Navigate to="/login" replace /> : <Navigate to="/dashboard" replace />
          }
        />
        <Route
          path="/login"
          element={
            user
              ? <Navigate to="/dashboard" replace />
              : <Login onLogin={handleLogin} />
          }
        />
        <Route
          path="/dashboard"
          element={
            user
              ? <MainContainer user={user} />
              : <Navigate to="/login" replace />
          }
        />
        {/* Fallback route */}
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </div>
  );
}

export default App;