const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch((error) => res.status(404).send({ message: error.message }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ card }))
    .catch((error) => res.status(500).send({ message: error.message }));
};

const deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send(`Карточки с id : ${req.params.cardId} не существует!`);
      } else {
        res.send({ card });
      }
    })
    .catch((error) => {
      if (error.message.indexOf('Cast to ObjectId failed') === 0) {
        res.status(404).send(`Карточки с id : ${req.params.cardId} не существует!`);
        return;
      }
      res.status(500).send({ message: error });
    });
};
const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      res.send({ card });
    })
    .catch((error) => {
      if (error.message.indexOf('Cast to ObjectId failed') === 0) {
        res.status(404).send(`Карточка с id : ${req.params.cardId} не найдена!`);
        return;
      }
      res.status(500).send({ message: error });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
  )
    .then((card) => {
      res.send({ card });
    })
    .catch((error) => {
      if (error.message.indexOf('Cast to ObjectId failed') === 0) {
        res.status(404).send(`Карточка с id : ${req.params.cardId} не найдена!`);
        return;
      }
      res.status(500).send({ message: error });
    });
};
module.exports = {
  getCards, createCard, deleteCardById, likeCard, dislikeCard,
};
