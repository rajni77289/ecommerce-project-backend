const express=require("express");
const {createwebsiteorder,myorders}=require("../Controllers/orderController");
const router=express.Router();
const protect=require("../Middleware/Middleware");

router.post("/create",protect,createwebsiteorder);
router.get("/myorder",protect, myorders)

module.exports=router;
