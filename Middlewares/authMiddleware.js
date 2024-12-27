const JWT = require('jsonwebtoken')

const verifyToken = (req,res,next)=> {
    try{
        //get token
        const token = req.headers["authorization"].split(" ")[1]
        JWT.verify(token,process.env.TOKEN,(err,decode)=>{
            if(err){
                return res.status(401).send({message:"Unauthorize User"})
            }
            else{
              //  console.log(decode);
                req.user = decode
                next();
            }
        })
    }
    catch(error){
        res.status(500).send("Error in middleware api...",error)
    }
}


//

const isadmin = (req,res,next)=>{

    if(!req.user){
        return res.status(401).json({error:"unothorized: user not authenicate"})
    }

    if(req.user.role !== 'admin'){
        return res.status(403).json({error:"Access Denied , Only admin can add car"})
    }
    next();
}
module.exports = {verifyToken, isadmin}