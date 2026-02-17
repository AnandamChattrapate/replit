// jwt verification
// ckecks if a user is logged in by verifying a token
import jwt from 'jsonwebtoken'

export const verifyToken=async(req,res,next)=>{
    // get token 
    const authHeader=req.headers["authorization"];
    let token=authHeader && authHeader.split(" ")[1] // bearer token
    if (!token && req.cookies?.token) {
    token = req.cookies.token;
  }
    if (!token){
        return res.status(401).json({message: "no token found "})

    }

    try{
        // verify token
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        console.log("middleware1")
        req.userId=decoded.userId;
        console.log(req.userId)
        console.log("middleware2")

// req.user = { _id: decoded.userId };
next();
    }catch(err){
        return res.status(403).json({message:"invalid token  "})
    }
}
