const jwt = require('jsonwebtoken');
const User = require('../src/models/user');
const { JWT } = require('../config/config');
const fs = require("fs")
const path = require("path")

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('jwt ')) {
      return res.status(401).json({ message: 'User unauthorized!' });
    }
    
    const token = authHeader.replace('jwt ', '')
    const pubKey = fs.readFileSync(path.join(__dirname, "../authKeys/jwtPublic.key"), 'utf-8')
    const decoded = jwt.verify(token, pubKey);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ message: 'User not found, or invalid user.' });

    if (!user.token.includes(token)) return res.status(401).json({ message: 'Token not valid, please login again' });
    
    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    
    console.error('Auth middleware error:', error);
    res.status(500).json({ message: 'Server error in authentication' });
  }
};

module.exports = authMiddleware;