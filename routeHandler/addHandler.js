const express = require('express');
const { default: mongoose } = require('mongoose');
const { createadd, getAlladd } = require('../controllers/addCotroller');

const router = express.Router();

router.route('/').post(createadd).get(getAlladd);

module.exports = router;
