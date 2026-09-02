const CreateAdmin = require("../Models/createadminModel");
// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createadmins = async (req, res) => {
  console.log(req.body);
  console.log(req.file)
  try {
    const { name, email, password, phone, role, status } = req.body;



    const admin = await CreateAdmin.create({
      name,
      email,
      password,
      phone,
      role,
      status,
      image: req.file.filename
    })

    res.status(201).json({
      success: true,
      message: "cretaeAdmin created successfully",
      data: admin
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// LOGIN
const adminlogin = async (req, res) => {
  console.log("Received Data:", req.body);

  try {
    const { email, password } = req.body;

    const admins = await CreateAdmin.findOne({
      email,
    });

    if (!admins) {
      return res.status(400).json({
        message: "Admin Not Found",
      });
    }

    // const isMatch = await bcrypt.compare(password, admins.password);

    if (password !== admins.password) {
      return res.status(400).json({
        message: "Password Incorrect",
      });
    }
    console.log("JWT_SECRET =", process.env.JWT_SECRET);

    const token = jwt.sign(
      {
        id: admins._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.status(200).json({
      success: true,
      token,
      admin: { id: admins._id, name: admins.name, email: admins.email, },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET Create Admin:-
const getcreateadmin = async (req, res) => {
  const Admin = await CreateAdmin.find({});
  res.json({ message: "fetch", data: Admin });


};

// singl details page 
const getsingladmin = async (req, res) => {
  // console.log(req.params)
  try {
    const id = req.params.id;

    const detailadmin = await CreateAdmin.find({ _id: id });
    console.log(detailadmin)

    res.status(200).json({ message: "fetch successfuly", status: true, data: detailadmin });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ success: false, message: "Error while getting admin by getAdmin" });
  }
};

// delete
// const deleteAdmin = async (req, res) => {
//     console.log("delete", req.params);
//     const id = req.params.id;
//     const delAdmin = await CreateAdmin.deleteOne({ _id: id });
//     console.log(delAdmin);

// }
const deletAdmin = async (req, res) => {
  console.log("delete", req.params);
  const id = req.params.id;
  const delAdmin = await CreateAdmin.deleteOne({ _id: id })
  console.log(delAdmin);
}

//----------- update data --------------
const updateadmin = async (req, res) => {
  console.log(req.params);
  console.log("editttttttt", req.body);
  console.log(req.file)
  try {
    const id = req.params.id
   
    const EditAdmin = await CreateAdmin.findByIdAndUpdate(
      id,
      {
        name:req.body.name,
        image:req.file.filename,
        email:req.body.email,
        phone:req.body.phone,
        role:req.body.role,
        status:req.body.status,
      },
      { new: true }
    )
    res.status(200).json({ success: true, message: "Admin Updated Successfully", data: EditAdmin })

  } catch (error) {
    res.status(500).json({ success: false, message: error.message })

  }
}

// =========== Profile =================
// const profileuser = async (req, res) => {
//   try {
//     const profiledata = await User.findById(req.user.id);
//     console.log(profiledata)
//     res.status(200).json({ message: "Profile SuccessFully", user: profiledata })
//   } catch (error) {
//     res.status(200).json({ message: "Internal Server Error", error: error.message })
//   }
// }

const profileAdmin=async (req, res)=>{
  console.log(req.body)
  
  try{
    const profiledata=await CreateAdmin.findById(req.user.id)
    console.log(profiledata);

    res.status(200).json({message:"Profile SuccessFully", data:profiledata})
  }catch(error){
        res.status(200).json({ message: "Internal Server Error", error: error.message })

  }
}


module.exports = { createadmins, getcreateadmin, adminlogin, getsingladmin, deletAdmin, updateadmin, profileAdmin }
