const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
  const { jwt: token } = req.cookies;

  if (!token) {
    const error = new Error('Необходима авторизация');
    error.name = 'Unauthorised';
    throw error;
  }

  let payload;

  try {
    payload = jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    const error = new Error('Необходима авторизация');
    error.name = 'Unauthorised';
    throw error;
  }

  req.user = payload;

  next();
};
module.exports = auth;
