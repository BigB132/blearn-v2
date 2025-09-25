const jwt = require('jsonwebtoken');
const UserData = require('../models/userData');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await UserData.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ state: 'error', message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ state: 'error', message: 'Not authorized, no token' });
  }
};

module.exports = { protect };