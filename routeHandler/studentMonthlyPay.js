const express = require('express');
const {
    createStudentMonthlyPay,
    getAllStudentPay,
    deleteAllStudentPay
} = require('../controllers/studentMonthlyPayment');

const router = express.Router();

router.route('/').post(createStudentMonthlyPay).get(getAllStudentPay);
router.route('/').delete(deleteAllStudentPay)


module.exports = router;