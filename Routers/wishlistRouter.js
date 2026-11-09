const express=require("express");
const router=express.Router();
const protect = require("../Middleware/Middleware");
const {toggleWishlist, getWishlist}=require("../Controllers/wishlistController");

router.post("/:productId", protect, toggleWishlist);
router.get("/", protect, getWishlist);

module.exports=router;