
const mongoose=require("mongoose")
const connectToDb=require("./src/config/database")
const app =require("./src/app")

connectToDb()




app.listen(3000,(req,res)=>{
    console.log("connection succssefull");
    
})