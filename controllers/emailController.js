const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');

const User = require('../schemas/userSchema');
const { Otp } = require('../schemas/otpSchema');
sgMail.setApiKey(process.env.EMAIL_API_KEY);
const otpGenerator = require('otp-generator');
const bcrypt = require("bcrypt");
const _ = require("lodash");
// Function to generate a random OTP


const emailOtpSend = async (req, res) => {
    const user = await User.findOne({
        email: req.body.email
    });

    if (user) return res.status(400).json({ user: true, success: true, });

    const OTP = otpGenerator.generate(4, {
        digits: true, alphabets: false, upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false,
    });
console.log(OTP);
    const email = req.body.email;
    const msg = {
              to: email,
              from: 'care@qawmiuniversity.com', // Sender's email address
              subject: 'Your OTP for Verification',
              text: `Your verification code for Qawmi University: <strong> ${OTP}</strong>
              <br/>
            The code will expire in 5 minutes.
            Please do NOT share your otp with others.`,
              html: `Your verification code for Qawmi University: <strong> ${OTP}</strong>
                <br/>
              The code will expire in 5 minutes.
              Please do NOT share your otp with others.`,
            };
        
            await sgMail.send(msg);
    const otp = new Otp({ email: email, otp: OTP });
    const salt = await bcrypt.genSalt(10);
    otp.otp = await bcrypt.hash(otp.otp, salt);

    const result = await otp.save();
    console.log(result);

    // You may want to send an email with the OTP here

    return res.json({ success: true, message: 'Email OTP sent successfully' });
};
const recoveryEmailOtpSend = async (req, res) => {
    const user = await User.findOne({
        email: req.body.email
    });

    

    const OTP = otpGenerator.generate(4, {
        digits: true, alphabets: false, upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false,
    });
console.log(OTP);
    const email = req.body.email;
    const msg = {
              to: email,
              from: 'care@qawmiuniversity.com', // Sender's email address
              subject: 'Your OTP for Verification',
              text: `Your verification code for Qawmi University: <strong> ${OTP}</strong>
              <br/>
            The code will expire in 5 minutes.
            Please do NOT share your otp with others.`,
              html: `Your verification code for Qawmi University: <strong> ${OTP}</strong>
              <br/>
            The code will expire in 5 minutes.
            Please do NOT share your otp with others.`,
            };
        
            await sgMail.send(msg);
    const otp = new Otp({ email: email, otp: OTP });
    const salt = await bcrypt.genSalt(10);
    otp.otp = await bcrypt.hash(otp.otp, salt);

    const result = await otp.save();
    console.log(result);

    // You may want to send an email with the OTP here

    return res.json({ success: true, message: 'Email OTP sent successfully' });
};

const verifyEmailOtp = async (req, res) => {
    const otpHolder = await Otp.find({
        email: req.body.email
    });

    if (otpHolder.length === 0) return res.status(400).send("No OTP found for the provided email");

    const rightOtpFind = otpHolder[otpHolder.length - 1];
    const isOtpExpired = await isExpired(rightOtpFind.timestamp); // Assuming 'timestamp' is a field in your Otp schema

    if (isOtpExpired) {
        return res.status(400).send("The OTP has expired");
    }

    const validUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);

    if (rightOtpFind.email === req.body.email && validUser) {
        const user = new User(_.pick(req.body, ["email"]));

        // Additional logic for email verification

        const token = user.generateJWT();
        // const result = await user.save();
        const OTPDelete = await Otp.deleteMany({
            email: rightOtpFind.email
        });

        return res.status(200).send({
            success: true,
            message: "Email OTP verification successful!",
            // token: {token},
            // data: userEmail
        });
    } else {
        return res.status(400).send("Invalid email OTP!");
    }
};

// Function to check if the OTP has expired
async function isExpired(timestamp) {
    const expirationTime = 5
    const currentTime = new Date().getTime();
    return (currentTime - timestamp) > expirationTime;
}

module.exports = {
    emailOtpSend,
    verifyEmailOtp,
    recoveryEmailOtpSend

};

