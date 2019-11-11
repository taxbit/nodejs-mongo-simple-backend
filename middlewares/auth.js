const jwt = require('jsonwebtoken');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const AuthError = require('../errors/auth-err');

module.exports = (req, res, next) => {
  let payload;

  try {
    const { token } = req.cookies;
    if (!token) {
      throw new AuthError('Необходима авторизация');
    }
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(err);
  }

  req.user = payload;
  next();
};
