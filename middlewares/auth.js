const jwt = require('jsonwebtoken');
require('dotenv').config();
const { createError } = require('../lib/createError');

const auth = (req, res, next) => {
  if ((!req.cookies.jwt)) {
    throw createError('Unauthorised', 'Необходима авторизация');
  }

  let payload;

  try {
    payload = jwt.verify(req.cookies.jwt, process.env.SECRET_KEY || 'dev-secret');
  } catch (err) {
    throw createError('Unauthorised', 'Необходима авторизация');
  }

  req.user = payload;

  next();
};
module.exports = auth;
