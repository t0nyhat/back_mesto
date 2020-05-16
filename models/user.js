// user
const mongoose = require('mongoose');

const urlValidationRegExp = /(https:|http:)(\/\/)?((([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6})|((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?))([:](6553[0-5]|655[0-2][0-9]|65[0-4][0-9]{2}|6[0-4][0-9]{3}|[1-5][0-9]{4}|[1-9][0-9]{0,3}))?([/][0-9A-Za-z\-?=.&#]+)*/;
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
    validate: {
      validator(inputAvatarString) {
        return urlValidationRegExp.test(inputAvatarString);
      },
      message: (props) => `${props.value} некорректный URL аватара`,
    },
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
