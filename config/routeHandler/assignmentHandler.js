const express = require('express');
const { default: mongoose } = require('mongoose');
const { createAssignment, getAllAssignment, deleteAssignment,getSingleAssignment, pushQuestionAnswers,pushQuestionAttendance,getManyAssingment,getSingleAttendence } = require('../controllers/assignmentController');
const router = express.Router();

router.route('/').post(createAssignment).get(getAllAssignment).delete(deleteAssignment);
router.route('/:classRoomId').get(getSingleAssignment);
router.route('/attendance/:classRoomId').get(getSingleAttendence);
router.route('/:id').put(pushQuestionAnswers)
router.route('/nested/:questionId').put(pushQuestionAttendance)
router.route('/get-many').post(getManyAssingment)


module.exports = router;