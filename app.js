const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const error = (req, res, next) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });

  next();
};
app.use((req, res, next) => {
  req.user = {
    _id: '5ec0064f83f27577a83ae4cb', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/cards', require('./routes/cards.js'));
app.use('/users', require('./routes/users.js'));

app.use('*', error);


app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.info(`App in port ${PORT}`);
});
