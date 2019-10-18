const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

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

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth)

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
