const express = require('express');
const { default: mongoose } = require('mongoose');
const {
  createbook,
  getAllbook,
  getSingleBook,
  getSingleBookDelete,
  updateBook,
} = require('../controllers/bookController');
const { checkLogin } = require('../middlewares/checkLogin');
const router = express.Router();

router.route('/').post(createbook).get(getAllbook);
router.route('/:id').get(getSingleBook);

router.route('/delete/:id').delete(getSingleBookDelete);
router.route('/:id').put(updateBook);
module.exports = router;
