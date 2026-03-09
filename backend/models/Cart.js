const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  name: String,
  image: String,
  price: Number,
  quantity: { type: Number, default: 1 },
});

module.exports = mongoose.model("Cart", cartSchema);
