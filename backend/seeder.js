const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./model/Product');
const User = require("./model/User");
const Cart = require("./model/Cart");
const products = require("./data/products");


dotenv.config();

// connect to mongodb 
mongoose.connect(process.env.MONGO_URI);


//function to seed the data

const seedData  = async()=>{
    try {
        // clear existing data
        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany();

        // create a default admin user
        const createdUser = await User.create({
            username: "Admin User",
            email: "admin@example.com",
            password: "123456",
            role: "admin",
        });
        
        //Assign the default user id to each product
        const userID = createdUser._id;

        const sampleProducts = products.map((product)=>{
            return {...product, user: userID};
        });
        

        // insert the products in to the database 
        await Product.insertMany(sampleProducts);
        
        console.log("Product data Seeded successfully!");
        process.exit();
    } catch (error) {
        console.error("Error Seeding the data", error);
        process.exit(1);
    }
}

seedData();