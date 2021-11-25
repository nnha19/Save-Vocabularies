const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      jwt.verify(token, process.env.JWT_KEY, (err, validToken) => {
        if (err) {
          res.status(400).json("You token is not valid");
        } else {
          const { username, email, userId } = validToken;
          req.user = { username, email, userId };
          next();
        }
      });
    } else {
      res.status(400).json("You need to be logged in to proceed.");
    }
  } else {
    res.status(400).json("You need to be logged in to proceed.");
  }
};

module.exports = authMiddleware;
