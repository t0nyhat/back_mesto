const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, '../data/users.json'); // собрали абсолютный путь к файлу
const users = fs.readFileSync(filepath, { encoding: 'utf8' });

router.get('/users', (req, res) => {
  res.send(users);
});
router.get('/users/:id', (req, res) => {
  const user = JSON.parse(users).find((element) => element._id === req.params.id);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: 'Нет пользователя с таким id' });
  }
});
module.exports = router;
