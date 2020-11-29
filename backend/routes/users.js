const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
    about: Joi.string().min(2).max(30).default('Исследователь'),
  }).unknown(true),
}), updateProfile);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
