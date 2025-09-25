const express = require('express');
const {
  addSubject,
  getSubjects,
  updateSchedule,
  getSchedule,
} = require('../controllers/schedule');

const router = express.Router();

// Subject routes
router.post('/subjects', addSubject);
router.get('/subjects', getSubjects);

// Schedule routes
router.post('/', updateSchedule);
router.get('/', getSchedule);

module.exports = router;