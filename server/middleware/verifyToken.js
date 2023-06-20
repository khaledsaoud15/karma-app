const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const headerToken = req.headers.token;
  if (headerToken) {
    const token = headerToken.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
      if (err) res.status(403).json({ message: "WRONG CREDANTIALS" });
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: "you are not AUTHENTICATED" });
  }
};

const verifyTokenAndAutherization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      res.status(401).json({ message: "you are not AUTHENTICATED" });
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(401).json({ message: "you are not AUTHENTICATED" });
    }
  });
};

module.exports = { verifyTokenAndAutherization, verifyTokenAndAdmin };
