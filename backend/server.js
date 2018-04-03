const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/user');

const SECRET = 'thisNeedsToChange';
const DB_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/bingo';

const server = express();

server.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

server.use(bodyParser.json());

mongoose.connect(DB_URL);
mongoose.set('debug', true);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

server.use(express.static(path.join(__dirname, '../client/build')));
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
  if (!username || !password) return res.status(422).json({ error: 'Request must have both username and password.' });
  const user = await User.authenticate(username, password);
  const payload = { id: user._id, username: user.username };
  const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });
  return user ? res.json({ user, token }) : res.status(403).json({ error: 'failed to authenticate' });
});

server.post('/auth/reset', async (req, res) => {
  const {
    username,
    password,
    confirmPassword,
    confirmNewPassword,
  } = req.body;

  let { newPassword } = req.body;

  if (password !== confirmPassword) {
    res.status(422).send({ error: 'Current Passwords do not match.' });
    return;
  }
  if (newPassword !== confirmNewPassword) {
    res.status(422).send({ error: 'New Passwords do not match.' });
    return;
  }
  const user = await User.authenticate(username, password);
  if (!user) {
    res.status(403).send({ error: 'Could not authenticate' });
    return;
  }
  newPassword = await bcrypt.hash(newPassword, 12);
  user.set({ password: newPassword });
  const updatedUser = await user.save();
  res.send({ user: updatedUser });
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

module.exports = server;
