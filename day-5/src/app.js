const express=require("express")

let app=express()

// we can use the middleware {app.use(express.json())} to get data from the server 
app.use(express.json())

const notes=[]

app.get("/",(req,res)=>{
    res.send("connection is done")
})

// post mathod server pe kuch bhejna ho to use karte hai
 app.post("/notes",(req,res)=>{
    notes.push(req.body)
    console.log(notes);
    res.send("connection sucssessfully")
    
 })

//  Get method we can use to get the data from server to frond end
 app.get("/notes",(req,res)=>{
    res.send(notes)
 })

module.exports=app