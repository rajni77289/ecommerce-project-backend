const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
// const registerUser = async (req, res) => {
//     console.log("Received Data:", req.body);
//         res.json({ success: true });

//   try {
//     const { name, email, phone, password } = req.body;

//     const userExists = await User.findOne({
//       email,
//     });

//     if (userExists) {
//       return res.status(400).json({
//         message: "User already exists",
//       });
//     }

//     const salt = await bcrypt.genSalt(10);

//     const hashedPassword = await bcrypt.hash(password, salt);

//     const user = await User.create({
//       name,
//       email,
//       phone,
//       password: hashedPassword,
//     });

//     res.status(201).json({
//       success: true,
//       message: "User Registered",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };
const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, status, role, timestamps } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      image:req.file.filename,
    });

    // Token banao
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// LOGIN
const loginUser = async (req, res) => {
  console.log("Received Data:", req.body);

  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        message: "User Not Found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Password Incorrect",
      });
    }
    console.log("JWT_SECRET =", process.env.JWT_SECRET);

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// get users:
const getUser = async (req, res) => {
  try {

    const users = await User.find();
    res.status(200).json({ success: true, users })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })

  }
}

const getsingluser = async (req, res) => {
  // console.log(req.params)
  try {
    const id = req.params.id;

    const detailsuser = await User.find({ _id: id });
    console.log(User)

    res.status(200).json({ message: "fetch successfuly", status: true, data: detailsuser });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ success: false, message: "Error while getting users by getuser" });
  }
};

// delete
const deleteUser = async (req, res) => {
  console.log("delete", req.params);
  const id = req.params.id;
  const delUser = await User.deleteOne({ _id: id });

}
//----------- update data --------------
// const updateuser = async (req, res) => {
//   console.log(req.params);
//   console.log("updateusers",req.body);

//   try {
//     const id = req.params.id

//     const EditUser = await User.findByIdAndUpdate(
//       id,
//       req.body,
//       { new: true }
//     )
//     res.status(200).json({ success: true, message: "user Updated Successfully", data: EditUser })

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message })

//   }
// }
//---------------------
// const updateuser = async (req, res) => {
//   console.log(req.params)

//   console.log("editttttttt", req.body);
//   try {
//     const id = req.params.id;
//     const EditUser = await User.findByIdAndUpdate(
//       id,
//       req.body,
//       { new: true }
//     )
//     res.status(200).json({ success: true, message: "user Updated Successfully", data: EditUser })
//   } catch (error) {
//         console.log("UPDATE USER ERROR:", error);

//     res.status(500).json({ success: false, message: error.message })
//   }
// }
// ----------------------
const updateuser = async (req, res) => {
  console.log(req.params);
  console.log("editttttttt", req.body);

  try {
    const id = req.params.id;

    const EditUser = await User.findByIdAndUpdate(
      id,
      req.body,
      { returnDocument: "after" }
    );

    console.log("UPDATED USER:", EditUser);

    res.status(200).json({
      success: true,
      message: "User Updated Successfully",
      data: EditUser
    });

  } catch (error) {
    console.log("UPDATE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// =========== Profile =================
const profileuser = async (req, res) => {
  try {
    const profiledata = await User.findById(req.user.id);
    console.log(profiledata)
    res.status(200).json({ message: "Profile SuccessFully", user: profiledata })
  } catch (error) {
    res.status(200).json({ message: "Internal Server Error", error: error.message })
  }
}

module.exports = { registerUser, loginUser, getUser, getsingluser,profileuser, deleteUser, updateuser };