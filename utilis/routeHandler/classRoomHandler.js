const express = require('express');
const { default: mongoose } = require('mongoose');
const {
  createClassRoom,
  getAllClassRoom,
  getClassRoomTeacher,
  getClassRoomStudent,
  classRoomUpdate,
  getSingleClassroom,
  pushClassNote,
  getClassNote,
  deleteClassNote,
  getAccessedStudents,
  updateAssignStudent,
  deleteClass,
  deleteClassroom,
  updateRating,
  updateClass
} = require('../controllers/classRoomController');

const router = express.Router();

router.route('/').post(createClassRoom).get(getAllClassRoom);
router.route('/teacher/:email').get(getClassRoomTeacher);
router.route('/student/:email').get(getClassRoomStudent);
router.route('/:classRoomId').put(classRoomUpdate);
router.route('/single/:classRoomId').get(getSingleClassroom);
router.route('/classNote/:classRoomId').put(pushClassNote).get(getClassNote);
router.route('/delete-note/delete/:id').put(deleteClassNote);
router.route('/accessedStudent/:id').put(updateAssignStudent);
router.route('/accessedStudent/:classRoomId').get(getAccessedStudents);
router.route('/delete-class/delete/:id').put(deleteClass);
router.route('/delete-classroom/:classRoomId').delete(deleteClassroom);
router.route('/rating/:classRoomId').put(updateRating);
router.route('/updateClass/:classRoomId').put(updateClass);

module.exports = router;
