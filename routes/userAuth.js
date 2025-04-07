const UserModel = require("../models/User")
const express = require("express")
const router = express.Router()

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body
    try {
        const user = UserModel.findOne(email)
        if (user) res.status(400).json({ msg: "Sorry You can't use This Email :(" })

        const salt = await bcrypt.genSalt(10)
        await bcrypt.hash(password, salt)

        const newUser = await UserModel.create({
            username,
            email,
            password
        })
        newUser.save()

        res.status(201).json({
            msg: "User Succecfull Created !"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Server Error"
        })
    }
})