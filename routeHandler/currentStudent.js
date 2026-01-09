const express = require('express');

const {
  createCurrentStudent,
  getAllCurrentStudent,
  deleteCurrentStudent,
  updateStudentById,
} = require('../controllers/currentStudentController');

const router = express.Router();

router.route('/')
  .post(createCurrentStudent)
  .get(getAllCurrentStudent);

router.route('/:id').delete(deleteCurrentStudent);
  
router.route('/:id').put(updateStudentById);


module.exports = router;
