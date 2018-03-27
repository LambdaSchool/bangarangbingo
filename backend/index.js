const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const User = require('./models/user');

const server = express();
server.use(bodyParser.json());
const DB_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/bingo';
mongoose.connect(DB_URL);
mongoose.set('debug', true);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

server.use(express.static(path.join(__dirname, '../bingo/build')));

server.post('/auth/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.json({
        isValid: false,
        errors: [
          { message: 'Both username and password required' },
        ],
      });
      return;
    }
    //check if user exists
    
    //create user
    const user = await User.create({ username, password });
    console.log(user);
    res.json({});
  } catch (e) {
    console.log('something happened', e.name);
  }
});

server.post('/auth/login', async (req, res) => {
  res.json({});
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
