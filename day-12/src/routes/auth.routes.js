const express =require("express")
const authController = require("../controllers/auth.controllers")
const authRouter=express.Router()

// register Rest api
authRouter.post("/register",authController.registerController)

authRouter.post("/login",authController.loginController)

module.exports=authRouter