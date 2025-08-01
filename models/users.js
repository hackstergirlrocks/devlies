const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  token: String,
  username: String,
  email: String,
  password: String,
  skin_use: String,
  level: Number,
  experience: Number,
  group: Number,
  vip: Number,
  banned: Number,
  created: { type: Date, default: Date.now },
  stats: {
    win: Number,
    lose: Number,
    game: Number
  },
  skins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skin' }],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  settings: {
    sound_music: Number,
    sound_effect: Number
  }
});


const User = mongoose.model('users', userSchema);

module.exports = User;
