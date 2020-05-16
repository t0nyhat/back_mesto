const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch((err) => res.status(404).send({ message: err.message }));
};
const getUsersById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.send({ user });
    })
    .catch((error) => {
      if (error.message.indexOf('Cast to ObjectId failed') === 0) {
        res.status(404).send(`Пользователя с id : ${req.params.id} не существует!`);
        return;
      }
      res.status(500).send({ message: error });
    });
};
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};
module.exports = { getUsers, getUsersById, createUser };
