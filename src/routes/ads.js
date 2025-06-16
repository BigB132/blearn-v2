const express = require('express');
const { ad, earn, claim } = require('../controllers/adController');

const router = express.Router();

router.get('/ad/:userName', ad);
router.get('/earn/:username/:token', earn)
router.get('/claim/:userName/:token', claim)

module.exports = router;