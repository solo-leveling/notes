const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  console.log("authMiddleware is working");

  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({
      success: false,
      message: "Login Expired.Login again.",
    });
  }
  //decode the token
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decodedToken);

    req.userInfo = decodedToken;
    next();
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Access denied",
    });
  }
};

module.exports = authMiddleware;
