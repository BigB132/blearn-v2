const express = require('express');
const { dashboard, register, verify, login, landing, logout, settings, forgotpassword, learn, createlist, list, editlist, createTable, table, editTable, importlist, test, ad } = require('../controllers/website');

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
router.get('/createlist', createlist)
router.get('/list', list)
router.get('/editlist', editlist)
router.get('/createTable', createTable)
router.get('/table', table)
router.get('/editTable', editTable)
router.get('/importlist', importlist)
router.get('/ad', ad)

module.exports = router;