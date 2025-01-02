const mongoose = require('mongoose')


const carSchema = new  mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    model:{
        type:String,
        required:true
    },
    pricePerDay:{
        type:Number,
        required:true
    },
    availability:{
        type:Boolean,
        default:true
    },
    bookings:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"Booking"
        }
    ]
    
},{timestamps:true})


module.exports = mongoose.model('Car',carSchema)