const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

// Route: GET login page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
});

// Route: POST login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Autentikasi sederhana
  if (username === 'admin' && password === 'admin123') {
    res.send(`<h2>Login berhasil! Selamat datang, ${username}.</h2>`);
  } else {
    res.send('<h2>Login gagal! Username atau password salah.</h2><a href="/">Kembali</a>');
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));