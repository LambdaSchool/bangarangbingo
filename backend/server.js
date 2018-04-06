const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const PDFDocument = require('pdfkit');
const SVGtoPDF = require('svg-to-pdfkit');
const User = require('./models/user');

PDFDocument.prototype.addSVG = function addSVG(svg, x, y, options) {
  return SVGtoPDF(this, svg, x, y, options);
};

function generateCell(x, y, content) {
  return `
    <g>
      <rect
        x="${x}"
        y="${y}"
        width="200"
        height="200"
        fill="#fff"
        stroke="#000"
        strokeWidth="3"
      />
      <text
        x="${x + 100}"
        y="${y + 100}"
        font-size="32"
        text-anchor="middle"
        alignment-baseline="central"
      >
        ${content}
      </text>
    </g>`;
}

function generateCard(w, h) {
  const cells = [];
  const totalCells = w * h;
  const freeSpace = Math.round(totalCells / 2);

  let cell = 0;
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      cell++;
      const x = ((j + 1) * 200);
      const y = 200 * (i + 1);
      const content = cell === freeSpace ? 'free' : Math.floor(Math.random() * 100);
      cells.push(generateCell(x, y, content));
    }
  }
  return `<svg id="preview" viewBox="0 0 1400 1400">${cells.join('')}</svg>`;
}

const SECRET = 'thisNeedsToChange';
const DB_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/bingo';

const server = express();

server.use(cors({
  origin: process.env.MONGODB_URI ? 'https://bangarangbingo.herokuapp.com' : 'http://localhost:3000',
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
      res.status(422).json({
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

server.get('/cards/download', (req, res) => {
  const doc = new PDFDocument();
  doc.pipe(res);
  for(let i = 0; i < Math.floor(Math.random() * 20); i++) {
    SVGtoPDF(doc, generateCard(5, 5), 0, 0);
    doc.addPage();
  }
  doc.end();
});

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = server;
