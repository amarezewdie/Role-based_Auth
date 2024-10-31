const express=require('express');
const authMiddleware = require('../middleWare/authMiddleware');
const authorize = require('../middleWare/roleMiddleware');
const router=express.Router()

router.route('/admin').get(authMiddleware,authorize('admin'),(req,res)=>{
    
      if (!req.user || !req.user.username) {
        return res.status(400).json({ message: "User not authenticated" });
      }
    res.status(200).json({msg:`WElcome ${req.user.username} to your admin page`});  

})
router.route("/manager").get(authMiddleware,authorize('admin','manager'), (req, res) => {
      console.log("User Role:", req.user.role); 
   
  if (!req.user || !req.user.username) {
    return res.status(400).json({ message: "User not authenticated" });
  }
  res
    .status(200)
    .json({ msg: `WElcome ${req.user.username} to your manager page` });
});
router.route('/user').get(authMiddleware,authorize('admin','manager','user'),(req,res)=>{
      if (!req.user || !req.user.username) {
        return res.status(400).json({ message: "User not authenticated" });
      }
   res
     .status(200)
     .json({ msg: `WElcome ${req.user.username} to your user page` }); 
})


module.exports=router

