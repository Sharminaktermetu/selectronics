const dotenv = require("dotenv");
dotenv.config();
const sgMail = require("@sendgrid/mail");
// const API_KEY = process.env.EMAIL_API_KEY;
sgMail.setApiKey(process.env.EMAIL_API_KEY);

const sendEmail = async (req, res) => {
  try {
    const message = {
      to: "bugsmashersbd@gmail.com", // jodi multiple patate cai tahole array er vitore dite hbe
      from: {
        name: "muslim schoool",
        email: "care@muslimschoool.com",
      },
      subject: "Hello from muslim schoool",
      text: "Its jain",
      html: "<h1>Its jain</h1>",
    };
    const response = await sgMail.send(message);
    
  } catch (error) {
    console.error(error.message);
  }
};

sendEmail();
