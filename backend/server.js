const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://admin:admin%40123@ac-dnccwve-shard-00-00.ofvms9j.mongodb.net:27017,ac-dnccwve-shard-00-01.ofvms9j.mongodb.net:27017,ac-dnccwve-shard-00-02.ofvms9j.mongodb.net:27017/portfolio?ssl=true&replicaSet=atlas-ahnz2y-shard-0&authSource=admin&retryWrites=true&w=majority")
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log(err));

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const orderSchema = new mongoose.Schema({
    email: String,
    items: Array
});

const User = mongoose.model("User", userSchema);
const Order = mongoose.model("Order", orderSchema);

// Register
app.post('/register', async (req,res)=>{

    const {email,password}=req.body;

    const user = new User({
        email,
        password
    });

    await user.save();

    res.json({
        message:"User Registered"
    });

});

// Login
app.post('/login', async (req,res)=>{

    const {email,password}=req.body;

    const user = await User.findOne({
        email,
        password
    });

    if(user){

        res.json({
            success:true,
            email:user.email,
            message:"Login Success"
        });

    }else{

        res.json({
            success:false,
            message:"Invalid Credentials"
        });

    }

});

// Checkout
app.post('/checkout', async (req,res)=>{

    const {email,items}=req.body;

    const order = new Order({
        email,
        items
    });

    await order.save();

    res.json({
        message:"Order Placed Successfully"
    });

});

app.listen(5000,()=>{
    console.log("Server running on port 5000");
});
