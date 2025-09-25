const Subject = require('../models/subject');
const Schedule = require('../models/schedule');
const UserData = require('../models/userData');

// Get user ID from username
async function getUserId(username) {
  const user = await UserData.findOne({ userName: username });
  return user ? user._id : null;
}

// Add a new subject
const addSubject = async (req, res) => {
  try {
    const { name, username } = req.body;
    const userId = await getUserId(username);

    if (!userId) {
      return res.status(404).json({ message: 'User not found' });
    }

    const subject = new Subject({ name, userId });
    await subject.save();
    res.status(201).json(subject);
  } catch (error) {
    res.status(400).json({ message: 'Error adding subject', error });
  }
};

// Get all subjects for a user
const getSubjects = async (req, res) => {
  try {
    const { username } = req.query;
    const userId = await getUserId(username);

    if (!userId) {
      return res.status(404).json({ message: 'User not found' });
    }

    const subjects = await Subject.find({ userId });
    res.status(200).json(subjects);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching subjects', error });
  }
};

// Update a day's schedule
const updateSchedule = async (req, res) => {
  try {
    const { username, day, lessons } = req.body;
    const userId = await getUserId(username);

    if (!userId) {
      return res.status(404).json({ message: 'User not found' });
    }

    const schedule = await Schedule.findOneAndUpdate(
      { userId, day },
      { lessons },
      { new: true, upsert: true }
    );
    res.status(200).json(schedule);
  } catch (error) {
    res.status(400).json({ message: 'Error updating schedule', error });
  }
};

// Get the schedule for a user
const getSchedule = async (req, res) => {
  try {
    const { username } = req.query;
    const userId = await getUserId(username);

    if (!userId) {
      return res.status(404).json({ message: 'User not found' });
    }

    const schedule = await Schedule.find({ userId }).populate('lessons.subjectId');
    res.status(200).json(schedule);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching schedule', error });
  }
};

module.exports = {
  addSubject,
  getSubjects,
  updateSchedule,
  getSchedule,
};