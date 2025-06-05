import React, { useState } from 'react';
import { hashPassword } from '../utils/auth';

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const admin = JSON.parse(localStorage.getItem('adminData'));
    if (admin) {
      const hash = await hashPassword(password);
      if (username === admin.username && hash === admin.passwordHash) {
        localStorage.setItem('isAdmin', 'true');
        setError('');
        onLogin();
        return;
      }
    }
    setError('Invalid credentials');
  };

  return (
    <div className="page">
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>
        <a href="/admin/reset">Forgot Password?</a>
      </p>
    </div>
  );
}
