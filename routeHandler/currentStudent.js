const express = require('express');

const {
  createCurrentStudent,
  getAllCurrentStudent,
  deleteCurrentStudent,
} = require('../controllers/currentStudentController');

const router = express.Router();

router.route('/')
  .post(createCurrentStudent)
  .get(getAllCurrentStudent);

router.route('/:id').delete(deleteCurrentStudent);

module.exports = router;
