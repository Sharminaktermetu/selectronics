const express = require('express');
const { createBPayment, executeBPayment,refundBPayment,getAllpayment,deleteAllStudentPay,getmonthlypayment } = require('../controllers/bkashController');
const router = express.Router();
const {checkLogin,admin}=require('../middlewares/checkLogin')

router.post('/bkash-checkout',createBPayment)
router.get('/bkash-callback',executeBPayment)
router.get('/',getAllpayment)
router.get('/monthly',getmonthlypayment)
// router.delete('/',deleteAllStudentPay)
// router.get('/bkash-refund',refundBPayment)


module.exports = router;