const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '5d98fb69a094ae2528ac283f',
  };
  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
