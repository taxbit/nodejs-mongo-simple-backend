const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    validate: {
      validator: function(v) {
        return /http(s?):\/\/((www\.)?((\w+\.)+[a-z]{2,})|(\d{1,3}\.){3}(\d{1,3}))((:\d{1,5})?)(\/[a-zA-Z0-9\_\/\.\?\=\&\#\-]*)?/.test(v);
      },
      message: (props) => `${props.value} is not a valid image link!`
    },
  },
});

module.exports = mongoose.model('user', userSchema);
