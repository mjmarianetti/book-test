'use strict';

const express = require('express');
const router = express('Router');

module.exports = (models, passport) => {

  const books = require('./books')(models, passport);
  router.use('/books', books);

  const users = require('./users')(models, passport);
  router.use('/users', users);

  return router;
};