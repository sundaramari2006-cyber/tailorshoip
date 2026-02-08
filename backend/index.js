const mongoose=require("mongoose")
const cors=require("cors")
const express=require("express")

const app=express()
app.use(express.json())
app.use(cors())

app.listen(3400,()=>{
    console.log("Server running on the port 3400")
})

mongoose.connect("mongodb://localhost:27017//tailorshop").then(()=>console.log("DB connected"))