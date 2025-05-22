const express=require('express')
const { default: mongoose } = require('mongoose')


const {registerUser, loginUser, 
    forgotPassword, resetPassword, 
    updateUser, getUserInfo, deleteUser, 
    getSingleUserInfo, getAllUser,getAssignmentMarks,
     getSingleUserAssignmentMarks, pushQuizMarks, 
     getManyByFilter,getUserByRole,getSingleUserQuiz, pushQuestionMarks,
      getSingleUserQuestionMarks,pushFeedback,updateAttendance, updatePoint,
       filterByCoursePurchasing, getUserBySearch,persistUser,
        getStudentByID,updateLevels, verifyEmail, 
        getStudentByStudentId, getSingleUserHome, 
        updateCart} = require('../controllers/userController')


const router=express.Router()
const {checkLogin,admin, StudentTeacherAdmin}=require('../middlewares/checkLogin')



router.route('/').put(updateUser).get(checkLogin,persistUser)
router.route('/single/:email').get(getSingleUserInfo)
router.route('/single-home/:id').get(getSingleUserHome)
router.route('/byID/:id').get(getStudentByID)
router.route ('/getByFiltered').put(getManyByFilter)
router.route('/role/:role').get(getUserByRole)
router.route('/delete/:email').delete(deleteUser)
router.route('/all').get(getAllUser)
router.route('/studentId/:studentId').get(getStudentByStudentId)
router.route('/signup').post(registerUser)
router.post('/login',loginUser)
// router.route('/forgotpassword').post(forgotPassword)
router.route("/passwordreset").put(resetPassword);
router.route("/assignmentMarks").get(getAssignmentMarks);
router.route("/assignmentMarks/:id").get(getSingleUserAssignmentMarks)
router.route("/questionMarks/:email").get(getSingleUserQuestionMarks)
router.route("/quizMarks/:email").put(pushQuizMarks).get(getSingleUserQuiz); 
router.route("/questionMarks/:email").put(pushQuestionMarks); 
router.route("/feedback/:email").put(pushFeedback); 
router.route("/point/:email").put(updatePoint); 
router.route("/attendance/:email").put(updateAttendance); 
router.route("/filter-course/:id").get(filterByCoursePurchasing);
router.route('/get-search').get(getUserBySearch)
router.route('/update-level').put(updateLevels)
// router.route('/verify-email/:verifyToken').put(verifyEmail)



module.exports=router