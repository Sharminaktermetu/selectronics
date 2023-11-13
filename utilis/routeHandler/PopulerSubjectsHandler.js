const express = require('express');
const { default: mongoose } = require('mongoose');
const {
  createsubjects,
  getnewPopulerSubjects,
} = require('../controllers/populerSubjectsController');
const router = express.Router();

router.route('/').post(createsubjects).get(getnewPopulerSubjects);

module.exports = router;
