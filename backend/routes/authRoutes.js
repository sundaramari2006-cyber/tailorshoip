const express=require("express");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const User=require("../models/User");

const router=express.Router();

router.post("/register", async (req, res) => {
    try {
        console.log("BODY:", req.body);   // 👈 ADD THIS

        const { name, email, password } = req.body;

        if (!password) {
            return res.status(400).json({ message: "Password missing" });
        }

        const hashed = await bcrypt.hash(password, 10);

        await User.create({ name, email, password: hashed });

        res.json("Registered");

    } catch (err) {
        console.log(err);
        res.status(500).json("Server Error");
    }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN BODY:", req.body);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports=router;
