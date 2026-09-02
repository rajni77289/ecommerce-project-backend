const express=require("express");
const {AddtoCart, getCartData,deleteCart} = require("../Controllers/cartController");
const router=express.Router();


router.post("/addtocart/:id", AddtoCart);
router.get("/getcartdata",getCartData);
router.delete("/deletcart/:id",deleteCart)

module.exports=router