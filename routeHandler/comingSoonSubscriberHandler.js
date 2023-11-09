const express = require('express');
const { default: mongoose } = require('mongoose');
const { createComingSoonSubscribe, getAllComingSoonSubscribe } = require('../controllers/comingSoonSubscribeController');
const router = express.Router();

router.route('/').post(createComingSoonSubscribe).get(getAllComingSoonSubscribe);

module.exports = router;