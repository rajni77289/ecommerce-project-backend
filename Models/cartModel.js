const mongoose = require("mongoose");
const productschema = new mongoose.Schema(
    {
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
        quantity: {
            type: Number,
            default: 1,
        },

    },
    {
        timestamps: true,
    }
)
const Cart = mongoose.model("cart", productschema)

module.exports = Cart;