const express = require('express');
const { default: mongoose } = require('mongoose');
const { createLeaderBoard,getAllLeaderBoard } = require('../controllers/leaderBoardController');
const router = express.Router();

router.route('/').post(createLeaderBoard).get(getAllLeaderBoard);
// router.route('/:id').delete(deleteQuiz);

module.exports = router;