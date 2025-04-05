const express = require("express");
const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const router = express();
const sendVerificationEmail =require("../utils/sendMail")

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        let user = await UserModel.findOne({ email });

        if (user) res.status(400).json({ msg: "Email already exist" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        user = new UserModel({
            username,
            email,
            password: hashedPassword,
            verificationCode,
            verified: false
        });


        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await sendVerificationEmail(email, verificationCode);

        await user.save();
        res.status(201).json({ msg: 'Succcsesfull !' });
    } catch (error) {
        console.log("Server error", error);
        res.status(500).json({ msg: "Server Error" });
    }
});

router.post('/verify-email', async (req, res) => {
    const { email, code } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (!user) return res.status(400).json({ msg: 'Foydalanuvchi topilmadi' });

        if (user.verified) return res.json({ msg: 'Email allaqachon tasdiqlangan' });

        if (user.verificationCode === code) {
            user.verified = true;
            user.verificationCode = null;
            await user.save();
            return res.json({ msg: 'Email muvaffaqiyatli tasdiqlandi' });
        } else {
            return res.status(400).json({ msg: 'Noto‘g‘ri kod' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server xatosi');
    }
});



router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        let user = await UserModel.findOne({ email })

        if (!email) res.status(400).json({ msg: "Email is not Foud" })
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) res.status(400).json({ msg: "Wrong Password" })
        if (!user.verified) return res.status(403).json({ msg: 'Iltimos, avval emailingizni tasdiqlang' });


        const playload = {
            id: user._id
        }

        jwt.sign(playload, process.env.JWT_SECRET, (err, token) => {
            if (err) throw err;
            res.json({ token });
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server Error" })
    }
})
module.exports = router;