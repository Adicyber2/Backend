const express= require("express")
const app=express()

app.get('/',(req,res)=>{
    res.send("hello world")
})

app.get('/about',function(req,res){
    res.send("THIS IS ABOUT PAGE")
})

app.get('/home',(req,res)=>{
    res.send("This is Home Page")
})


app.listen(3000)

