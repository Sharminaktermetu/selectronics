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
      name: "Muslim School",
      email: "care@qawmiuniversity.com",
    },
    subject: option.subject,
    text: option.text,
    html: `<p>${option.text}</p>`,
  };

  const response = await sgMail.send(message);


}



// const sendEmail = (options) => {
//   const transporter = nodemailer.createTransport({
//     service: process.env.Email_Service,
//     auth: {
//       user:process.env.Email_User,
//       pass: process.env.Email_Pass,
//     },
//   });

//   const mailOptions = {
//     from:process.env.Email_From,
//     to: options.to,
//     subject: options.subject,
//     html: options.text,
//   };

//   transporter.sendMail(mailOptions, function (err, info) {
//     if (err) {
//        console.log(err)
//     } else {
//        console.log(info)
//     }
//   });
// };

module.exports = sendEmail;