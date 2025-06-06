import React, { useState } from 'react';
import './App.css';
import Login from './Login';
import MainContainer from './MainContainer';

/**
 * App routes authentication and dashboard.
 * - Shows Login if not authenticated.
 * - Shows MainContainer (dashboard) if authenticated.
 */
function App() {
  const [user, setUser] = useState(null);

  // Handle post-login state
  function handleLogin(userObj) {
    setUser(userObj);
  }

  return (
    <div className="app">
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <MainContainer user={user} />
      )}
    </div>
  );
}

export default App;