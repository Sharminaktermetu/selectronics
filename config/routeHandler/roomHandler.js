const express = require('express');
const { default: mongoose } = require('mongoose');
const { createRoom, getAllRoom } = require('../controllers/roomController');
const router = express.Router();

router.route('/').post(createRoom).get(getAllRoom);
// router.route('/:id').get(getSingleQuiz).put(pushQuizAttendance);
// router.route('/:id').delete(deleteQuiz);

module.exports = router;