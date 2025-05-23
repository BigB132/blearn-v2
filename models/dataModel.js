const mongoose = require('mongoose')

const data = new mongoose.Schema({
  owner: {
    required: true,
    type: String,
  },
  id: {
    required: true,
    type: String,
  },
  route: {
    required: true,
    type: String,
  },
  type: {
    required: true,
    type: Number
  },
  name: {
    required: true,
    type: String,
  },
  list: {
    type: [
      {
        deutsch: { type: String, required: true },
        english: { type: String, required: true }
      }
    ],
    default: [],
    required: false,
  }
});

const Data = mongoose.model("Data", data);

module.exports = Data