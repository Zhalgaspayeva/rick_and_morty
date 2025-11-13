import React, { useState } from 'react';
import '../styles/Login.css';

export default function Login() {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Welcome, ${username || 'guest'}!`);
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Enter your name..." 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
