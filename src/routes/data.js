const express = require('express');
const { getlist, createFolder, rename, del, savelist, savetable, getvoclist, gettable, editlist, fetchid, importlist, edittable } = require('../controllers/dataController');

const router = express.Router();

router.post('/getlist', getlist);
router.post('/createFolder', createFolder);
router.post('/rename', rename);
router.post('/delete', del);
router.post('/savelist', savelist);
router.post('/savetable', savetable);
router.post('/getvoclist', getvoclist);
router.post('/gettable', gettable);
router.post('/editlist', editlist);
router.post('/edittable', edittable);
router.post('/fetchid', fetchid);
router.post('/importlist', importlist);

module.exports = router;