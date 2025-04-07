const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const registerUser = async (req, res) => {
    const { username, email, password } = req.body

    try {
        //check user email 
        const check_email = await User.findOne({ email })
        if (check_email) return res.status(400).json({ msg: "Sorry This Email Already Used" })

        //check username 
        const check_username = await User.findOne({ username })
        if (check_username) return res.status(400).json({ msg: "Sorry This Username Already Used" })

        // hash password cuz password shouldn't show othersa
        const salt = await bcrypt.genSalt(10);
        const hashedPSW = await bcrypt.hash(password, salt);

        // create new user
        const new_user = new User({
            username,
            email,
            password: hashedPSW
        })

        // save user to mongodb
        new_user.save()

        // send response to user
        return res.status(201).json({
            msg: "User Successfull registred ! Conguragilation !"
        })

    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ msg: error })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {

        // check user's email
        const user = await User.findOne({ email });
        if (!user) res.status(400).json({ msg: "sorry we can't found this email :( try again" })

        // check user's password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) res.status(400).json({ message: "Invalid credentials" });

        // create token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });


        res.status(200).json({ token, user: { id: user._id, username: user.username } });

    } catch (error) {
        res.status(500).json({ msg: "Something error in Server" })
    }
}

module.exports = { registerUser, loginUser }