const bookingsModel = require('../Models/bookingsModel')
const carModel  = require('../Models/carModel')


//most rented cars
const mostrentedController = async (req,res)=>{
    try{
        const mostrented = await bookingsModel.aggregate([
            
        ])
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error in most renred car  Api....", error })
    }
}