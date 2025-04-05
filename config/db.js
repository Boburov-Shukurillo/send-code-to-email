const { default: mongoose } = require("mongoose")
require("dotenv").config()

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MOngoDb Server Connected To ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDb