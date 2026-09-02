const mongoose = require("mongoose");


const adminSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        enum: ["Super Admin", "Admin"],
        default: "Admin",
        required: true,
        // type: String,
        // default: "Admin",
    },
    status: {
        type: String,
        default: "Active",
    },
    image:
    {
        type: String,
    },
})
const cretaeadmin = mongoose.model("createadmin", adminSchema)
module.exports = cretaeadmin