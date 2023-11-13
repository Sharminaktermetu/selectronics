const express = require('express');
const { default: mongoose } = require('mongoose');
const { createComingSoon, getAllComingSoon } = require('../controllers/comingSoonController');
const router = express.Router();

router.route('/').post(createComingSoon).get(getAllComingSoon);

module.exports = router;