// user
const mongoose = require('mongoose');
const validate = require('mongoose-validator');

const urlValidator = [
  validate({
    validator: 'isURL',
    message: 'Невалидный URL аватара',
  }),
];

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    validate: urlValidator,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
