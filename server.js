require("dotenv").config()
const express = require("express")
const app = express()
const connectDB = require("./config/db")
connectDB()
app.use("/api/auth", require("./routes/userAuth"))

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Server Running On ${PORT}`);

})