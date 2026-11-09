const User = require("../Models/userModel");

const toggleWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const id = req.params.productId;

        // Wishlist me product ki position dhundta hai
        const index = user.wishlist.findIndex(item => item == id);

        //  Agar product mil gaya, usko remove kar deta hai.
        if (index !== -1) {
            user.wishlist.splice(index, 1)
        } else {
            // agar nhi mila = to Product ko add kar deta hai.
            user.wishlist.push(id)
        }

        await user.save();

        res.json({ success: true, data: user.wishlist });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

// get--
const getWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate("wishlist");

        res.json({ success: true, data: user.wishlist });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })

    }
}
module.exports = { toggleWishlist, getWishlist }
