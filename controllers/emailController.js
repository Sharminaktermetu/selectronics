const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');

const User = require('../schemas/userSchema');
const { Otp } = require('../schemas/otpSchema');
sgMail.setApiKey('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'); // Replace with your actual SendGrid API key
const otpGenerator = require('otp-generator');
const bcrypt = require("bcrypt");
const _ = require("lodash");
// Function to generate a random OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Map to store OTPs, you may want to use a database for this in a real application
const otpMap = new Map();

// const emailOtpSend=(async (req, res) => {
//     console.log(req.body.email);
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({
//         email: req.body.email
//     });
//     if (user) return res.status(400).json({user:true, success: true, message: 'User already registered!' });

//     if (!email) {
//       return res.status(400).json({ error: 'Email is required' });
//     }

//     const otp = generateOTP();
// console.log(otp);
//     const msg = {
//       to: email,
//       from: 'care@qawmiuniversity.com', // Sender's email address
//       subject: 'Your OTP for Verification',
//       text: `Your OTP is: ${otp}`,
//       html: `<strong>Your OTP is: ${otp}</strong>`,
//     };

//     await sgMail.send(msg);

//     // Store the OTP in the map with the email as the key
//     otpMap.set(email, otp);

//     res.json({ message: 'OTP sent successfully' });
//   } catch (error) {
//     console.error('Error sending OTP:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// const verifyEmailOtp=(async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     if (!email || !otp) {
//       return res.status(400).json({ error: 'Email and userEnteredOTP are required' });
//     }

//     const storedOTP = otpMap.get(email);

//     if (!storedOTP) {
//       return res.status(400).json({ error: 'OTP not found or expired' });
//     }

//     if (userEnteredOTP === storedOTP) {
//       // OTP is valid, proceed with creating a user
//       const newUser = { email }; // Create a user object with the email

//       // Assuming NewUserModel.create returns the created user object
//       const result = await User.create(newUser);

//       // Clear the OTP for the email (optional)
//       otpMap.delete(email);

//       res.json({ message: 'OTP verification successful', user: result });
//     } else {
//       res.status(400).json({ error: 'Invalid OTP' });
//     }
//   } catch (error) {
//     console.error('Error verifying OTP:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });
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
              text: `Your OTP is: ${OTP}`,
              html: `<strong>Your OTP is: ${OTP}</strong>`,
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
   

};

