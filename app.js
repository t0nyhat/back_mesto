const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { login, createUser } = require('./controllers/user');
const auth = require('./middlewares/auth');
const { errorHandler } = require('./middlewares/errorHandler');


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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', login);
app.post('/signup', createUser);
app.use(cookieParser());
app.use(auth);

app.use('/cards', require('./routes/cards.js'));
app.use('/users', require('./routes/users.js'));

app.use('*', error);

app.use(errorHandler);


app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.info(`App in port ${PORT}`);
});
