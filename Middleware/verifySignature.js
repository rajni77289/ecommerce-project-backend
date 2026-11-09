const crypto = require("crypto");

const verifyPaymentSignature = ({
  orderId,
  paymentId,
  signature,
}) => {
  // console.log("SECRET EXISTS:", !!process.env.RAZORPAY_KEY_SECRET);

  const body = `${orderId}|${paymentId}`;

  const expectedSignature = crypto
    .createHmac(
      "sha256",
      process.env.TEST_API_SECRET
    )
    .update(body)
    .digest("hex");

  return expectedSignature === signature;
};

module.exports = verifyPaymentSignature;