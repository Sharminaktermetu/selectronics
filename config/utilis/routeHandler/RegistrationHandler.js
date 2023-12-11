const express = require('express');
const {
  createRegistration,
  getAllRegistration,
  getSingleUserReg,
  RegistrationUpdate,
  SingleUserRegDelete,
  getSingleUserRegId,
} = require('../controllers/RegistrationController');
const router = express.Router();

router.route('/').post(createRegistration).get(getAllRegistration);
router.route('/:email').get(getSingleUserReg).put(RegistrationUpdate);
router.route('/singleId/:id').get(getSingleUserRegId);

router.route('/delete/:id').delete(SingleUserRegDelete);

module.exports = router;
