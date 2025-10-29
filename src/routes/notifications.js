const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.post('/subscribe', notificationController.subscribe);
router.delete('/unsubscribe', notificationController.unsubscribe);
router.get('/vapid-public-key', notificationController.getVapidPublicKey);

module.exports = router;
