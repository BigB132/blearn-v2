const mongoose = require("mongoose");

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
    required: true,
    default: [],
  },
  schedule: {
    type: Array,
    required: true,
  },
  homeworks: [
    {
      id: String,
      subjectId: String,
      dueDate: String,
      description: String,
      completed: Boolean,
      notified: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const UserData = mongoose.model("UserData", userData);

module.exports = UserData;
