const express = require("express");
const User = require("../model/User");
const {protect} = require("../middleware/authMiddleware");


const router = express.Router();


// route get /api/admin/users
// desc get all users (admin only)
//access Private/admin
router.get("/", protect, async(req, res)=>{
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error")
    }
});



//route post /api/admin/users
// desc add a new user (admin only)
// access Private/Admin 
router.post("/", protect, async(req, res)=>{
    const {username, email, password, role} = req.body;
    try {
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({message: "User already Exists."});
        }

        user = new User({
            username: username,
            email,
            password,
            role:role || "customer", 
        });

        await user.save();
        res.status(201).json({message: "User Created Successfully!", user});
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error!")
    }
});



//route put /api/admin/users/:id
// desc route update user information (admin only) : name, email and role 
//access private/admin
router.put("/:id", protect, async(req, res)=>{
    try {
       const user = await User.findById(req.params.id);
       if(user){
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.role = req.body.role || user.role;
       } 

       const updatedUser = await user.save();
       res.status(201).json({message: "User Updated Successfylly!", user: updatedUser});
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error")
    }
});




//route Delete /api/admin/users/:id
// desc delete a user 
// access priv"?ate/admin
router.delete("/:id", protect, async(req, res)=>{
    try {
        const user = await User.findById(req.params.id);
        if(user){
           await user.deleteOne();
           res.json({message: "User Deleted Successfully!"}); 
        }else{
            res.status(404).json({message: "User not found!"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error")
    }
})







module.exports = router;