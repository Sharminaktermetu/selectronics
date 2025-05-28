const express = require('express');
const {
    sendOtp,verifyOtp,forgotSendOtp,
    checkPhnEmail,
    // verifyForgotOtp

} = require('../controllers/otpController');

const router = express.Router();

router.route('/send-otp').post(sendOtp);
router.route('/verify-otp').post(verifyOtp);
router.route('/forgot-otp').post(forgotSendOtp);
router.route('/check').post(checkPhnEmail);
// router.route('/forgot-verify-otp').post(verifyForgotOtp);


module.exports = router;