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
  email: {
    required: true,
    type: String,
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
  subjects: {
    type: Array,
    required: false,
    default: [],
  },
  schedule: {
    type: Array,
    required: false,
    default: [],
  },
  homeworks: {
    type: Array,
    required: false,
    default: [],
  }
});

const UserData = mongoose.model("UserData", userData);

module.exports = UserData