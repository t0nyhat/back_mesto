const Card = require('../models/card');

function errorHandler(error, req, res) {
  if (error.name === 'CastError') {
    res.status(400).send({ message: error.message });
    return;
  }
  if (error.name === 'Error') {
    res.status(404).send({ message: error.message });
    return;
  }
  if (error.name === 'ValidationError') {
    res.status(400).send({ message: error.message });
    return;
  }

  res.status(500).send({ message: error.message });
}

const getCards = (req, res) => {
  Card.find({})
    .orFail(new Error('Список карточек пуст'))
    .then((cards) => res.send({ cards }))
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ card }))
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

const deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new Error(`Карточки с id : ${req.params.cardId} не существует!`))
    .then((card) => {
      if (!card) {
        throw new Error(`Карточки с id : ${req.params.cardId} не существует!`);
      }
      res.send({ card });
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};
const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error(`Карточки с id : ${req.params.cardId} не существует!`))
    .then((card) => {
      if (!card) {
        throw new Error(`Карточки с id : ${req.params.cardId} не существует!`);
      }
      res.send({ card });
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
  )
    .orFail(new Error(`Карточки с id : ${req.params.cardId} не существует!`))
    .then((card) => {
      if (!card) {
        throw new Error(`Карточки с id : ${req.params.cardId} не существует!`);
      }
      res.send({ card });
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};
module.exports = {
  getCards, createCard, deleteCardById, likeCard, dislikeCard,
};
