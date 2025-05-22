const express = require('express');
const { default: mongoose } = require('mongoose');
const {
  createFaq,
  getAllFaq,
  deleteFAQ,
} = require('../controllers/FaqController');
const router = express.Router();

router.route('/').post(createFaq).get(getAllFaq);
router.route('/:id').delete(deleteFAQ);

module.exports = router;
