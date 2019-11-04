const router = require('express').Router();
const { getUsers, getUserById } = require('../controllers/users');
const { celebrate, Joi } = require('celebrate');


router.get('/', getUsers);

router.get('/:userId', celebrate({
    // валидируем параметры
    params: Joi.object().keys({
        userId: Joi.string().alphanum().length(24),
    }),
}), getUserById);


module.exports = router;
