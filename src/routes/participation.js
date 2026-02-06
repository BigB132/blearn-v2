const express = require('express');
const {
  getTodaySubjects,
  recordParticipation,
  getSubjectStats,
  getAllStats,
  getTodayParticipation,
} = require('../controllers/participationController');

const router = express.Router();

router.post('/today-subjects', getTodaySubjects);
router.post('/record', recordParticipation);
router.post('/subject-stats', getSubjectStats);
router.post('/all-stats', getAllStats);
router.post('/today', getTodayParticipation);

module.exports = router;
