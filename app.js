const express = require('express');
const path = require('path');

const { PORT = 3000 } = process.env;
const app = express();
const error = (req, res, next) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
  next();
};
app.use(express.static(path.join(__dirname, 'public')));
app.use('/cards', require('./routes/cards.js'));
app.use('/users', require('./routes/users.js'));

app.use('*', error);
app.listen(PORT, () => {
  console.info(`App in port ${PORT}`);
});
