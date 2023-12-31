const express = require('express');
const {
    sendOtp,getOtp,verifyOtp

} = require('../controllers/otpController');

const router = express.Router();

router.route('/send-otp').post(sendOtp);
router.route('/verify-otp').post(verifyOtp);
router.route('/').get(getOtp);


module.exports = router;