const authorize=(...allowedRoles)=>{
    
    console.log("Allowed Roles:", allowedRoles);
  
    return (req,res,next)=>{
      console.log("User Role:", req.user?.role); // Debugging
      console.log("Allowed Roles:", allowedRoles); // Debugging

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ msg: " Access dined" });
      }
      next();
    }
}

module.exports=authorize;