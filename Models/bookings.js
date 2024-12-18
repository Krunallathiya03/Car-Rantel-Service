const mongoose = require('mongoose')


const bookingSchema = new mongoose.Schema({
    carId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Car"
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    startDate:Date(),

    endDate:Date(),

    totalAmount:{
        type:Number
    },

    status:{
        type:String,
        enum:['confirmed','complete','canceled'],
        default:"confirmed"

    }
},{timestamps:true})

module.exports = mongoose.model('Booking',bookingSchema)