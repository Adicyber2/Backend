
const userModel = require("../models/user.models")
const crypto=require('crypto')
const jwt = require("jsonwebtoken")


async function registerController(req,res){

    const {email,username,bio,password,profileImage} =req.body

    // const isuserExist=await userModel.findOne({email})
    // if(isuserExist){
    //     return res.status(409).json({
    //         message:"user is already exist in this email"
    //     })
    // }

    // const isuserName=await userModel.findOne({username})
    // if(isuserName){
    //     return res.status(409).json({
    //         message:"User name is already exiest"
    //     })
    // }

    const isUserAlreadyExist= await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(isUserAlreadyExist){
        return res.status(409).json({
            message:"User already exists" 

        })
    }

   const hash=crypto.createHash('sha256').update(password).digest('hex')
    const user = await userModel.create({
        username,email,password:hash,bio,profileImage
    })

    const token=jwt.sign({
        id:user._id
    },process.env.JWT_SECRET,{expiresIn:"1d"})
    res.cookie("token",token)

    res.status(201).json({
        message:"user register successfully",
        user:{
            email:user.email,
            username:user.username,
            boi:user.bio,
            profileImage:user.profileImage

        }
    })

}

async function loginController(req,res){
    const {email,password,username}=req.body

    /**
     * username
     * password
     * 
     * email
     * password
     */

    const user= await userModel.findOne({
        $or:[
            {
                username:username
            },
            {
                email:email
            }
        ]
    })
    if(!user){
        res.status(404).json({
            message:"User not found"
        })
    }
    const hash=crypto.createHash('sha256').update(password).digest('hex')

    const ispasswordValid=hash==user.password
    if(!ispasswordValid){
        res.status(401).json({
            message:"password invalid"
        })
    }

    const token=jwt.sign({
        id:user._id
    },process.env.JWT_SECRET,{expiresIn:"1d"})
    res.cookie("token",token)

    res.status(201).json({
        message:"user is logged in",
        user:{
            uesrname:user.username,
            email:user.email,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })
}

module.exports={
    registerController,
    loginController
}