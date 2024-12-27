const express = require("express");


 const router = express.Router();


 //most rented cars   Top 5
 router.get('./most-rented-cars') 


 //ravenue by cat (revanue per car)
 router.get('./revenue-by-car')

 //ravenue by month
 router.get('./revenue-by-month')

 //booking status summary || status count 
 router.get('./booking-status-count')

 

module.exports = router 