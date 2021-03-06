const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const AuthError = require('../errors/auth-err');
const UserError = require('../errors/user-err');


module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (!users) {
        throw new NotFoundError('Произошла ошибка чтения users');
      }
      res.send({ data: users });
    })
    .catch(next);
};


module.exports.getUserById = (req, res, next) => {
  console.log(req.params.userId);
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Не найден user с таким id');
      }
      res.send({ data: user });
    })
    .catch(next);
};


module.exports.createUser = (req, res, next) => {
  const {
    name, email, password, about, avatar,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash, about, avatar,
    }).catch((err) => {
      throw new UserError(err.errors.email.message);
    }))
    .then((user) => {
      if (!user) {
        throw new Error('Произошла ошибка создания user');
      }
      res.send({ data: user });
    })
    .catch(next);
};


module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  let UserId;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Неправильные почта или пароль');
      }
      UserId = user._id;
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        // хеши не совпали
        throw new AuthError('Неправильные почта или пароль');
      }

      // аутентификация успешна
      const { NODE_ENV, JWT_SECRET } = process.env;
      const token = jwt.sign({ _id: UserId }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });

      res.cookie('token', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      }).end();
    })
    .catch(next);
};
