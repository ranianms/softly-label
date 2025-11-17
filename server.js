const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); 

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/softlylabel', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Order Schema
const orderSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    country: String,
    city: String,
    address: String,
    zip: String,
    delivery: String,
    paymentMethod: String,
    cartItems: [
        {
            name: String,
            price: Number,
            quantity: Number,
            img: String
        }
    ],
    subtotal: Number,
    shippingPrice: Number,
    total: Number,
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

// Routes
app.post('/api/checkout', async (req, res) => {
    try {
        const orderData = req.body;
        // map items → cartItems
        if (orderData.items) {
            orderData.cartItems = orderData.items;
            delete orderData.items;
        }
        const newOrder = new Order(orderData);
        await newOrder.save();

        res.status(200).json({ message: "Order placed successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error. Order could not be saved." });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
