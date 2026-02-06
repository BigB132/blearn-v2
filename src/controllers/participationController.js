const Participation = require("../models/participation");
const UserData = require("../models/userData");

// Get today's subjects based on timetable
const getTodaySubjects = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      state: "error",
      message: "Missing username or password",
    });
  }

  try {
    const user = await UserData.findOne({ userName: username, password });
    if (!user) {
      return res.status(404).json({ state: "error", message: "User not found" });
    }

    // Get today's day (0 = Sunday, 1 = Monday, etc.)
    const today = new Date().getDay();
    
    // Monday-Friday (1-5), exclude weekends (0, 6)
    if (today === 0 || today === 6) {
      return res.status(200).json({
        state: "success",
        subjects: [],
        message: "No classes on weekends",
      });
    }

    // Get today's schedule
    const dayIndex = today - 1; // Monday = 0
    const todaySchedule = user.schedule[dayIndex];

    if (!todaySchedule) {
      return res.status(200).json({
        state: "success",
        subjects: [],
        message: "No schedule set",
      });
    }

    // Extract unique subject IDs from today
    const subjectIds = [...new Set(Object.values(todaySchedule).filter(id => id))];

    // Get subject details
    const subjects = subjectIds
      .map(subjectId => user.subjects.find(s => s.id === subjectId))
      .filter(s => s !== undefined);

    return res.status(200).json({
      state: "success",
      subjects,
    });
  } catch (err) {
    console.error("Error fetching today's subjects:", err);
    return res.status(500).json({
      state: "error",
      message: "Internal server error",
    });
  }
};

// Record participation for today
const recordParticipation = async (req, res) => {
  const { username, password, participationData } = req.body;

  if (!username || !password || !participationData) {
    return res.status(400).json({
      state: "error",
      message: "Missing required fields",
    });
  }

  try {
    const user = await UserData.findOne({ userName: username, password });
    if (!user) {
      return res.status(404).json({ state: "error", message: "User not found" });
    }

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    // Find or create today's participation record
    let participation = await Participation.findOne({
      user: user._id,
      date: today,
    });

    if (!participation) {
      participation = new Participation({
        user: user._id,
        date: today,
        entries: [],
      });
    }

    // Update or add entries
    for (const data of participationData) {
      const existingEntry = participation.entries.find(
        e => e.subjectId === data.subjectId
      );

      if (existingEntry) {
        existingEntry.handsRaised = data.handsRaised || existingEntry.handsRaised;
        existingEntry.timesSpoke = data.timesSpoke || existingEntry.timesSpoke;
        existingEntry.timestamp = new Date();
      } else {
        participation.entries.push({
          subjectId: data.subjectId,
          subjectName: data.subjectName,
          handsRaised: data.handsRaised || 0,
          timesSpoke: data.timesSpoke || 0,
        });
      }
    }

    // Calculate total participation score
    participation.totalParticipation = participation.entries.reduce(
      (sum, entry) => sum + entry.handsRaised + entry.timesSpoke,
      0
    );

    await participation.save();

    return res.status(200).json({
      state: "success",
      message: "Participation recorded successfully",
    });
  } catch (err) {
    console.error("Error recording participation:", err);
    return res.status(500).json({
      state: "error",
      message: "Internal server error",
    });
  }
};

