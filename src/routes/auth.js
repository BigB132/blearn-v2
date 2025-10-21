const express = require('express');
const { checkData, signup, verify, resendcode, changePass, resetPass } = require('../controllers/authController');

const router = express.Router();

router.post('/checkData', checkData);
router.post('/register', signup);
router.post('/verify', verify)
router.post('/resend-code', resendcode)
router.post('/changePass', changePass)
router.post('/resetpassword', resetPass)

// Temporary route for testing to bypass email verification
router.post('/verify-test-user', async (req, res) => {
    const { userName } = req.body;
    console.log(`[TEST] Verifying user: ${userName}`);
    try {
        const user = await require('../models/userData').findOne({ userName });
        if (user) {
            user.mailtoken = 0;
            await user.save();
            console.log(`[TEST] User ${userName} verified successfully.`);
            res.json({ state: 'success' });
        } else {
            console.log(`[TEST] User ${userName} not found for verification.`);
            res.json({ state: 'error', message: 'User not found' });
        }
    } catch (error) {
        console.error(`[TEST] Error verifying user ${userName}:`, error);
        res.json({ state: 'error', message: 'Server error' });
    }
});

module.exports = router;