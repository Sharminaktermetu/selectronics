const express = require('express');
const router = express.Router();
const axios = require('axios');
const User = require('../schemas/userSchema');
const { Otp } = require('../schemas/otpSchema');
const apiKey = 'KEY-4i36khch4gx965f2po09zcuvbas7gg9a'; // Replace with your actual API key
const apiSecret = 'or1h1F4KXm8zNKt3'; // Replace with your actual API secret
const apiBaseUrl = 'https://portal.adnsms.com/api/v1/secure'; // Replace with your API base URL
const otpGenerator = require('otp-generator');
const bcrypt = require("bcrypt");
const _ = require("lodash");

const getOtp = (async (req, res) => {
    console.log("i am route");
    // try {
    //     // const body = req.body;
    //     // const result = await NewUserModel.create(body);

    //     console.log(result);
    //     res.send(result);
    // } catch (err) {
    //     res.status(400).json({ message: "Something went wrong after catch block", err })
    // }
})



const sendOtp = async (req, res) => {
    console.log(req.body);
    const user = await User.findOne({
        number: req.body.number
    });
    if (user) return res.status(400).json({user:true, success: true, });

    const OTP = otpGenerator.generate(4, {
        digits: true, alphabets: false, upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets:false,
    });

    const number = req.body.number;
    console.log(OTP,'this is otp');
    const smsResponse = await axios.post(`${apiBaseUrl}/send-sms`, {
              api_key: apiKey,
              api_secret: apiSecret,
              request_type: 'OTP',
              message_type: 'TEXT',
              mobile:number,
              message_body: `Your OTP for verification is: ${OTP}`,
    });
    const otp = new Otp({ number: number, otp: OTP });
    const salt = await bcrypt.genSalt(10)
    otp.otp = await bcrypt.hash(otp.otp, salt);
    const result = await otp.save();
    console.log(result);
     if (smsResponse.data.api_response_code === 200) {
              res.json({ success: true, message: 'OTP sent successfully' });
            } else {
              res.status(500).json({ success: false, message: 'Failed to send OTP' });
    }
    // return res.json({ success: true, message: 'OTP sent successfully' });
}


// Endpoint to verify the entered OTP

const verifyOtp = async (req, res) => {
    const otpHolder = await Otp.find({
        number: req.body.number
    });
    if (otpHolder.length === 0) return res.status(400).send("You use an Expired OTP!");
    const rightOtpFind = otpHolder[otpHolder.length - 1];
    const validUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);

    if (rightOtpFind.number === req.body.number && validUser) {
        const user = new User(_.pick(req.body, ["number"]));
        const token = user.generateJWT();
        // const result = await user.save();
        const OTPDelete = await Otp.deleteMany({
            number: rightOtpFind.number
        });

        return res.status(200).send({
            success: true,
            message: "OTP Verify Successfull.!!",
            // token: {token},
            // data: userNumber
        });
    } else {
        return res.status(400).send("Your OTP was wrong!")
    }
}

const forgotSendOtp = async (req, res) => {

    const OTP = otpGenerator.generate(4, {
        digits: true, alphabets: false, upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets:false,
    });

    const number = req.body.number;
    console.log(OTP,'this is otp');
    const smsResponse = await axios.post(`${apiBaseUrl}/send-sms`, {
              api_key: apiKey,
              api_secret: apiSecret,
              request_type: 'OTP',
              message_type: 'TEXT',
              mobile:number,
              message_body: `Your OTP for verification is: ${OTP}`,
    });
    const otp = new Otp({ number: number, otp: OTP });
    const salt = await bcrypt.genSalt(10)
    otp.otp = await bcrypt.hash(otp.otp, salt);
    const result = await otp.save();
    console.log(result);
     if (smsResponse.data.api_response_code === 200) {
              res.json({ success: true, message: 'OTP sent successfully' });
            } else {
              res.status(500).json({ success: false, message: 'Failed to send OTP' });
    }
    return res.json({ success: true, message: 'OTP sent successfully' });
}
const verifyForgotOtp = async (req, res) => {
    const otpHolder = await Otp.find({
        number: req.body.number
    });
    if (otpHolder.length === 0) return res.status(400).send("You use an Expired OTP!");
    const rightOtpFind = otpHolder[otpHolder.length - 1];
    const validUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);

    if (rightOtpFind.number === req.body.number && validUser) {
        const user = new User(_.pick(req.body, ["number"]));
        const token = user.generateJWT();
        // const result = await user.save();
        const OTPDelete = await Otp.deleteMany({
            number: rightOtpFind.number
        });

        return res.status(200).send({
            success: true,
            message: "OTP Verify Successfull.!!",
            // token: {token},
            // data: userNumber
        });
    } else {
        return res.status(400).send("Your OTP was wrong!")
    }
}


module.exports = {
    sendOtp,
    verifyOtp,
    forgotSendOtp,verifyForgotOtp

};
