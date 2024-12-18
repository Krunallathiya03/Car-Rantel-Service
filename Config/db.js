const mongoose = require("mongoose")

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected Sucessfully.....")
    }
    catch(error){
        console.log("Database Connection Failed.....")
    }
}


module.exports = connectDB;