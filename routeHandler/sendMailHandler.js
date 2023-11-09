const express = require('express');
const { default: mongoose } = require('mongoose');
const { sendEmail } = require('../controllers/sendMail');
const router = express.Router();

router.route('/').post(sendEmail);

module.exports = router;