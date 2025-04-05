const { default: mongoose } = require("mongoose")

require("dotenv").config()

const connectToDb = async() =>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('Db is connected')
    } catch (error) {
        console.log("error on when connected to db" , error)
    }
}

module.exports ={connectToDb}