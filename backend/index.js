const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/user');

const SECRET = 'thisNeedsToChange';
const DB_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/bingo';

const server = express();
server.use(bodyParser.json());

mongoose.connect(DB_URL);
mongoose.set('debug', true);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

server.use(express.static(path.join(__dirname, '../bingo/build')));
server.post('/auth/register', async (req, res) => {
  try {
    const { username } = req.body;
    let { password } = req.body;

    if (!username || !password) {
      res.json({
        isValid: false,
        errors: [
          { message: 'Both username and password required' },
        ],
      });
      return;
    }

    if (await User.exists(username)) {
      res.json({
        isValid: false,
        error: {
          message: 'Username already exists.',
        },
      });
      return;
    }
    password = await bcrypt.hash(password, 12);
    const user = await User.create({ username, password });
    const payload = { id: user._id, username: user.username };
    const token = jwt.sign(payload, SECRET, { expiresInMinutes: '1h' });
    res.json({ user, token });
  } catch (e) {
    res.json({ error: 'Failed to register' });
  }
});

server.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.authenticate(username, password);
  const payload = { id: user._id, username: user.username };
  const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });
  return user ? res.json({ user, token }) : res.json({ error: 'failed to authenticate' });
});

server.get('/cards', (req, res) => {
  res.json([]);
});

server.get('/card/:id', (req, res) => {
  res.json({});
});

server.post('/card/create', (req, res) => {
  res.json({});
});

server.post('/card/edit', (req, res) => {
  res.json({});
});

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../bingo/build/index.html'));
});

server.listen(process.env.PORT || 8080);
