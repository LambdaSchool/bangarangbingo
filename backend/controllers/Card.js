const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Card = require('../models/card');
const PDFDocument = require('pdfkit');
const SVGtoPDF = require('svg-to-pdfkit');
const SECRET = process.env.APP_SECRET;

PDFDocument.prototype.addSVG = function addSVG(svg, x, y, options) {
  return SVGtoPDF(this, svg, x, y, options);
};

function generateCell(x, y, content, cell) {
  return `
    <g key="${cell}">
      <rect
        x="${x}"
        y="${y}"
        width="194"
        height="194"
        fill="#fff"
        stroke="#000"
        strokeWidth="3"
      />
      <text
        x="${x + 96}"
        y="${y + 124}"
        font-size="64"
        text-anchor="middle"
        alignment-baseline="central"
      >
        ${content}
      </text>
    </g>`;
}
function generateCard(w, h) {
  const freeSpace = Math.round((w * h) / 2 + h - 1);
  h += h;
  const cells = [];
  const totalCells = w * h;
  let data;
  let x = 0;
  let y = 0;
  let bingoStr = 'BINGO';
  let cell = 0;
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (cell < 5) {
        data = bingoStr[cell];
      } else {
        data = cell === freeSpace ? 'FREE' : Math.floor(Math.random() * 100);
      }
      if (data < 10) {
        data = '0' + data;
      }
      x = ((j + 1) * 200);
      y = 200 * (i + 1);
      cells.push(generateCell(x, y, data, cell));
      cell++;
    }
  }
  return `<svg id="preview" viewBox="0 0 1400 1400">${cells.join('')}</svg>`;
}

const CardController = {
  get(req, res) {
    res.json({});
  },
  getAll(req, res) {
    res.json([]);
  },
  async create(req, res) {
    try {
      const authToken = req.headers.authorization.replace('Bearer ', '');
      const decodedToken = await jwt.verify(authToken, SECRET);
      const { username } = decodedToken;
      const user = await User.findOne({ username }).exec();
      const id = user._id;

      const { card } = req.body;

      const newCard = await Card.create({
        author: id,
        title: 'Bingo Card',
        content: JSON.stringify(card),
      });

      user.cards.push(newCard._id);
      const updateUser = await user.save();
      res.json({
        id: newCard._id,
        card: newCard,
      });
    } catch (e) {
      console.log('/card/create', e);
      res.status(422).json({ error: 'Failed to create card' });
    }
  },
  edit(req, res) {
    res.json({});
  },
  download(req, res) {
    const doc = new PDFDocument();
    doc.pipe(res);
    for(let i = 0; i < Math.floor(Math.random() * 20); i++) {
      SVGtoPDF(doc, generateCard(5, 5), 0, 0);
      doc.addPage();
    }
    doc.end();
  },
};

module.exports = CardController;
