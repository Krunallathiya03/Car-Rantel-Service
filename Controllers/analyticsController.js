const bookingsModel = require('../Models/bookingsModel')
const carModel  = require('../Models/carModel')


//most rented cars
const mostrentedController = async (req,res)=>{
    try{
        const mostrented = await bookingsModel.aggregate([
          
            {
              $group: {
                _id: "$carId",
                bookingCount: {
                  $sum: 1
                }
              }
            },
            {
              $sort: {
                bookingCount: -1
              }
            },
            {
              $limit: 5
            },
            {
              $lookup: {
                from: "cars",
                localField: "_id",
                foreignField: "_id",
                as: "carDetails"
              }
            },
            {
              $unwind: "$carDetails"
            },
            {
              $project: {
                _id: 0,
                carId: "$_id",
                car: "$carDetails.name",
                brand: "$carDetails.brand",
                bookingCount: 1
              }
            }
        ])
        res.status(200).json(mostrented)
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error in most renred car  Api....", error })
    }
} 

const revenueByCarController = async (req,res)=>{
    try{
        const revenue = await bookingsModel.aggregate([
            {
                $match: {
                  status: "confirmed"
                }
              },
              {
                $group: {
                  _id: "$carId",
                  totalRevenue: {
                    $sum: "$totalAmount"
                  }
                }
              },
              {
                $sort: {
                  totalRevenue: -1
                }
              },
              {
                $lookup: {
                  from: "cars",
                  localField: "_id",
                  foreignField: "_id",
                  as: "cardetails"
                }
              },
              {
                $unwind: "$cardetails"
              },
              {
                $project: {
                  _id: 0,
                  car: "$cardetails.name",
                  brand: "$cardetails.brand",
                  totalRevenue: 1
                }
              }
        ])
//      console.log(bookingsModel)
        res.status(200).json(revenue)
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error in most revenue by car  Api....", error })
    }

}

const bookingStatusController = async(req,res)=>{
  try{
    const bookingcount = await bookingsModel.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          status: "$_id",
          count: 1
        }
      }
    ])
    res.status(200).json(bookingcount)
  }
  catch (error) {
    console.log(error)
    res.status(500).send({ message: "Error in most revenue by car  Api....", error })
}
}


module.exports = {mostrentedController,
                  revenueByCarController,
                  bookingStatusController,
}