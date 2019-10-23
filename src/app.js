'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const passport = require('passport');
const app = express();
const db = require('./models')();
const routes = require('./routes')(db, passport);
const middlewares = require('./middlewares')(db, passport);
const ResponseHelper = require('./helpers/response-helper')();


app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
passport.use('login', middlewares.Auth.login);
passport.use(middlewares.Auth.verify);
app.use('/', routes);

app.use((req, res) => {   
    return ResponseHelper.internalError(req, res, "Error");
});

module.exports = app;