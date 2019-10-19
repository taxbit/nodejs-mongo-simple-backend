const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка чтения cards: ${err}` }));
};


module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка создания card: ${err}` }));
};


module.exports.deleteCard = (req, res) => {
  Card.findOneAndDelete({ _id: req.params.cardId, owner: req.user._id })
    .then((card) => {
      if (!card) {
        return Promise.reject(new Error('Ошибка удаления карты'));
      }
      res.send({ data: card });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};
