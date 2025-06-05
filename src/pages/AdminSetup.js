import React, { useState } from 'react';
import { hashPassword } from '../utils/auth';

export default function AdminSetup({ onSetup }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError('All fields are required');
      return;
    }
    const passwordHash = await hashPassword(password);
    localStorage.setItem(
      'adminData',
      JSON.stringify({ username, email, passwordHash })
    );
    localStorage.setItem('isAdmin', 'true');
    onSetup();
  };

  return (
    <div className="page">
      <h1>Admin Setup</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Create Admin</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
