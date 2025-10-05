const express = require('express');
const { createHomework, getHomeworks, completeHomework, editHomework, deleteHomework } = require('../controllers/homeworkController');

const router = express.Router();

router.post('/get', getHomeworks);
router.post('/create', createHomework);
router.post('/complete', completeHomework);
router.post('/update', editHomework);
router.post('/delete', deleteHomework);


module.exports = router;