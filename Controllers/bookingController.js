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
        const bookings = await  bookingsModel.find().populate('carId userId','name brand email username') 
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
        console.log(req.userId)
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error in Create Booking Api....", error })
    }
}

//Cancel Bookings
const cancelBookingController = async (req,res) =>{
    try{
        const{id} = req.params;
       // console.log(id);
        

        // Validate booking ID
        if(!id){
            return res.status(400).json({message:"Booking ID is required"})
        }

        // Find booking first without deleting
        const booking = await bookingsModel.findById(id);
        if(!booking){
            return res.status(404).json({message:"Booking not found..."})
        }

        // Check if user owns this booking using req.user from auth middleware
        // if(booking.userId.toString() !== req.user._id.toString()){
        //     return res.status(403).json({message:"You can cancel only your own booking"})
        // }

        // Update car availability first
        const car = await carModel.findById(booking.carId)
        if(car){
            car.availability = true
            await car.save();
        }

        // Then delete the booking
        const deletedBooking = await bookingsModel.findByIdAndDelete(id);
        if(!deletedBooking){
            return res.status(500).json({message:"Error deleting booking"})
        }

        res.status(200).json({
            success: true,
            message:"Booking cancelled successfully",
            deletedBooking
        })
        
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ 
            success: false,
            message: "Error in cancel Booking API", 
            error: error.message 
        })
    }
}



module.exports = {createBookingController,
                  getAllBookingController,
                  getUserBookingController,
                  cancelBookingController}