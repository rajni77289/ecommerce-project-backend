// const { default: orders } = require("razorpay/dist/types/orders");
// const { default: orders } = require("razorpay/dist/types/orders");
const Order = require("../Models/orderModel");

// CREATE WEBSITE ORDER:---------------------------------------------
const createwebsiteorder = async (req, res) => {
    try {
        // console.log("REQ USER:", req.user);
        // console.log("REQ BODY:", req.body);
                console.log("CREATE ORDER USER:", req.user);

        const {
            items,
            subtotal,
            shipping,
            tax,
            total,
            address,
            city,
            state,
            pincode,
            phone,
            expectedDelivery,

        } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ success: false, messege: "order items are requ" })
        }

        const orders = await Order.create({
            userId: req.user.id,
            items,
            subtotal,
            shipping,
            tax,
            total,

            paymentStatus: "Paid",
            orderStatus: "Placed",

            address,
            city,
            state,
            pincode,
            phone,
            expectedDelivery,
        })

        return res.status(201).json({ success: true, messege: "Order Save Successfully", data: orders });
    } catch (error) {
        console.log("order error", error)
        return res.status(500).json({ success: false, messege: error.message });

    }
}

// GET MY ORDERS:--------------------------------------------------
const myorders = async (req, res) => {
    try {
        const getorders = await Order.find({
            userId: req.user.id
        })
        // .sort({createdAt:-1});

        return res.status(200).json({ success: true, messege: "My Order Get Successfully", data: getorders })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

module.exports = {
    createwebsiteorder, myorders
};