// Get statistics for a specific subject
const getSubjectStats = async (req, res) => {
  const { username, password, subjectId } = req.body;

  if (!username || !password || !subjectId) {
    return res.status(400).json({
      state: "error",
      message: "Missing required fields",
    });
  }

  try {
    const user = await UserData.findOne({ userName: username, password });
    if (!user) {
      return res.status(404).json({ state: "error", message: "User not found" });
    }

    // Get all participation records for this subject
    const participationRecords = await Participation.find({
      user: user._id,
      "entries.subjectId": subjectId,
    }).sort({ date: 1 });

    // Aggregate data
    const chartData = [];
    let totalHandsRaised = 0;
    let totalTimesSpoke = 0;
    let recordCount = 0;

    participationRecords.forEach(record => {
      const entry = record.entries.find(e => e.subjectId === subjectId);
      if (entry) {
        chartData.push({
          date: record.date,
          handsRaised: entry.handsRaised,
          timesSpoke: entry.timesSpoke,
          total: entry.handsRaised + entry.timesSpoke,
        });
        totalHandsRaised += entry.handsRaised;
        totalTimesSpoke += entry.timesSpoke;
        recordCount++;
      }
    });

    const avgHandsRaised = recordCount > 0 ? (totalHandsRaised / recordCount).toFixed(2) : 0;
    const avgTimesSpoke = recordCount > 0 ? (totalTimesSpoke / recordCount).toFixed(2) : 0;

    const subject = user.subjects.find(s => s.id === subjectId);
    const subjectName = subject ? subject.name : "Unknown Subject";

    return res.status(200).json({
      state: "success",
      subjectName,
      chartData,
      statistics: {
        totalHandsRaised,
        totalTimesSpoke,
        totalParticipation: totalHandsRaised + totalTimesSpoke,
        averageHandsRaised: avgHandsRaised,
        averageTimesSpoke: avgTimesSpoke,
        averageParticipation: (
          (totalHandsRaised) / recordCount
        ).toFixed(2),
        recordCount,
      },
    });
  } catch (err) {
    console.error("Error fetching subject stats:", err);
    return res.status(500).json({
      state: "error",
      message: "Internal server error",
    });
  }
};

// Get all subjects with participation stats
const getAllStats = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      state: "error",
      message: "Missing username or password",
    });
  }

  try {
    const user = await UserData.findOne({ userName: username, password });
    if (!user) {
      return res.status(404).json({ state: "error", message: "User not found" });
    }

    // Get all participation records for this user
    const participationRecords = await Participation.find({
      user: user._id,
    });

    // Group by subject
    const subjectStats = {};

    participationRecords.forEach(record => {
      record.entries.forEach(entry => {
        if (!subjectStats[entry.subjectId]) {
          subjectStats[entry.subjectId] = {
            subjectId: entry.subjectId,
            subjectName: entry.subjectName,
            totalHandsRaised: 0,
            totalTimesSpoke: 0,
            recordCount: 0,
            latestDate: null,
          };
        }

        subjectStats[entry.subjectId].totalHandsRaised += entry.handsRaised;
        subjectStats[entry.subjectId].totalTimesSpoke += entry.timesSpoke;
        subjectStats[entry.subjectId].recordCount++;
        subjectStats[entry.subjectId].latestDate = record.date;
      });
    });

    // Calculate averages
    const stats = Object.values(subjectStats).map(stat => ({
      ...stat,
      averageHandsRaised: (
        stat.totalHandsRaised / stat.recordCount
      ).toFixed(2),
      averageTimesSpoke: (
        stat.totalTimesSpoke / stat.recordCount
      ).toFixed(2),
      averageParticipation: (
        (stat.totalHandsRaised) / stat.recordCount
      ).toFixed(2),
      totalParticipation: stat.totalHandsRaised + stat.totalTimesSpoke,
    }));

    return res.status(200).json({
      state: "success",
      stats: stats.sort((a, b) => b.totalParticipation - a.totalParticipation),
    });
  } catch (err) {
    console.error("Error fetching all stats:", err);
    return res.status(500).json({
      state: "error",
      message: "Internal server error",
    });
  }
};

// Get today's participation record
const getTodayParticipation = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      state: "error",
      message: "Missing username or password",
    });
  }

  try {
    const user = await UserData.findOne({ userName: username, password });
    if (!user) {
      return res.status(404).json({ state: "error", message: "User not found" });
    }

    const today = new Date().toISOString().split("T")[0];

    const participation = await Participation.findOne({
      user: user._id,
      date: today,
    });

    return res.status(200).json({
      state: "success",
      participation: participation || { entries: [] },
    });
  } catch (err) {
    console.error("Error fetching today's participation:", err);
    return res.status(500).json({
      state: "error",
      message: "Internal server error",
    });
  }
};

module.exports = {
  getTodaySubjects,
  recordParticipation,
  getSubjectStats,
  getAllStats,
  getTodayParticipation,
};
