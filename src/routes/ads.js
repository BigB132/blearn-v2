const express = require('express');
const { ad, earn } = require('../controllers/adController');

const router = express.Router();

router.get('/ad/:userName', ad);
router.post('/earn/:username/:token', earn)

module.exports = router;