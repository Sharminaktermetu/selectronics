const express=require('express')
const { default: mongoose } = require('mongoose')
const { createCourse, getAllCourse, courseUpdate, getSingleCourse,getManyByFilter,getSingleCourseforStudent,getSingleForAdmin,deleteCourse,getCourseForTeacher,getCourseBySearch, likeUpdate, getAllCourseForAdmin, getSingleCourseByTitle } = require('../controllers/courseController')
const { checkLogin, admin, StudentTeacherAdmin } = require('../middlewares/checkLogin')
const router=express.Router()

router.route('/').post(createCourse).get(getAllCourse).put(courseUpdate)
router.route('/admin').get(checkLogin,getAllCourseForAdmin)
router.route("/update").put(courseUpdate)
// router.route('/:id').get(getSingleCourse)
router.route('/:engTitle').get(getSingleCourseByTitle)
router.route("/delete/:id").delete(deleteCourse)
router.route('/single-student/:id').get(getSingleCourseforStudent)
router.route('/single-admin/:id').get(getSingleForAdmin)
router.route("/get-courseby-filter").put(getManyByFilter)
router.route("/teacher/:email").get(getCourseForTeacher)
router.route("/get-search").post(getCourseBySearch)
router.route("/like/:id").put(likeUpdate)



module.exports=router