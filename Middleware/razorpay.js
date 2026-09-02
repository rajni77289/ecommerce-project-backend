const Razorpay = require("razorpay");

console.log("Test_API_Key:", process.env.TEST_API_KEY);
console.log("Test_API_Secret:", process.env.TEST_API_SECRET);
const razorpay = new Razorpay({
    key_id: process.env.TEST_API_KEY,
    key_secret: process.env.TEST_API_SECRET,
});

module.exports = razorpay;