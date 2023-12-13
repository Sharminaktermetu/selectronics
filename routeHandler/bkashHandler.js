const express = require('express');
const { createBPayment, executeBPayment,refundBPayment } = require('../controllers/bkashController');
const router = express.Router();
const {checkLogin,admin}=require('../middlewares/checkLogin')

router.post('/bkash-checkout',createBPayment)
router.get('/bkash-callback',executeBPayment)
router.get('/bkash-refund',refundBPayment)


module.exports = router;