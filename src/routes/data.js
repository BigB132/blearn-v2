const express = require('express');
const { getlist, createFolder, rename, del, savelist, savetable, getvoclist, gettable, editlist, fetchid, importlist, edittable } = require('../controllers/dataController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/getlist', protect, getlist);
router.post('/createFolder', protect, createFolder);
router.post('/rename', protect, rename);
router.post('/delete', protect, del);
router.post('/savelist', protect, savelist);
router.post('/savetable', protect, savetable);
router.post('/getvoclist', protect, getvoclist);
router.post('/gettable', protect, gettable);
router.post('/editlist', protect, editlist);
router.post('/edittable', protect, edittable);
router.post('/fetchid', protect, fetchid);
router.post('/importlist', protect, importlist);

module.exports = router;