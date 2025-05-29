const express = require('express');
const Product = require("../model/Product");
const {protect, admin} = require("../middleware/authMiddleware");

const router = express.Router();

//route get /api/admin/products
// desc get all products (admin only)
// access private/admin
router.get("/", protect, admin , async(req, res)=>{
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
} );


module.exports = router;
