const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
    // console.log("PROTECT MIDDLEWARE CALLED");

  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      // console.log("TOKEN RECEIVED:", !!token);


      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("DECODED USER:", decoded);
      // console.log("AUTH HEADER:", req.headers.authorization);



      req.user = decoded;

      next();
    } else {
      return res.status(401).json({
        message: "Not Authorized",
      });
    }
  } catch (error) {

      // console.log("TOKEN ERROR:", error.message);

    return res.status(401).json({
      message: "Token Failed",
    });
  }
};

module.exports = protect;