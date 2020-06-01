const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { createError } = require('../lib/createError');
require('dotenv').config();

const getUsers = (req, res, next) => {
  User.find({})
    .orFail(new Error('Список пользователей пуст')).then((users) => {
      res.send({ users });
    }).catch(next);
};
const getUsersById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new Error(`Пользователя с id : ${req.params.userId} не существует!`))
    .then((user) => {
      if (!user) {
        throw new Error(`Пользователя с id : ${req.params.userId} не существует!`);
      }
      res.send({ user });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (password.trim().length <= 7) {
    throw createError('ValidationError', 'Пароль должен быть не менее 8 символов исключая пробелы');
  }
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({ user: user.omitPrivate() }))
    .catch(next);
};
const patchUserInfo = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(new Error(`Пользователя с id : ${req.params.userId} не существует!`))
    .then((user) => {
      if (!user) {
        throw new Error(`Пользователя с id : ${req.params.userId} не существует!`);
      }
      res.send({ user });
    })
    .catch(next);
};
const patchUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(new Error(`Пользователя с id : ${req.params.userId} не существует!`))
    .then((user) => {
      if (!user) {
        throw new Error(`Пользователя с id : ${req.params.userId} не существует!`);
      }
      res.send({ user });
    })
    .catch(next);
};


const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY || 'dev-secret', {
        expiresIn: '7d',
      });
      res
        .cookie('jwt', token, {
          maxAge: 360000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .end();
    })

    .catch(next);
};

module.exports = {
  getUsers, getUsersById, createUser, patchUserInfo, patchUserAvatar, login,
};
