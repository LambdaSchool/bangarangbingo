const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const server = express();
const DB_URL = process.env.MONGODB_URI || 'mongodb://localhost/test';
mongoose.connect(DB_URL);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

server.use(express.static(path.join(__dirname, '../bingo/build')));

server.post('/auth/register', async (req, res) => {
  res.json({});
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
