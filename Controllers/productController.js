// const product = require("../Models/productModel");

// const createProduct = async (req, res) => {
//     console.log(res.body);
//     try {
//         const { name, price, oldPrice, rating, reviews, stock, description } = req.body;

//         const imagePaths = req.files.map((file) => file.filename);

//         const products = await product.create({
//             name,
//             price,
//             oldPrice,
//             rating,
//             reviews,
//             stock,
//             description,
//             images: imagePaths,
//         })
//         res.status(201).json({success:true, message: "Product created successfully",products});


//     } catch (error) {
//         res.status(500).json({success:false, message:error.message})

//     }

//     // All get Product:--
//     const getAllProducts=async(req, res)=>{
//         const getproduct=await product.find({});
//         res.json({message:"fetch", data:getproduct})
//     }
// }
// module.exports={createProduct,getAllProducts};
const Product = require("../Models/productModel");

const createProduct = async (req, res) => {
  console.log(req.body)
  console.log(req.files)
  try {
    const { name, price, oldPrice, rating, reviews, stock, description, category } =
      req.body;

    const imagePaths = req.files.map((file) => file.filename);
    // console.log("image",req.body.file)

    const product = await Product.create({
      name,
      price,
      category,
      oldPrice,
      rating,
      reviews,
      stock,
      description,
      images: imagePaths,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  const getproduct = await Product.find({});
  res.json({ message: "fetch", data: getproduct });
};

const getproductBySlug = async (req, res) => {
  // console.log(req.params)
  try {
    const slug = req.params.slug;

    const dataslug = await Product.find({ category: slug });
    // console.log(dataslug)

    res.status(200).json({ message: "fetch successfuly", status: true, data: dataslug });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ success: false, message: "Error while getting product by slug" });
  }
};

//   details page :---
const getsinglproduct = async (req, res) => {
  // console.log(req.params)
  try {
    const id = req.params.id;

    const getproduct = await Product.find({ _id: id });
    // console.log(getproduct)

    res.status(200).json({ message: "fetch successfuly", status: true, data: getproduct });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ success: false, message: "Error while getting product by getproduct" });
  }
};


// delete
const deleteProduct = async (req, res) => {
  // console.log("delete", req.params);
  const id = req.params.id;
  const delProduct = await Product.deleteOne({ _id: id });
  // console.log(delProduct);

}


// Update data
// const updateProduct = async (req, res) => {
//   console.log(req.params)
//   console.log("editttttttt", req.body);
//    console.log("FILESs:", req.files);

//   try {
//     const id = req.params.id;


//     const Editproduct = await Product.findByIdAndUpdate(
//       id,
//       req.body,
//       { new: true }
//     )
//     console.log(Editproduct);
//     res.status(200).json({ success: true, message: "Product Updated Successfully", data: Editproduct })
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message })
//   }
// }


// ------
const updateProduct = async (req, res) => {
  console.log(req.params);
  console.log("editttttttt", req.body);
  console.log("FILES:", req.files);

  try {
    const newImages = req.files.map((file) => file.filename);

    const update = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        images: newImages
      },
      { new: true }
    );

    console.log("UPDATED:", update);

    res.status(200).json({ success: true, message: "Product Updated Successfully",
      data: update });

  } catch (error) {
    console.log(error);

    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createProduct, getAllProducts, getproductBySlug, getsinglproduct, deleteProduct, updateProduct };