
const jwt=require('jsonwebtoken');


const authMiddleware=(req,res,next)=>{
       try {
        
         const authHeader = req.header("Authorization");
         if (!authHeader || !authHeader.startsWith("Bearer ")) {
           return res.status(400).json({ msg: "not auth no token" });
         }
         const token = authHeader.split(" ")[1];
          const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
          req.user=decoded;
          console.log("Decoded User:", req.user);
          next();

       } catch (error) {
          return res.status(403).json({ msg: "Invalid or expired token" });
       }
}
module.exports=authMiddleware;