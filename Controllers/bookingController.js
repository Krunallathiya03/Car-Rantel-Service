const bookingsModel = require("../Models/bookingsModel");
const carModel = require("../Models/carModel");



//Create a new  Booking 
const createBookingController = async (req,res) =>{
    //console.log(req.body)
    try{
        const {carId,startDate,endDate}= req.body;

        //check car is aveilable or not
        const car = await carModel.findById(carId)
            if(!car || !car.availability){
                return res.status(404).json({message:"Car Not Available for Booking......"})
            }

        //calculate number of rental days
        const start = new Date(startDate)
        const end =  new Date(endDate)
        const totalDays = Math.ceil((end - start)/(1000*60*60*24))

        if(totalDays <= 0){
            return res.status(400).json({message:" Invalid booking date"})
        }

        //calculate total amount
        const totalAmount = totalDays * car.pricePerDay

        //create booking
        const booking = new bookingsModel({
            carId,
            userId: req.body.userId,
            startDate,
            endDate,
            totalAmount
        })
        await booking.save();

        //update car avalibility
        car.availability = false
        await car.save();

        res.status(201).json({message:"Booking successfully....",booking})
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error in Create Booking Api....", error })
    }
}

//Get all Bookings (Admin)
const getAllBookingController = async (req,res)=>{
    try{
        const bookings = await  bookingsModel.find().populate('carId userId','name brand email') 
        res.status(201).json({totalBookings:bookings.length,bookings})
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error in Get all Booking (Admin) Booking Api....", error })
    }
    
}


// get user-specific Booking
const getUserBookingController = async (req,res)=>{
    try{
        const bookings = await bookingsModel.find({userId:req.body.userId}).populate('carId', 'name brand')
        res.status(201).json({booking:bookings.length,bookings})
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error in Create Booking Api....", error })
    }
}

//Cancel Bookings
const cancelBookingController = async (req,res) =>{
    try{
        const{Id} = req.params;

        const booking = await  bookingsModel.findById({Id})
        if(!booking){
            res.status(404).json({message:"Booking not found..."})
        }
        
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error in Create Booking Api....", error })
    }
    
}



module.exports = {createBookingController,
                  getAllBookingController,
                  getUserBookingController,
                  cancelBookingController}