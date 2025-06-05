const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const allowedOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:3000';
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);
app.use(express.json());

const DB_FILE = path.join(__dirname, 'db.json');

function readDB() {
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } catch (err) {
    return { admin: null };
  }
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

app.get('/api/admin', (req, res) => {
  const data = readDB();
  res.json({ exists: !!data.admin });
});

app.post('/api/admin', (req, res) => {
  const data = readDB();
  if (data.admin) {
    return res.status(400).json({ error: 'Admin already exists' });
  }
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  data.admin = { username, email, passwordHash: hashPassword(password) };
  writeDB(data);
  res.json({ success: true });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const data = readDB();
  const admin = data.admin;
  if (admin && admin.username === username && admin.passwordHash === hashPassword(password)) {
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.post('/api/reset', (req, res) => {
  const { email } = req.body;
  const data = readDB();
  const admin = data.admin;
  if (admin && admin.email === email) {
    const newPassword = crypto.randomBytes(9).toString('base64').replace(/[^a-zA-Z0-9]/g, '').slice(0, 12);
    admin.passwordHash = hashPassword(newPassword);
    writeDB(data);
    res.json({ success: true, newPassword });
  } else {
    res.status(404).json({ error: 'Email not found' });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
