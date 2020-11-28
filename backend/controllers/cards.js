const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      if (err.message.match(/validation\sfailed/ig)) {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(500).send({ message: 'Внутренняя ошибка сервиса' });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.message.match(/validation\sfailed/ig)) {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(500).send({ message: 'Внутренняя ошибка сервиса' });
    });
};

module.exports.deleteCard = (req, res) => {
  const userData = req.user;

  if (req.params.cardId === userData._id) {
    Card.findByIdAndRemove(req.params.cardId)
      .then((card) => {
        if (!card) {
          return res.status(404).send({ message: 'такой карточки не существует' });
        }
        return res.send({ data: card });
      })
      .catch((err) => {
        if (err.message.match(/validation\sfailed/ig) || err.message.match(/failed\sfor\svalue/ig)) {
          return res.status(400).send({ message: 'Переданы некорректные данные' });
        }
        return res.status(500).send({ message: 'Внутренняя ошибка сервиса' });
      });
  }
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'такой карточки не существует' });
      }
      return res.send(card.likes);
    })
    .catch((err) => {
      if (err.message.match(/validation\sfailed/ig) || err.message.match(/failed\sfor\svalue/ig)) {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(500).send({ message: 'Внутренняя ошибка сервиса' });
    });
};

module.exports.unlikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'такой карточки не существует' });
      }
      return res.send(card.likes);
    })
    .catch((err) => {
      if (err.message.match(/validation\sfailed/ig) || err.message.match(/failed\sfor\svalue/ig)) {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(500).send({ message: 'Внутренняя ошибка сервиса' });
    });
};
