const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');

const {
  getUsers, getUsersById, patchUserInfo, patchUserAvatar,
} = require('../controllers/user');


router.get('/', getUsers);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUsersById);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), patchUserInfo);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().uri(),
  }),
}), patchUserAvatar);

module.exports = router;
