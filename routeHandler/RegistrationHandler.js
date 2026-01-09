const express = require('express');
const {
  createRegistration,
  getAllRegistration,
  getSingleUserReg,
  RegistrationUpdate,
  SingleUserRegDelete,
  getSingleUserRegId,
  RegistrationUpdateById,
  getTeacherApplication,
  getTeacherFinal,
 getTeacherInterview,
 SingleRegDelete
} = require('../controllers/RegistrationController');
const { admin, checkLogin } = require('../middlewares/checkLogin');
const { route } = require('./userHandler');
const router = express.Router();

router.route('/').post(createRegistration).get(checkLogin, getAllRegistration).post(createRegistration); ;
  
router.route('/final').get(getTeacherFinal);
router.route('/interview').get(getTeacherInterview);
router.route('/reg').get(getTeacherApplication)
router.route('/:email').get(getSingleUserReg).put(RegistrationUpdate);
router.route('/singleId/:id').get(getSingleUserRegId);
router.route('/update/:id').put(RegistrationUpdateById)

router.route('/delete/:id').delete(SingleUserRegDelete);
router.route('/reg/delete/:id').delete(SingleRegDelete);

module.exports = router;
