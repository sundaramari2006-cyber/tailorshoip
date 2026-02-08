const express=require("express");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const User=require("../models/User");

const router=express.router();

router.post("/register",async(req,res)=>{
    const {name,email,password}=req.body;
    const hashed=await bcrypt.hash(password,10);
    await User.create({name,email,password:hashed});
    res.json("Registered")
})

router.post("/login",async()=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user) return res.status(400).json("User not found");

    const match=await bcrypt.compare(password,user.password);
    if(!match) return res.status(400).json("Wrong password");

    const token = jwt.sign({email:user.email},"secret");
    res.json({token,user});
})
module.exports=router;
