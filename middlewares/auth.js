const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = process.env;
const AuthError = require('../errors/auth-err');

module.exports = (req, res, next) => {
  
  try {
      const { token } = req.cookies;
      if (!token) {
        throw new AuthError('Необходима авторизация');
      }
  } catch (next) {
    next(err);
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new AuthError('Необходима авторизация'));
  }

  req.user = payload;
  next();
};

