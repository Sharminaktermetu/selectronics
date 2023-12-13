const express = require('express');
const { createBPayment, executeBPayment } = require('../controllers/bkashController');
const router = express.Router();
const {checkLogin,admin}=require('../middlewares/checkLogin')

router.post('/bkash-checkout',createBPayment)
router.get('/bkash-callback',executeBPayment)


module.exports = router;