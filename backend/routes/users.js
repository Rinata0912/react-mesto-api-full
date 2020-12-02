const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  updateProfile,
  updateAvatar,
  getUser,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getUser);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
    about: Joi.string().min(2).max(30).default('Исследователь'),
  }).unknown(true),
}), updateProfile);
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/i),
  }).unknown(true),
}), updateAvatar);

module.exports = router;
