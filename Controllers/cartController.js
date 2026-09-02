const Cart = require("../Models/cartModel");

const AddtoCart = async (req, res) => {
    try {
        console.log(req.params);

        const addProduct = new Cart({
            item: req.params.id,
        })
        const saveCart = await addProduct.save();

        res.status(200).json({ message: "success", data: saveCart });

    } catch (error) {
        res.status(500).json({ message: "Failed to add product to cart", error: error.message })

    }
    // console.log(req.params);

    // const addProduct=new Cart({
    //     item:req.params.id,
    // })

    // const saveCart=await addProduct.save();
    // res.json({message:"success", data:saveCart});

}

// GET Cart:----------------------------------------------
const getCartData = async (req, res) => {
    try {
        const getCart = await Cart.find({}).populate("item");
        console.log(getCart)
        res.status(200).json({ message: "Cart Data Success", status: true, data: getCart });
    } catch (error) {
        res.status(500).json({ message: "Failed to Cart Data", error: error.message });

    }
}

const deleteCart = async (req, res) => {
    try {
        const id = req.params.id

        const delcart = await Cart.findByIdAndDelete(id);
        res.status(200).json({ message: "Car deleted successfully", status: true, data: delcart });
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
}

module.exports = { AddtoCart, getCartData, deleteCart }