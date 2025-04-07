const { default: mongoose } = require("mongoose")

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Server connected to ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDb