const express = require("express");
const Checkout = require("../model/Checkout");
const Cart = require("../model/Cart");
const Product = require("../model/Product");
const Order = require("../model/Order");
const {protect} = require("../middleware/authMiddleware");


const router = express.Router();



//route post /api/checkout
//desc create a new checkout session
//access private
router.post("/", protect, async(req, res)=>{
    const {checkoutItems, shippingAddress, paymentMethod, totalPrice} = req.body;
    
    if(!checkoutItems || checkoutItems.length === 0){
        return res.status(400).json({message: "no items in checkout"});
    }

    try {
        const newCheckout = await Checkout.create({
            user: req.user._id,
            checkoutItems: checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus : "Pending",
            isPaid: false,
        });
        console.log(`Checkout created for user: ${req.user._id}`);
        res.status(201).json(newCheckout);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }

})