const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const IncorrectDataError = require('../errors/incorrect-data-err');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (!users) {
        next(NotFoundError('Пользователи не найдены'));
      }
      res.send({ data: users });
    })
    .catch((err) => {
      if (err.message.match(/validation\sfailed/gi)) {
        next(new IncorrectDataError('Переданы некорректные данные'));
      }
      next(new Error('Внутренняя ошибка сервиса'));
    });
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        next(NotFoundError('Пользователь не найден'));
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (
        err.message.match(/validation\sfailed/gi) || err.message.match(/failed\sfor\svalue/gi)
      ) {
        next(new IncorrectDataError('Переданы некорректные данные'));
      }
      next(new Error('Внутренняя ошибка сервиса'));
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  User.create({
    name,
    about,
    avatar,
    email,
    password,
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.message.match(/validation\sfailed/gi)) {
        next(new IncorrectDataError('Переданы некорректные данные'));
      }
      next(new Error('Внутренняя ошибка сервиса'));
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about, avatar },
    { new: true, runValidators: true },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message.match(/validation\sfailed/gi)) {
        next(new IncorrectDataError('Переданы некорректные данные'));
      }
      next(new Error('Внутренняя ошибка сервиса'));
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.params;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message.match(/validation\sfailed/gi)) {
        next(new IncorrectDataError('Переданы некорректные данные'));
      }
      next(new Error('Внутренняя ошибка сервиса'));
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.params;

  User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        next(NotFoundError('Пользователь не найден'));
      }
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send(token);
    })
    .catch((err) => {
      if (err.message.match(/validation\sfailed/gi)) {
        next(new IncorrectDataError('Переданы некорректные данные'));
      }
      next(new Error('Внутренняя ошибка сервиса'));
    });
};
