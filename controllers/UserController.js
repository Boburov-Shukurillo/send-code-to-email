const User = require("../models/User");

const RegiterUser = async (req, res) => {
    const { username, email, password } = req.body

    try {
        // cheack username
        const username = await User.findOne({ username })
        if (username) res.status(400).json({ msg: "username already taken" })

        // cheack email
        const user = await User.findOne({ email })
        if (user) res.status(400).json({ msg: "Sorry You Can't This Eamil !" })

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const code = 23907

        const newUser = new User.create({
            username,
            email,
            password: hashedPassword,
            verify_code: code
        })

        await newUser.save()

        res.status(201).json({ message: 'User registered. Please verify your email' });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Server Error"
        })
    }
}


module.exports = { RegiterUser }