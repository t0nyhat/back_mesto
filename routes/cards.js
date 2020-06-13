const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const validator = require('validator');
const {
  getCards, createCard, deleteCardById, likeCard, dislikeCard,
} = require('../controllers/card');

const urlValidate = (link) => {
  if (!validator.isURL(link)) {
    throw new Error('invalid link');
  }
  return link;
};


router.get('/', getCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(urlValidate),
  }),
}), createCard);
router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), deleteCardById);
router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), likeCard);
router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), dislikeCard);
module.exports = router;
