const express = require('express');
const {
  createRegistration,
  getAllRegistration,
  getSingleUserReg,
  RegistrationUpdate,
  SingleUserRegDelete,
  getSingleUserRegId,
  RegistrationUpdateById 
} = require('../controllers/RegistrationController');
const { admin, checkLogin } = require('../middlewares/checkLogin');
const router = express.Router();

router.route('/').post(checkLogin,createRegistration).get(admin,getAllRegistration);
router.route('/:email').get(getSingleUserReg).put(RegistrationUpdate);
router.route('/singleId/:id').get(getSingleUserRegId);
router.route('/update/:id').put(RegistrationUpdateById)

router.route('/delete/:id').delete(SingleUserRegDelete);

module.exports = router;
