const JWT = require('jsonwebtoken')

const verifyToken = (req,res,next)=> {
    const token = req.headers['authorization'];
    if(!token){
        return res.status(403).json({message:"token not provided...."})
    }
    try{
        const decoded = JWT.verify(token,process.env.ACCESS_TOKEN)
        req.user = decoded;
        next();
    }
    catch(error){
        res.status(401).json({message:"Unauthorized",error})
    }
    
}

//

const isadmin = (req,res,next)=>{
    if(req.user.role !== 'admin'){
        return res.status(403).json({error:"Access Denied"})
    }
    next();
}
module.exports = {verifyToken, isadmin}