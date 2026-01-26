const express=require("express")

let app=express()

app.use(express.json())
const notes=[]

// post
app.post("/notes",(req,res)=>{
    notes.push(req.body)
    
    res.status(201).json({
        
    })
})

// get notes

app.get("/notes:bhava",(req,res)=>{
    res.status(200).json({
        notes:notes
    })
})

// patch  notes

app.patch("/notes:index",(req,res)=>{
    notes[req.params.index]
})
module.export=app
