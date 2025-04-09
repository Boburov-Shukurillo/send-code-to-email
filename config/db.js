const { default: mongoose } = require("mongoose")

const connectdb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDb connected To ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectdb