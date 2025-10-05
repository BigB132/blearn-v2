const express = require('express');
const { createSubject, getSubjects, deleteSubject, editSubject } = require("../controllers/subjectController");

const router = express.Router();

router.post('/create', createSubject);
router.post('/get', getSubjects);
router.post('/update', editSubject);
router.post('/delete', deleteSubject);

module.exports = router;