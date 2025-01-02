const express = require("express");
const { revenueByCarController, 
        bookingStatusController, 
        mostrentedController} = require("../Controllers/analyticsController");
const { verifyToken, isadmin } = require('../Middlewares/authMiddleware');


 const router = express.Router();


 //most rented cars   Top 5
 router.get('/most-rented-cars',mostrentedController) 

 //ravenue by car (revanue per car)
 router.get('/revenue-by-car',revenueByCarController)

 //booking status summary || status count 
 router.get('/booking-status-count',bookingStatusController)

 

module.exports = router 