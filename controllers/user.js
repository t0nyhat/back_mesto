const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch((error) => res.status(404).send({ message: error.message }));
};
const getUsersById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      res.send({ user });
    })
    .catch((error) => {
      if (error.message.indexOf('Cast to ObjectId failed') === 0) {
        res.status(404).send(`Пользователя с id : ${req.params.userId} не существует!`);
        return;
      }
      res.status(500).send({ message: error });
    });
};
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ user }))
    .catch((error) => res.status(500).send({ message: error.message }));
};
module.exports = { getUsers, getUsersById, createUser };
