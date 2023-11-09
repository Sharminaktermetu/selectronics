

const express = require('express');
const { default: mongoose } = require('mongoose');
const { createQuiz, getAllQuiz, deleteQuiz,getSingleQuiz,pushQuizAttendance } = require('../controllers/quizController');
const router = express.Router();

router.route('/').post(createQuiz).get(getAllQuiz);
router.route('/:id').get(getSingleQuiz).put(pushQuizAttendance);
router.route('/:id').delete(deleteQuiz);

module.exports = router;