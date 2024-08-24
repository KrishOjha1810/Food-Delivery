//when user sends data he'll send the token to authenticate himself to decode it we'll write middleware
import jwt from "jsonwebtoken";
// import 'dotenv/config.js';

const authMiddleware = async(req,res,next)=>{//this middleware will take the token convert it to user idusing that user id we can add,remove or get data from
    const {token} =req.headers;
    
    if(!token) {
        return res.json({success:false,message:"Not Authorized Login Again"})
    }
    try {
        const token_decode =jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId = token_decode.id;//when token was created it was created using id when we decode it it'll give us the id
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export default authMiddleware;