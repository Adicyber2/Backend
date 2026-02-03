const express=require("express")
const noteModel=require("./models/notes-model")

const cors=require("cors")

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static("./public"))

const path=require("path")
const { log } = require("console")
const filePath = path.join("src", "controllers", "user.js");


app.post('/api/notes',async (req,res)=>{
    const{title,description}=req.body

  const note= await noteModel.create({
        title,description 
    })

    res.status(201).json({
        message:"note created successfully",
        note
    })
})

// fetch api

app.get("/api/notes",async(req,res)=>{

    // .find is used ye sare databse ka data leke aajayegi
   const notes= await noteModel.find()

   res.status(200).json({
    message:"notes fetch sucsseccfully",
    notes
   })
})

// delete api

app.delete("/api/notes/:id",async(req,res)=>{
    const id =req.params.id

   await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message:"note deleted successfully",
       
    })
    
})

/**
 * -PATCH/api/notes/:id
 * update the description of the notes by id
 * req.body={description}
 */

app.patch("/api/notes/:id",async (req,res)=>{
    const id =req.params.id
    const { description }=req.body

    await noteModel.findByIdAndUpdate(id,{ description })

    res.status(200).json({
        message:"notes update successfully"
    })
})

console.log(__dirname)
app.use('*name',(req,res)=>{
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
})

module.exports= app