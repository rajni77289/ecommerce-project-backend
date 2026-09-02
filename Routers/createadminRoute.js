const express = require("express");
const { createadmins,getcreateadmin,adminlogin,getsingladmin,deletAdmin,updateadmin,profileAdmin} = require("../Controllers/createadminController");

const router = express.Router();
const protect=require("../Middleware/Middleware");

router.post("/", createadmins);
router.get("/",getcreateadmin);
router.post("/login", adminlogin);
router.get("/getsingladmin/:id",getsingladmin)
router.delete("/deletAdmin/:id",deletAdmin)
router.post("/updateadmin/:id",updateadmin)
router.get("/profileAdmin",protect,profileAdmin)
module.exports = router