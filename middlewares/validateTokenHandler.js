const jwt = require("jsonwebtoken");

const validateTokenHandler = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);

        throw new Error("User not authorized.");
      }

      req.user = decoded.user;

      next();
    });
  };
};

module.exports = validateTokenHandler;
