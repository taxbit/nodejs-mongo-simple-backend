const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      if (!cards) {
        throw new NotFoundError('Произошла ошибка чтения cards');
      }
      res.send({ data: cards });
    })
    .catch(next);
};


module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      if (!card) {
        throw new Error('Ошибка создания card');
      }
      res.send({ data: card });
    })
    .catch(next);
};


module.exports.deleteCard = (req, res, next) => {
  Card.findOneAndDelete({ _id: req.params.cardId, owner: req.user._id })
    .then((card) => {
      if (!card) {
        throw new Error('Ошибка удаления карты');
      }
      res.send({ data: card });
    })
    .catch(next);
};
