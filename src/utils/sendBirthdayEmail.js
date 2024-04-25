const nodemailer = require("nodemailer");
const config = require("../config");

//! Initialize Nodemailer transporter for any smtp
const transporter = nodemailer.createTransport({
  host: config.email_host,
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: config.email,
    pass: config.password,
  },
});

//! Initialize Nodemailer transporter for any gmail account
// const transporter = nodemailer.createTransport({
//     service: "Gmail",
//   auth: {
//     user: config.email, // Your Gmail account
//     pass: config.password, // Your Gmail account password
//   },
// });

const sendBirthdayEmail = (email, name) => {
  const mailOptions = {
    from: config.email,
    to: email,
    subject: `Happy Birthday, ${name}! 🎉`,
    text: `Dear ${name},\n\nHappy birthday! We hope you have a fantastic day!\n\nBest wishes,\nYour Birthday App Team`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendBirthdayEmail;
