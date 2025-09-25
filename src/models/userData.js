const mongoose = require('mongoose')

const userData = new mongoose.Schema({
  userName: {
    required: true,
    type: String,
    unique: true,
    lowercase: true,
  },
  password: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
    lowercase: true,
  },
  mailtoken: {
    required: true,
    type: Number,
  },
  earnToken: {
    type: String,
  },
  unlockedTime: {
    type: Number,
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetExpires: {
    type: Date,
  }
});

const UserData = mongoose.model("UserData", userData);

module.exports = UserData