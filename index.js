require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./Routers/userRoute");
const app = express();
const path = require('path')

// connected mongoDB(server)
connectDB();
// ====================================================
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
});
// ==============================================

app.use(cors());
app.use(express.json());
app.use("/uploadimage",express.static(path.join("uploads")))
// Route call user:-
app.use("/api/auth",authRoutes);
// product call:--
app.use("/api/products", upload.array("images",10),require("./Routers/productRoute"))
// Carts:--
app.use("/carts",require("./Routers/cartRoute"))
// createAdmin:--
app.use("/api/createadmin",upload.single("image"),require("./Routers/createadminRoute"));

// payment:-
app.use("/api/payment", require("./Routers/paymentRoute"));




app.get("/", (req, res) => {
  res.send("API Running...")
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
})