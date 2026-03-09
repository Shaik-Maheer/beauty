const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productId: String,
  name: String,
  image: String,
  price: Number,
});

module.exports = mongoose.model("Wishlist", wishlistSchema);
