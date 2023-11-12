const express = require('express');
const { default: mongoose } = require('mongoose');
const {
  createAchievement,
  getAllAchievement,
} = require('../controllers/achievementController');

const router = express.Router();

router.route('/').post(createAchievement).get(getAllAchievement);

module.exports = router;
