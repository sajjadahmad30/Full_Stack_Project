const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const userRoutes = require('./routes/userRoutes');
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");



const app = express();
app.use(express.json());
app.use(cors());


dotenv.config();

const PORT = process.env.PORT  || 3000;

// connect mongodb
connectDB();

app.get("/", (req, res)=>{
    res.send("WELCOME TO RABBIT API!");
});

// API routes 
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is runing on http://localhost:${PORT}`);
})