const mongoose = require("mongoose")

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"User name already exist"],
        required:[true,"Username is required"]
    },
    email:{
        type:String,
        unique:[true,"Email is already exist"],
        required:[true,"Enter your email is"]
    },
    password:{
        type:String,
        required:[true,"Enter your password"]
    },
    bio:String,
    profileImage:{
        type:String,
        
    }
})

const userModel=mongoose.model("insta",userSchema)

module.exports=userModel