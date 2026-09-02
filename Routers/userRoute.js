const express = require("express");

const {profileuser, registerUser, loginUser,getUser, getsingluser,deleteUser,updateuser} = require("../Controllers/userController");

const router = express.Router();
const protect = require("../Middleware/Middleware")

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/getuser",getUser)
router.get("/getsingluser/:id", getsingluser)
router.delete("/deleteUser/:id",deleteUser)
router.post("/updateuser/:id",updateuser)
router.get("/myprofile",protect,profileuser)

module.exports = router;