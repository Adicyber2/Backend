const express=require("express")
 let app =express()


//  express.json() is a middle ware to use get the data using post method

app.use(express.json())

const notes=[
   
]

app.get("/",(req,res)=>{
    res.send("hello world")
})

// notes

app.post("/notes",(req,res)=>{
    console.log(req.body);
    notes.push(req.body)
    console.log(notes);
    
    res.send("note created")
    
})

// get notes
app.get("/notes",(req,res)=>{
    res.send(notes)
})


// delete route
// params
// delete using index in notes array

app.delete("/notes/:index",(req,res)=>{
    delete notes[req.params.index]

    res.send("notes deleted successfully")
    
})

// patch method

app.patch("/notes/:index",(req,res)=>{
    notes[req.params.index].discription=req.body.description
    notes[req.params.index].title=req.body.title

    res.send("note updated successfully")

})
  module.exports=app