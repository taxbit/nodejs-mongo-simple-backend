const router = require('express').Router();
const { getCards, createCard, deleteCard } = require('../controllers/cards');
const { celebrate, Joi } = require('celebrate');


router.get('/', getCards);

router.post('/', celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required(),
    }).unknown(true),
  }), createCard);

router.delete('/:cardId', celebrate({
    // валидируем параметры
    params: Joi.object().keys({
        cardId: Joi.string().alphanum().length(24),
    }),
}), deleteCard);


module.exports = router;
