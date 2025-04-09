require("dotenv").config()
const express = require("express");
const app = express()


app.use('/api/auth', require("./models/User"))

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})