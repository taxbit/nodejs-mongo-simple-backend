const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = process.env;
const AuthError = require('../errors/auth-err');

module.exports = (req, res, next) => {
  let payload;

  try {
    const { token } = req.cookies;
    if (!token) {
      throw new AuthError('Необходима авторизация');
    }
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(err);
  }

  req.user = payload;
  next();
};
