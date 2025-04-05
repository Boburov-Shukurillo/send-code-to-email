// utils/sendEmail.js
const nodemailer = require('nodemailer');


module.exports = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.HOST),
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        })

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text
        })
        console.log('Email send succses');
    } catch (error) {
        console.log(error);
        console.log('Email not send');
    }
}