const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

// Email yuborish
const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Shukurillo Auth" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent to", to);
  } catch (error) {
    console.error("Email error:", error);
  }
};

// Tasdiqlash kodi yuborish
const sendVerificationCode = async (email, code) => {
  const subject = "Email tasdiqlash kodi";
  const text = `Salom! Ro'yxatdan o'tish uchun tasdiqlash kodingiz: ${code}`;
  await sendEmail(email, subject, text);
};

module.exports = { sendEmail, sendVerificationCode };
