const express = require('express');

const {
  createCurrentStudent,
  getAllCurrentStudent,
} = require('../controllers/currentStudentController');

const router = express.Router();

router.route('/')
  .post(createCurrentStudent)
  .get(getAllCurrentStudent);

module.exports = router;
