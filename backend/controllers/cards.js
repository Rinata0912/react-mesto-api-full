const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const IncorrectDataError = require('../errors/incorrect-data-err');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      if (err.message.match(/validation\sfailed/ig)) {
        next(new IncorrectDataError('Переданы некорректные данные'));
      }
      next(new Error('Внутренняя ошибка сервиса'));
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.message.match(/validation\sfailed/ig)) {
        next(new IncorrectDataError('Переданы некорректные данные'));
      }
      next(new Error('Внутренняя ошибка сервиса'));
    });
};

module.exports.deleteCard = (req, res, next) => {
  const userData = req.user;

  if (req.params.cardId === userData._id) {
    Card.findByIdAndRemove(req.params.cardId)
      .then((card) => {
        if (!card) {
          next(new NotFoundError('такой карточки не существует'));
        }
        return res.send({ data: card });
      })
      .catch((err) => {
        if (err.message.match(/validation\sfailed/ig) || err.message.match(/failed\sfor\svalue/ig)) {
          next(new IncorrectDataError('Переданы некорректные данные'));
        }
        next(new Error('Внутренняя ошибка сервиса'));
      });
  }
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        next(new NotFoundError('такой карточки не существует'));
      }
      return res.send(card.likes);
    })
    .catch((err) => {
      if (err.message.match(/validation\sfailed/ig) || err.message.match(/failed\sfor\svalue/ig)) {
        next(new IncorrectDataError('Переданы некорректные данные'));
      }
      next(new Error('Внутренняя ошибка сервиса'));
    });
};

module.exports.unlikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        next(new NotFoundError('такой карточки не существует'));
      }
      return res.send(card.likes);
    })
    .catch((err) => {
      if (err.message.match(/validation\sfailed/ig) || err.message.match(/failed\sfor\svalue/ig)) {
        next(new IncorrectDataError('Переданы некорректные данные'));
      }
      next(new Error('Внутренняя ошибка сервиса'));
    });
};
