const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [
        {
            productId: String,
            name: String,
            image: String,
            price: Number,
            quantity: Number,
        },
    ],
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    status: { type: String, default: "Processing" },
    orderDate: { type: Date, default: Date.now },
    shippingAddress: String,
    userName: String,
});

module.exports = mongoose.model("Order", orderSchema);
