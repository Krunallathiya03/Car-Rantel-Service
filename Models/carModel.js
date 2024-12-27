const mongoose = require('mongoose')


const carSchema = new  mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    brand:{
        type:String,
        require:true
    },
    model:{
        type:String,
        require:true
    },
    pricePerDay:{
        type:Number,
        require:true
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