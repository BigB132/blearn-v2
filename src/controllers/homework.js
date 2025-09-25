const Homework = require('../models/homework');
const UserData = require('../models/userData');

// Get user ID from username
async function getUserId(username) {
  const user = await UserData.findOne({ userName: username });
  return user ? user._id : null;
}

// Add a new homework assignment
const addHomework = async (req, res) => {
  try {
    const { username, subjectId, title, dueDate } = req.body;
    const userId = await getUserId(username);

    if (!userId) {
      return res.status(404).json({ message: 'User not found' });
    }

    const homework = new Homework({ userId, subjectId, title, dueDate });
    await homework.save();
    res.status(201).json(homework);
  } catch (error) {
    res.status(400).json({ message: 'Error adding homework', error });
  }
};

// Get all homework for a user
const getHomework = async (req, res) => {
  try {
    const { username } = req.query;
    const userId = await getUserId(username);

    if (!userId) {
      return res.status(404).json({ message: 'User not found' });
    }

    const homework = await Homework.find({ userId }).populate('subjectId');
    res.status(200).json(homework);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching homework', error });
  }
};

// Update a homework assignment
const updateHomework = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, dueDate, completed } = req.body;

    const homework = await Homework.findByIdAndUpdate(
      id,
      { title, dueDate, completed },
      { new: true }
    );

    if (!homework) {
      return res.status(404).json({ message: 'Homework not found' });
    }

    res.status(200).json(homework);
  } catch (error) {
    res.status(400).json({ message: 'Error updating homework', error });
  }
};

// Delete a homework assignment
const deleteHomework = async (req, res) => {
  try {
    const { id } = req.params;
    const homework = await Homework.findByIdAndDelete(id);

    if (!homework) {
      return res.status(404).json({ message: 'Homework not found' });
    }

    res.status(200).json({ message: 'Homework deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting homework', error });
  }
};

module.exports = {
  addHomework,
  getHomework,
  updateHomework,
  deleteHomework,
};