const express = require("express");
const Order = require("../model/Order");
const { protect, admin } = require("../middleware/authMiddleware");


const router  = express.Router();


// route get /api/admin/orders
// desc get all order (admin only)
// access private/admin 
router.get('/', protect, admin, async(req, res)=>{
    try {
        const orders = await Order.find({}).populate("user", "name email");
        res.json(orders)
    } catch (error) {
        console.log(error);
        res.status(500).json("Server Error")
    }
});


//route get /api/admin/orders/:id
// desc update order status (admin only)
// access private/admin 
router.put("/:id", protect, admin , async(req, res)=>{
    try {
        const order = await Order.findById(req.params.id);
        if(order){
            order.status = req.body.status || order.status;
            order.isDelivered = req.body.status === "Delivered" ? true : order. isDelivered;
            order.deliveredAt = req.body.status === "Delivered" ? Date.now() : order.deliveredAt;
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        }else{
            res.status(404).json({message: "Order not found!"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json("Server Error");
    }
});


//route delete /api/admin/orders/:id
// desc delete order (only admin)
// access private/admin 
router.delete("/:id", protect, admin, async(req, res)=>{
    try {
        const order = await Order.findById(req.params.id);
        if(order){
            await order.deleteOne();
            res.json({message: "order deleted successfully!"});
        }else{
            res.status(404).json({message: "order not found!"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json("Server Error!"); 
    }
})



module.exports = router;