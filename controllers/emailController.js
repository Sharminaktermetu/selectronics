

const { Otp } = require('../schemas/otpSchema');
const otpGenerator = require('otp-generator');
const bcrypt = require("bcrypt");
const _ = require("lodash");
const User = require('../schemas/userSchema');
const brevoApi = require('../utilis/brevoClient');

// ===============================
// Send OTP for New Registration
// ===============================
const emailOtpSend = async (req, res) => {

    const user = await User.findOne({ email: req.body.email });

    if (user) return res.status(400).json({ user: true, success: true });

    const OTP = otpGenerator.generate(4, {
        digits: true, alphabets: false, upperCaseAlphabets: false, specialChars: false
    });
    console.log("Registration OTP:", OTP);
    
    const email = req.body.email;

    const sendSmtpEmail = {
        sender: { name: "Muslim School", email: "sharminacc1@gmail.com" },
        to: [{ email, name: email.split('@')[0] }],
        subject: "Your OTP for Verification",
        htmlContent: `
          <p>Your verification code for Muslim School is:</p>
          <h2>${OTP}</h2>
          <p>The code will expire in 5 minutes. Please do NOT share your OTP with others.</p>
        `,
        textContent: `Your verification code for Muslim School is: ${OTP}. It expires in 5 minutes.`,
    };

    try {
        await brevoApi.sendTransacEmail(sendSmtpEmail);

        // Save OTP in DB (hashed)
        const otp = new Otp({ email, otp: OTP, timestamp: new Date().getTime() });
        const salt = await bcrypt.genSalt(10);
        otp.otp = await bcrypt.hash(otp.otp, salt);
        await otp.save();

        return res.json({ success: true, message: 'Email OTP sent successfully' });
    } catch (error) {
        console.error("Brevo Email Error:", error);
        return res.status(500).json({ success: false, message: "Failed to send OTP email" });
    }
};

// ===============================
// Send OTP for Password Recovery
// ===============================
const recoveryEmailOtpSend = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const OTP = otpGenerator.generate(4, {
        digits: true, alphabets: false, upperCaseAlphabets: false, specialChars: false
    });

    console.log("Recovery OTP:", OTP);
    const email = req.body.email;

    const sendSmtpEmail = {
        sender: { name: "Muslim School", email: "care@qawmiuniversity.com" },
        to: [{ email, name: email.split('@')[0] }],
        subject: "MuslimSchool OTP Verification Code - Forgot Password",
        htmlContent: `
          <p>Your verification code for Muslim School is:</p>
          <h2>${OTP}</h2>
          <p>The code will expire in 5 minutes. Please do NOT share your OTP with others.</p>
        `,
        textContent: `Your verification code for Muslim School is: ${OTP}. It expires in 5 minutes.`,
    };

    try {
        await brevoApi.sendTransacEmail(sendSmtpEmail);

        // Save OTP in DB (hashed)
        const otp = new Otp({ email, otp: OTP, timestamp: new Date().getTime() });
        const salt = await bcrypt.genSalt(10);
        otp.otp = await bcrypt.hash(otp.otp, salt);
        await otp.save();

        return res.json({ success: true, message: 'Recovery OTP sent successfully' });
    } catch (error) {
        console.error("Brevo Email Error:", error);
        return res.status(500).json({ success: false, message: "Failed to send recovery OTP email" });
    }
};

// ===============================
// Verify OTP
// ===============================
const verifyEmailOtp = async (req, res) => {
    const otpHolder = await Otp.find({ email: req.body.email });
    if (otpHolder.length === 0) return res.status(400).send("No OTP found for this email");

    const rightOtpFind = otpHolder[otpHolder.length - 1];
    const isOtpExpired = await isExpired(rightOtpFind.timestamp);

    if (isOtpExpired) return res.status(400).send("The OTP has expired");

    const validUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);

    if (rightOtpFind.email === req.body.email && validUser) {
        const user = new User(_.pick(req.body, ["email"]));
        const token = user.generateJWT();

        // Clear OTPs after success
        await Otp.deleteMany({ email: rightOtpFind.email });

        return res.status(200).send({
            success: true,
            message: "Email OTP verification successful!",
            token
        });
    } else {
        return res.status(400).send("Invalid email OTP!");
    }
};

// ===============================
// Check OTP Expiration
// ===============================
async function isExpired(timestamp) {
    const expirationTime = 5 * 60 * 1000; // 5 minutes in ms
    const currentTime = new Date().getTime();
    return (currentTime - timestamp) > expirationTime;
}

module.exports = {
    emailOtpSend,
    recoveryEmailOtpSend,
    verifyEmailOtp
};


// Function to check if the OTP has expired
async function isExpired(timestamp) {
  const expirationTime = 5 * 60 * 1000; // 5 minutes in ms
  const currentTime = new Date().getTime();
  return currentTime - timestamp > expirationTime;
}

module.exports = {
  emailOtpSend,
  verifyEmailOtp,
  recoveryEmailOtpSend,
};
