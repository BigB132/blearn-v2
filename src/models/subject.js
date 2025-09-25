const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserData',
    required: true,
  },
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;