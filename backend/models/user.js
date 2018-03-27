const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.static('exists', async function exists(username) {
  const user = await this.findOne({ username }).exec();
  return !!user;
});

module.exports = mongoose.model('User', UserSchema);
