const mongoose = require("mongoose");

const participationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserData",
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  entries: [
    {
      subjectId: {
        type: String,
        required: true,
      },
      subjectName: {
        type: String,
        required: true,
      },
      handsRaised: {
        type: Number,
        required: true,
        default: 0,
      },
      timesSpoke: {
        type: Number,
        required: true,
        default: 0,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  totalParticipation: {
    type: Number,
    default: 0,
  },
});

// Index for efficient queries
participationSchema.index({ user: 1, date: 1 });
participationSchema.index({ user: 1, "entries.subjectId": 1 });

const Participation = mongoose.model("Participation", participationSchema);

module.exports = Participation;
