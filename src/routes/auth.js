const express = require('express');
const { checkData, signup, verify, resendcode, changePass, resetPass, subscribe } = require('../controllers/authController');

const router = express.Router();

router.post('/subscribe', subscribe);
router.post('/checkData', checkData);
router.post('/register', signup);
router.post('/verify', verify)
router.post('/resend-code', resendcode)
router.post('/changePass', changePass)
router.post('/resetpassword', resetPass)

module.exports = router;