require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');

const booksRouter = require('./routes/books');
const tokensRouter = require('./routes/tokens');
const {usersRouter, registerRouter} = require('./routes/users');
const logger = require('./lib/logger');
const tokenAuth = require('./lib/token-auth');
const findUser = require('./lib/find-user');
const serveStatic = require('serve-static');

const app = express();

app.use(logger);
app.use(serveStatic(path.join(__dirname, 'public')));

app.use(cors({
  origin: '*'
}));


app.use('/tokens', tokensRouter);
app.use('/register', registerRouter);
app.use(tokenAuth(findUser.byToken));
app.use('/books', booksRouter);
app.use('/users', usersRouter);


app.use((err, req, res, next) => {
  res.status(500).send(err)
})

app.listen(8080);