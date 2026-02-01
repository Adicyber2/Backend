
const mongoose=require("mongoose")


function connectToDb(){
    mongoose.connect("mongodb+srv://adityadeshmukh1404_db_user:xNqodYeiLhLjk8tS@cluster0.qisbbv3.mongodb.net/")
    .then(()=>{
        console.log("connected to the Database");
        
    })
}

module.exports=connectToDb
