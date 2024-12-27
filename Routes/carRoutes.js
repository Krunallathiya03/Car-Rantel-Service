const express = require('express');
const { addCarController,
        getAllCarController, 
        updateCarController,
        deleteCarController} = require('../Controllers/carController');
const { verifyToken, isadmin } = require('../Middlewares/authMiddleware');

const router = express.Router();


//Add Car
router.post('/',verifyToken,isadmin,addCarController)

//get all car
router.get('/get',verifyToken,getAllCarController)

//update car
router.put('/update/:id',verifyToken,isadmin,updateCarController)

//delete car
router.delete('/delete/:id',verifyToken,isadmin,deleteCarController)


module.exports = router