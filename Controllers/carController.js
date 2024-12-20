const carModel = require("../Models/carModel");

const addCarController = async(req,res)=>{
    try{
        const {name,brand,model,pricePerDay} = req.body;
        //validation
        if(!name || !brand || !model || !pricePerDay){
            return res.status(500).json({message:"Provide all fields"})
        }


        const car = new carModel({
            name,
            brand,
            model,
            pricePerDay
        })
        await car.save();
        res.status(201).json({ message: 'Car added successfully', car });
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error in Add Car Api....", error })
    }
}


const getAllCarController = async(req,res)=>{
    try{
        const car = await carModel.find()
        if(!car){
            return res.status(500).json({message:"Cars not found.."})
        }
        res.status(200).json({TotalCars:car.length,car})
    }

    catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error in Get All Car Api....", error })
    }
}

const updateCarController = async(req,res)=>{
    try{
        const Id = req.params.id
        if(!Id)
            return res.status(404).send({message:"Car id is not available"})

        const car = await carModel.findById(Id)
        if(!car)
            return res.status(404).send({messaeg:"No car Found"})

        //update car
        const updatecar= await carModel.findByIdAndUpdate(Id,req.body,{new:true})
        res.status(200).send({message:"Updated Car",updatecar})
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error in update Car Api....", error })
    }
}


const deleteCarController = async(req,res)=>{
        try{
            const Id = req.params.id
            if(!Id)
                return res.status(404).send({message:"Car id is not available"})
    
            const car = await carModel.findById(Id)
            if(!car)
                return res.status(404).send({messaeg:"No car Found"})
    
            //delete car
            const deletedcar= await carModel.findByIdAndDelete(Id)
            res.status(200).send({message:"deleted Car",deletedcar})
        }
    
    catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error in delete Car Api....", error })
    }
}


module.exports = {addCarController,
                  getAllCarController,
                  updateCarController,
                  deleteCarController}