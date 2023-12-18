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

router.route('/').post(checkLogin,createRegistration).get(getAllRegistration);
router.route('/:email').get(checkLogin,getSingleUserReg).put(checkLogin,RegistrationUpdate);
router.route('/singleId/:id').get(checkLogin,getSingleUserRegId);
router.route('/update/:id').put(checkLogin,RegistrationUpdateById)

router.route('/delete/:id').delete(checkLogin,SingleUserRegDelete);

module.exports = router;
