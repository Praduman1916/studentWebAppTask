const mongoose = require('mongoose')
const connectDB = async () => {
    try {
        const conn =await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log((`Database cnnected:${conn.connection.host}`))
    }
    catch (err) {
        console.log(`Error :${err}`)
        process.exit();
    }
}
module.exports=connectDB;