const User = require('../models/user');

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

const getUsers = (req, res) => {
  User.find({})
    .orFail(new Error('Список пользователей пуст')).then((users) => {
      res.send({ users });
    }).catch((error) => {
      errorHandler(error, req, res);
    });
};
const getUsersById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error(`Пользователя с id : ${req.params.userId} не существует!`))
    .then((user) => {
      res.send({ user });
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .orFail(new Error('Ошибка создания пользователя'))
    .then((user) => res.send({ user }))
    .catch((error) => {
      errorHandler(error, req, res);
    });
};
const patchUserInfo = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(new Error(`Пользователя с id : ${req.params.userId} не существует!`))
    .then((user) => res.send({ user }))
    .catch((error) => {
      errorHandler(error, req, res);
    });
};
const patchUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(new Error(`Пользователя с id : ${req.params.userId} не существует!`))
    .then((user) => res.send({ user }))
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

module.exports = {
  getUsers, getUsersById, createUser, patchUserInfo, patchUserAvatar,
};
