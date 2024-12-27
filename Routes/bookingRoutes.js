const express = require('express');
const { createBookingController, 
        getAllBookingController, 
        getUserBookingController, 
        cancelBookingController } = require('../Controllers/bookingController');
const { verifyToken, isadmin } = require('../Middlewares/authMiddleware');

const router = express.Router();

//Costomer Routes
router.post('/create',verifyToken,createBookingController)

//get user's booking (users  specific...)
router.get('/bookings',verifyToken,getUserBookingController)

//cancel Booking
router.delete('/delete/:id',verifyToken,cancelBookingController)


//Admin Route
router.get('/',verifyToken,isadmin,getAllBookingController)

  
module.exports = router;