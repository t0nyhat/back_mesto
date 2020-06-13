const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const ForbidenError = require('../errors/forbiden-err');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ card }))
    .catch(next);
};

const deleteCardById = (req, res, next) => {
  const { cardId } = req.params;
  Card.findOne({ _id: cardId })
    .orFail(() => {
      throw new NotFoundError(`Карточки с id : ${cardId} не существует!`);
    })
    .then((cardDocument) => {
      if (!cardDocument.owner.equals(req.user._id)) {
        throw new ForbidenError('У вас нет прав для удаления карточки');
      }
      Card.findByIdAndRemove(cardId)
        .then((card) => res.send({ card }))
        .catch(next);
    })
    .catch(next);
};
const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError(`Карточки с id : ${req.params.cardId} не существует!`);
    })
    .then((card) => {
      res.send({ card });
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError(`Карточки с id : ${req.params.cardId} не существует!`);
    })
    .then((card) => {
      res.send({ card });
    })
    .catch(next);
};
module.exports = {
  getCards, createCard, deleteCardById, likeCard, dislikeCard,
};
