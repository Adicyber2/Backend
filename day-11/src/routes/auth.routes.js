const express =require("express")
const userModel = require("../models/user.models")
const authRouter = express.Router()
const crypto = require('crypto')
const jwt =require('jsonwebtoken')

authRouter.post("/register",async(req,res)=>{

     const {name,email,password}=req.body

    const isUserExist =await userModel.findOne({email})
    if(isUserExist){
        res.status(409).json({
            message:"user already exist"
        })
    }

   

    const user =await userModel.create({
        name,
        email,
        password:crypto.createHash('sha256').update(password).digest('hex')
    })

    const token =jwt.sign({
        id:user._id,
        
    },process.env.JWT_SECRET,{expiresIn:"1h"})

    res.cookie("token",token)

    res.status(201).json({
        message:"user Register Successfully",
        user
    })

})

authRouter.get("/get-me",async(req,res)=>{
    const token = req.cookies.token
   const decoded= jwt.verify(token,process.env.JWT_SECRET)

   const user = await userModel.findById(decoded.id)

   res.json({
    name:user.name,
    emaii:user.email,
   })

   console.log(decoded);
   
})

authRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body

    const user =await userModel.findOne({email})
    if(!user){
        res.status(404).json({
            message:"uesr email is not found"
        })
    }

    const hash=crypto.createHash('sha256').update(password).digest('hex')

    const isPassword = hash === user.password
    if(!isPassword){
        res.status(401).json({
            message:"password is not matched"
        })
    }

    const token = jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET,{expiresIn:"1h"})

    res.cookie("token",token)

    res.status(201).json({
        message:"user logged in",
        user:{
            name:user.name,
            email:user.email      
      }
    })
    
})

module.exports=authRouter