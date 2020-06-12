const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const {
  getUsers, getUsersById, patchUserInfo, patchUserAvatar,
} = require('../controllers/user');

const celebrateValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
    age: Joi.number().integer().required().min(18),
    about: Joi.string().min(2).max(30),
  }),
});

router.get('/', getUsers);
router.get('/:userId', celebrateValidation, getUsersById);
router.patch('/me', celebrateValidation, patchUserInfo);
router.patch('/me/avatar', celebrateValidation, patchUserAvatar);

module.exports = router;
