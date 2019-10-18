const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка чтения users' }));
};


module.exports.getUserById = (req, res) => {
  console.log(req.params.userId);
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка чтения по userId' }));
};


module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  const hash = bcrypt.hash(password, 10);

  User.create({ name, about, email, hash, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка создания user: ${err}` }));
};


module.exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        // хеши не совпали — отклоняем промис
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      // аутентификация успешна
      const { JWT_SECRET } = process.env;
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });

      res.cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true
        }).end();
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};