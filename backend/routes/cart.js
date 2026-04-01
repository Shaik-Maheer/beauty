const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const auth = require("../middleware/auth");

// Get all cart items for a user
router.get("/", auth, async (req, res) => {
    try {
        const items = await Cart.find({ userId: req.userId });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Add item to cart
router.post("/add", auth, async (req, res) => {
    const { productId, name, image, price, quantity } = req.body;
    try {
        let item = await Cart.findOne({ userId: req.userId, productId: String(productId) });
        if (item) {
            item.quantity += quantity || 1;
            await item.save();
        } else {
            item = new Cart({
                userId: req.userId,
                productId: String(productId),
                name,
                image,
                price,
                quantity: quantity || 1,
            });
            await item.save();
        }
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Update item quantity
router.put("/update/:id", auth, async (req, res) => {
    const { quantity } = req.body;
    try {
        const item = await Cart.findOneAndUpdate(
            { _id: req.params.id, userId: req.userId },
            { quantity },
            { new: true }
        );
        if (!item) return res.status(404).json({ message: "Item not found" });
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Remove item from cart
router.delete("/remove/:id", auth, async (req, res) => {
    try {
        const item = await Cart.findOneAndDelete({
            _id: req.params.id,
            userId: req.userId,
        });
        if (!item) return res.status(404).json({ message: "Item not found" });
        res.json({ message: "Item removed" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Clear cart
router.delete("/clear", auth, async (req, res) => {
    try {
        await Cart.deleteMany({ userId: req.userId });
        res.json({ message: "Cart cleared" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
