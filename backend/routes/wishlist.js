const express = require("express");
const Wishlist = require("../models/Wishlist");
const auth = require("../middleware/auth");

const router = express.Router();

// Add to wishlist
router.post("/", auth, async (req, res) => {
  const { productId, name, image, price } = req.body;

  try {
    const newItem = await Wishlist.create({
      userId: req.userId,
      productId,
      name,
      image,
      price,
    });
    res.json(newItem);
  } catch (err) {
    console.error("❌ Add to Wishlist Error:", err);
    res.status(500).json({ msg: "Error adding to wishlist" });
  }
});

// Get wishlist
router.get("/", auth, async (req, res) => {
  try {
    const items = await Wishlist.find({ userId: req.userId });
    res.json(items);
  } catch (err) {
    console.error("❌ Error fetching wishlist:", err);
    res.status(500).json({ msg: "Error fetching wishlist" });
  }
});

// Delete from wishlist
router.delete("/:id", auth, async (req, res) => {
  try {
    await Wishlist.deleteOne({ _id: req.params.id, userId: req.userId });
    res.json({ msg: "Removed from wishlist" });
  } catch (err) {
    console.error("❌ Error deleting wishlist item:", err);
    res.status(500).json({ msg: "Error deleting item" });
  }
});

module.exports = router;

