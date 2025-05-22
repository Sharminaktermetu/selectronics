const express = require('express');
const { default: mongoose } = require('mongoose');
const {
  createnotification,
  getAllnotification,
  deletenotification,
  getSinglenotification,
  getSinglenotificationTeacher,
} = require('../controllers/notificationsControllor');

const router = express.Router();

router.route('/').post(createnotification).get(getAllnotification);
router.route('/:id').delete(deletenotification);
router.route('/:notificationemail').get(getSinglenotification);
router.route('/teacher/:notificationemail').get(getSinglenotificationTeacher);

module.exports = router;
