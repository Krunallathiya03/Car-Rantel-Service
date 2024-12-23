const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const userModel = require('../Models/userModel')


// *********************************Register User*******************************************

const registerController = async (req,res) => {
    try {
        const { username, email, password, role } = req.body

        //validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please Provide all Fields..." })
        }

        //check user
          const existingUser = await userModel.findOne({ email })
          if(existingUser){
            return res.status(400).json({message:"You are already Register...."})
          }

          //hash password
          const hash = await bcrypt.hash(password,10)

          //create user
           const user = await userModel.create({
            username,
            email,
            password:hash,
            role
          })
          await user.save();
          res.status(201).send({message:"Sucessfully Registered......",user})
          
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error in regester Api....", error })
    }
}

// ****************************************Login*********************************************

const loginController = async (req,res)=>{
    try{
        const {username,password} = req.body;   

        //validation
        if(!username || !password){
            return  res.status(400).send({ message: "Feilds are  required...." });
        }

        //check user
        const user = await userModel.findOne({ username })
        console.log(user)
        if (!user) {
            return res.status(404).send({ message: "User not found..." })
        }

        //compare password || check password

        const ismatch = await bcrypt.compare(password, user.password)
        if(!ismatch){
            return  res.status(400).send({message:"Your password are not matched"});
        }

        //token
        const token = JWT.sign({id:username._id , role:user.role, email:user.email},process.env.TOKEN)

        res.status(200).send({message:"login sucessfully....",token,user})
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error in Login Api....", error })
    }
}

module.exports = {registerController,loginController}