const express = require('express');
const {
    emailOtpSend,verifyEmailOtp

} = require('../controllers/emailController');

const router = express.Router();

router.route('/email-otp/send').post(emailOtpSend);
router.route('/verify/email').post(verifyEmailOtp);



module.exports = router;