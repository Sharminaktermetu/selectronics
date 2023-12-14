const express=require('express')
const { default: mongoose } = require('mongoose')
const { createCourse, getAllCourse, courseUpdate, getSingleCourse,getManyByFilter,getSingleCourseforStudent,getSingleForAdmin,deleteCourse,getCourseForTeacher,getCourseBySearch, likeUpdate, getAllCourseForAdmin } = require('../controllers/courseController')
const { checkLogin, admin, StudentTeacherAdmin } = require('../middlewares/checkLogin')
const router=express.Router()

router.route('/').post(createCourse).get(getAllCourse).put(courseUpdate)
router.route('/admin').get(getAllCourseForAdmin)
router.route("/update").put(courseUpdate)
router.route('/:title').get(getSingleCourse)
router.route("/delete/:title").delete(deleteCourse)
router.route('/single-student/:title').get(getSingleCourseforStudent)
router.route('/single-admin/:title').get(getSingleForAdmin)
router.route("/get-courseby-filter").put(getManyByFilter)
router.route("/teacher/:email").get(getCourseForTeacher)
router.route("/get-search").post(getCourseBySearch)
router.route("/like/:id").put(likeUpdate)

module.exports=router