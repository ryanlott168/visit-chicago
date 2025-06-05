import React, { useState } from 'react';
import { resetAdminPassword } from '../utils/api';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPassword = await resetAdminPassword(email);
      setMessage(`New password: ${newPassword}`);
    } catch (err) {
      setMessage(err.message);
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
