const express = require('express');
const {
    emailOtpSend,verifyEmailOtp,recoveryEmailOtpSend

} = require('../controllers/emailController');

const router = express.Router();

router.route('/email-otp/send').post(emailOtpSend);
router.route('/verify/email').post(verifyEmailOtp);
router.route('/recovery/verify/email').post(recoveryEmailOtpSend);



module.exports = router;