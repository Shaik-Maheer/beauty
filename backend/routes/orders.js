const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const auth = require("../middleware/auth");

// Get all orders for the current user
router.get("/orders", auth, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.userId }).sort({ orderDate: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: "Server error fetching orders" });
    }
});

// Create a new order
router.post("/orders", auth, async (req, res) => {
    const { products, totalAmount, paymentMethod, shippingAddress, userName } = req.body;
    try {
        if (!products || products.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const newOrder = new Order({
            userId: req.userId,
            items: products, // Standardizing to 'items' in model, but user sent 'products'
            totalAmount,
            paymentMethod,
            shippingAddress,
            userName,
            status: "Placed",
            orderDate: new Date()
        });

        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (err) {
        console.error("Order creation error:", err);
        res.status(500).json({ message: err.message || "Server error creating order" });
    }
});

module.exports = router;
