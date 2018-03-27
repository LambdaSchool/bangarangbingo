const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model('Card', CardSchema);
