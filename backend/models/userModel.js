const mongoose=require('mongoose');

const userSchema= mongoose.Schema({
    username:{
        type:String,
        required:[true,'name is required'],
        unique:[true,'already exist']
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    role:{
        type:String,
        required:true,
        enum:['admin','manager','user'],
        default:"user"
    }
})
module.exports=mongoose.model('User',userSchema);
