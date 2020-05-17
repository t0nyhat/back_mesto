const Card = require('../models/card');
const { errorHandler } = require('../middlewares/errorHandler');

const getCards = (req, res) => {
  Card.find({})
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
  const { cardId } = req.params;
  Card.findOne({ _id: cardId })
    .orFail(() => {
      throw new Error(`Карточки с id : ${cardId} не существует!`);
    })
    .then(() => {
      Card.findByIdAndRemove(cardId)
        .then((card) => res.send({ card }))
        .catch((error) => {
          errorHandler(error, req, res);
        });
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
    .orFail(() => {
      throw new Error(`Карточки с id : ${req.params.cardId} не существует!`);
    })
    .then((card) => {
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
    { new: true },
  )
    .orFail(() => {
      throw new Error(`Карточки с id : ${req.params.cardId} не существует!`);
    })
    .then((card) => {
      res.send({ card });
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};
module.exports = {
  getCards, createCard, deleteCardById, likeCard, dislikeCard,
};
