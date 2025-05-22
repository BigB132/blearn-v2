const mongoose = require('mongoose')

const userData = new mongoose.Schema({
  userName: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  }
});

const UserData = mongoose.model("UserData", userData);

module.exports = UserData