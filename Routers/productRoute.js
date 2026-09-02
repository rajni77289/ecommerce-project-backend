const express = require("express");
const { createProduct,
    getAllProducts,
    getproductBySlug,
    getsinglproduct,
    updateProduct,
    deleteProduct
} = require("../Controllers/productController");
const { route, all } = require("./userRoute");


const router = express.Router();

router.post("/", createProduct);
router.get("/", getAllProducts);
router.post("/getslugdatas/:slug", getproductBySlug);
router.post("/getsinglproduct/:id", getsinglproduct);
router.post("/updateproduct/:id",updateProduct)
router.delete("/deleteProduct/:id",deleteProduct)

// router.get("/:id", getSingleProduct);

// router.put("/:id", upload.array("images", 10), updateProduct);

// router.delete("/:id", deleteProduct);
module.exports = router