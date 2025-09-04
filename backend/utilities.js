const jwt = require("jsonwebtoken");

function authenticateToken(res, req, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendState(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendState(401);
    req.user = user;
    next;
  });
}

module.exports = { authenticateToken };
