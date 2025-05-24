const mongoose = require('mongoose')

const userData = new mongoose.Schema({
  userName: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  earnToken: {
    type: String,
  },
  unlockedTime: {
    type: Number,
  }
});

const UserData = mongoose.model("UserData", userData);

module.exports = UserData