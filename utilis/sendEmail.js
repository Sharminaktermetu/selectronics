const nodemailer = require("nodemailer");

const dotenv = require("dotenv");
dotenv.config();
const sgMail = require("@sendgrid/mail");
// const API_KEY = process.env.EMAIL_API_KEY;
sgMail.setApiKey(process.env.EMAIL_API_KEY);
const sendEmail=async(option)=>{
  const message = {
    to: option.to, // jodi multiple patate cai tahole array er vitore dite hbe
    from: {
      name: "Sharmin Electronics",
      email: "care@qawmiuniversity.com",
    },
    subject: option.subject,
    text: option.text,
    html: `<p>${option.text}</p>`,
  };

  const response = await sgMail.send(message);


}




module.exports = sendEmail;