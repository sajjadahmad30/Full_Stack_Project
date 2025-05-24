const express = require("express");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const {protect} = require('../middleware/authMiddleware')


const router = express.Router();

//route Post api/users/register
//desc register a new user
//access public
router.post("/register", async (req, res)=>{
    const {username , email, password} = req.body;

    try {
        
        let user = await User.findOne({email});

        if(user) return res.status(400).json({message: "User is already exists."});

        user = new User({username, email, password});
        await user.save();

        // create jwt payload
        const payload = {user:{id: user._id, role: user.role}};

        // sign and return the token along with user data 
        jwt.sign(payload, process.env.JWT_SECRET,{expiresIn:"40h"}, (err, token)=>{
            if(err) throw err;

            // send the user and token in response 
            res.status(200).json({
                user:{
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                },
                token,
            })
        })

    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error!")
    }
});



// rotue POST api/user/login
// desc Authenticate user
// access public
router.post("/login", async (req, res)=>{
    const {email, password} = req.body;

    try {
        // find the user by email 
        let user = await User.findOne({email});

        if(!user) return res.status(400).json({message: "Invalid Credential!"});
        const isMatch = await user.matchPassword(password);

        if(!isMatch)
            return res.status(400).json({message: "Invalid Credential!"});
        
         // create jwt payload
        const payload = {user:{id: user._id, role: user.role}};
        
        // sign and return the token along with user data 
        jwt.sign(payload, process.env.JWT_SECRET,{expiresIn:"40h"}, (err, token)=>{
            if(err) throw err;
        // send the user and token in response 
        res.json({
                user:{
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                },
                token,
            })
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("Sever Error")
    }
});



//route Get /api/user/profile
// desc Get logged-in user's profile (Protected Route)
// access private
router.get("/profile", protect ,async(req, res)=>{
    res.json(req.user)
})

module.exports = router;