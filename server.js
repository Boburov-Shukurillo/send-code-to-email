require("dotenv").config()
const express = require("express")
const app = express()
const auth_route = require("./routes/auth")
const connectDb = require("./config/db")


app.use(express.json())

connectDb()

app.use('/api/auth', auth_route)




const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server Runnign on ${PORT}`);
})