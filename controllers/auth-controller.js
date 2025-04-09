const User = require("../models/User")
const sendVerificationCode = require("../utils/senEmail")

const RegisterUser = async (req, res) => {
    const { username, email, password, verify_code } = req.body

    try {
        // is username is free ?
        const userN = await User.findOne({ username })
        if (userN) return res.status(400).json({
            msg: 'You can\'t use user name'
        })

        // is email used by anyone?
        const user = await User.findOne({ email })
        if (user) return res.status(400).json({
            msg: 'You can\'t use email'
        })

        const code = Math.floor(100000 + Math.random() * 900000); // 6 xonali tasodifiy kod
        sendVerificationCode(email, code);

        if (verify_code === code) {

            const newUser = new User({
                username,
                email,
                password,
                verify_code
            })

            newUser.save()

            res.status(201).json({
                msg: "User created !"
            })
        } else {
            return res.status(400).json({ msg: "Code is wrong" })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Sorry somthing went wrong'
        })
    }
}

module.exports = { RegisterUser }