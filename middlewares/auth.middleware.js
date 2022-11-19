const jwt = require('jsonwebtoken');

/**
 * Get token from authorization header
 * Bearer (thisIsTheToken) -> then check if it's a valid token
 */
exports.isAuth = (req, res, next) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, JWT_SECRET, (error, user) => {
      if (error) {
        return res.status(403).json({ message: 'Invalid token' });
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: 'Log in first' });
  }
};
