/* eslint-disable object-shorthand */
/* eslint-disable func-names */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-useless-escape */
const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /http(s?):\/\/((www\.)?((\w+\.)+[a-z]{2,})|(\d{1,3}\.){3}(\d{1,3}))((:\d{1,5})?)(\/[a-zA-Z0-9\_\/\.\?\=\&\#\-]*)?/.test(v);
      },
      message: (props) => `${props.value} is not a valid image link`,
    },
  },
  avatar: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
