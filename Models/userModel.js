const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    
    email:{
        type:String,
        require:true,
        unique:true
    },

    password:{
        type:String,
        require:true
    },

    role:{
        type: String, 
        enum: ['admin', 'customer'], 
        default: 'customer' 
    }
    
},{timestamps:true})


module.exports = mongoose.model('User',userSchema)