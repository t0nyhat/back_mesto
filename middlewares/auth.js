const jwt = require('jsonwebtoken');
require('dotenv').config();
const { createError } = require('../lib/createError');

const auth = (req, res, next) => {
  const { jwt: token } = req.cookies;

  if (!token) {
    throw createError('Unauthorised', 'Необходима авторизация');
  }

  let payload;

  try {
    payload = jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    throw createError('Unauthorised', 'Необходима авторизация');
  }

  req.user = payload;

  next();
};
module.exports = auth;
