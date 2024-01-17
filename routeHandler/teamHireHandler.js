const express = require('express');
const {
    createTeamMember,
    getAllTeamMember,
    SingleTeamMemberRegDelete
} = require('../controllers/teamHireController');
const { admin, checkLogin } = require('../middlewares/checkLogin');
const { route } = require('./userHandler');
const router = express.Router();

router.route('/').post(createTeamMember).get(getAllTeamMember);
// router.route('/reg').get(getTeacherApplication)
// router.route('/:email').get(getSingleUserReg).put(RegistrationUpdate);
// router.route('/singleId/:id').get(getSingleUserRegId);
// router.route('/update/:id').put(RegistrationUpdateById)

router.route('/delete/:id').delete(SingleTeamMemberRegDelete);

module.exports = router;
