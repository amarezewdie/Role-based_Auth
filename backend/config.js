const mongoose=require('mongoose');

const connectDb=async(req,res)=>{
 try {
    await mongoose.connect(process.env.MONG_URL);
    console.log(`db connected`);
 } catch (error) {
    console.log(error)
    process.exit(1);
 }
}
module.exports=connectDb;