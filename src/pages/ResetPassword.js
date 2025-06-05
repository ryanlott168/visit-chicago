import React, { useState } from 'react';
import { hashPassword, generateRandomPassword } from '../utils/auth';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const admin = JSON.parse(localStorage.getItem('adminData'));
    if (admin && admin.email === email) {
      const newPassword = generateRandomPassword();
      const passwordHash = await hashPassword(newPassword);
      localStorage.setItem(
        'adminData',
        JSON.stringify({ ...admin, passwordHash })
      );
      setMessage(`New password: ${newPassword}`);
    } else {
      setMessage('Email not found');
    }
  };

  return (
    <div className="page">
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Enter your admin email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p className="error">{message}</p>}
    </div>
  );
}
