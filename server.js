require("dotenv").config()
const express = require("express")
const app = express()
const connectDB = require("./config/db")
const router = require("./routes/auth")

connectDB()

app.use(express.json())

app.use('/api/auth', router)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})