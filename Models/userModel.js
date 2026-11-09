const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Blocked"],
      default: "Active",
    },
    role: {
      type: String,
      default: "user",
    },
    wishlist:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
      }
    ]
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);