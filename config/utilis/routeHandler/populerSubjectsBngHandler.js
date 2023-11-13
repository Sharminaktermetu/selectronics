const express = require('express');
const { default: mongoose } = require('mongoose');
const {
  createsubjectsBng,
  getnewPopulerSubjectsBng,
} = require('../controllers/populerSubjectsBngController');

const router = express.Router();

router.route('/').post(createsubjectsBng).get(getnewPopulerSubjectsBng);

module.exports = router;
