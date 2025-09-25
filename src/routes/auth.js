const express = require('express');
const {
    checkData,
    signup,
    verify,
    resendcode,
    changePass,
    forgotPassword,
    resetPassword
} = require('../controllers/authController');

const router = express.Router();

// Existing routes
router.post('/checkData', checkData);
router.post('/register', signup);
router.post('/verify', verify);
router.post('/resend-code', resendcode);
router.post('/changePass', changePass);

// Secure password reset routes
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);


module.exports = router;