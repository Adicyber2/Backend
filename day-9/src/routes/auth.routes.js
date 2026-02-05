const express=require("express")
const userModel=require("../models/user.model")
const authRouter=express.Router()



authRouter.post("/register",async(req,res)=>{
    const{email,name,password}=req.body

    const isUserAlreadyexists=await userModel.findOne({email})

    if(isUserAlreadyexists){
        return res.status(400).json({
            message:"User already exists in this email"
        })
    }
    await userModel.create({
        email,name,password
    })

    res.status(201).json({
        message:"connected database"
    })
})

module.exports=authRouter
