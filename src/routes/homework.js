const express = require('express');
const {
  addHomework,
  getHomework,
  updateHomework,
  deleteHomework,
} = require('../controllers/homework');

const router = express.Router();

router.post('/', addHomework);
router.get('/', getHomework);
router.put('/:id', updateHomework);
router.delete('/:id', deleteHomework);

module.exports = router;