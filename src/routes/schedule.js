const express = require('express');
const { getSchedule, editSchedule, deleteSchedule } = require('../controllers/scheduleController');

const router = express.Router();

router.post('/get', getSchedule);
router.post('/update', editSchedule);
router.post('/clear', deleteSchedule);

module.exports = router;