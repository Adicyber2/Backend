const express=require("express")
const userModel=require("../models/user.model")
const jwt=require("jsonwebtoken")
const authRouter=express.Router()

// Crypto is prebuild function 
const crypto=require("crypto")


authRouter.post("/register",async(req,res)=>{
    const{email,name,password}=req.body

    const isUserAlreadyexists=await userModel.findOne({email})

    if(isUserAlreadyexists){
        return res.status(409).json({
            message:"User already exists in this email"
        })
    }

    const hash=crypto.createHash("md5").update(password).digest("hex")

   const user= await userModel.create({
        email,name,password:hash
    })

    const token=jwt.sign({
        id:user._id,
        email:user.email
    },
    process.env.JWT_SECRET
)
    res.cookie("jwt_token",token)

    res.status(201).json({
        message:"user registered",
        user,
        token
    })
})

authRouter.post("/protected",(req,res)=>{
    console.log(req.cookies);

    res.status(201).json({
        message:"this is protected routes"
    })
    
})


authRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body

    const user=await userModel.findOne({email})
    if(!user){
        return res.status(404).json({
            message:"user is not found"
        })
    }

    const ispasswordMatched=user.password===crypto.createHash("md5").update(password).digest("hex")
    if(!ispasswordMatched){
        return res.status(401).json({
            message:"invalid password"
        })
    }

    const token=jwt.sign({
        id:user._id,

    },process.env.JWT_SECRET)
        res.cookie("jwt_token",token)

    res.status(201).json({
        message:"user logged in",
        user,
        token
    })


})

module.exports=authRouter
