const express =require('express');
const connectDb = require('./config');
require('dotenv').config();
const userRoute=require('./routes/userRoute')
const app=express();
const authRoute=require('./routes/authRoute');
//builtin  middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//route middleware
app.use('/api/auth',authRoute)
app.use('/api/users',userRoute);

//db call
connectDb()
const port=process.env.PORT ||8000

app.listen(port,(req,res)=>{
    console.log(`server running on port ${port}`);
})