const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const User = require("../models/User");
const auth = require("../middleware/auth");

// Get all orders for the current user
router.get("/my-orders", auth, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.userId }).sort({ orderDate: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: "Server error fetching orders" });
    }
});

// Create a new order
router.post("/create", auth, async (req, res) => {
    const { items, totalAmount, paymentMethod, shippingAddress, userName } = req.body;
    try {
        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }
        const newOrder = new Order({
            userId: req.userId,
            items,
            totalAmount,
            paymentMethod,
            shippingAddress,
            userName,
        });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (err) {
        console.error("Order creation error:", err);
        res.status(500).json({ message: err.message || "Server error creating order" });
    }
});

// Get user profile data
router.get("/profile", auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Server error fetching profile" });
    }
});

// Update user profile data
router.put("/profile/update", auth, async (req, res) => {
    const { name, phone, address } = req.body;
    try {
        const user = await User.findByIdAndUpdate(
            req.userId,
            { name, phone, address },
            { new: true }
        ).select("-password");
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Server error updating profile" });
    }
});

module.exports = router;
