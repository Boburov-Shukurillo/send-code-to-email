const nodemailer = require('nodemailer');

// Email yuborish funksiyasi
async function sendVerificationCode(email, code) {

    try {
        // Email konfiguratsiyasi (Gmail uchun misol)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'boburovshukurullo@gmail.com',       // Gmail manzilingiz
                pass: 'uzpgwwbuptvtfaup'
            }
        });

        // Email tarkibi
        const mailOptions = {
            from: '"My App" <YOUR_EMAIL@gmail.com>',
            to: email,
            subject: 'Tasdiqlash kodi',
            html: `
        <h3>Salom!</h3>
        <p>Sizning tasdiqlash kodingiz:</p>
        <h2>${code}</h2>
        <p>Iltimos, bu kodni hech kimga bermang.</p>
      `
        };

        // Yuborish
        await transporter.sendMail(mailOptions);
        console.log('Kod emailga yuborildi!');
    } catch (error) {
        console.error('Email yuborishda xatolik:', error);
    }
}


module.exports = sendVerificationCode