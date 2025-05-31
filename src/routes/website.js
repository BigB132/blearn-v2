const express = require('express');
const { dashboard, register, verify, login, landing, logout, settings, forgotpassword, learn } = require('../controllers/website');

const router = express.Router();

router.get('/', landing);
router.get('/register', register)
router.get('/verify', verify)
router.get('/login', login)
router.get('/dashboard', dashboard)
router.get('/logout', logout)
router.get('/settings', settings)
router.get('/forgotpassword', forgotpassword)
router.get('/learn', learn)

module.exports = router;