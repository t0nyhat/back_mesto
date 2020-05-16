const router = require('express').Router();
const User = require('../models/user');




router.get('/', (req, res) => {
 // res.send(users);
});
/*
router.get('/:id', (req, res) => {
  const user = JSON.parse(users).find((element) => element._id === req.params.id);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: 'Нет пользователя с таким id' });
  }
});
*/

router.post('/', (req, res) => {
  console.log(req.body);
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));

});

module.exports = router;
