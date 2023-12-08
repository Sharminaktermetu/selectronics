const express = require('express');
const router = express.Router();
const NewUserModel = require('../schemas/newuserSchema');
const axios = require('axios');
const apiKey = 'KEY-4i36khch4gx965f2po09zcuvbas7gg9a'; // Replace with your actual API key
const apiSecret = 'or1h1F4KXm8zNKt3'; // Replace with your actual API secret
const apiBaseUrl = 'https://portal.adnsms.com/api/v1/secure'; // Replace with your API base URL

router.post('/', async (req, res) => {
    console.log("i am  from line no 10");
    try {
    const model=  NewUserModel.createCollection();
    console.log(model, "iam from line 13");
        const body = req.body;
        console.log(body);
        const result = await NewUserModel.connect(body);

        console.log(result);
        res.send(result);
    } catch (err) {
      console.log(err);
        res.status(400).json({ message: "Something went wrong after catch block", err })

    }
})


const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Store OTPs in memory (you should use a database in a real-world scenario)
const otpStorage = new Map();

// Endpoint to initiate OTP verification
router.post('/send-otp', async (req, res) => {
  console.log(req.body);
  const { mobile } = req.body;
  
  // Generate OTP
  const otp = generateOTP();
  console.log(otp);
  try {
    // Store the OTP for later verification
    otpStorage.set(mobile, otp);

    // Call the SMS API to send the OTP
    const smsResponse = await axios.post(`${apiBaseUrl}/send-sms`, {
      api_key: apiKey,
      api_secret: apiSecret,
      request_type: 'OTP',
      message_type: 'TEXT',
      mobile,
      message_body: `Your OTP for verification is: ${otp}`,
    });

    // Check if the SMS API request was successful
    if (smsResponse.data.api_response_code === 200) {
      res.json({ success: true, message: 'OTP sent successfully' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to send OTP' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Endpoint to verify the entered OTP
router.post('/verify-otp', (req, res) => {
  const { mobile, enteredOTP } = req.body;

  // Retrieve the stored OTP
  const storedOTP = otpStorage.get(mobile);

  if (storedOTP === enteredOTP) {
    res.json({ success: true, message: 'OTP verification successful',mobile });
  } else {
    res.status(400).json({ success: false, message: 'Invalid OTP' });
  }
});

// Handle other routes
router.get('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

  
  

module.exports = router; 