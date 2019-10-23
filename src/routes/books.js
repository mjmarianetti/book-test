'use strict';

const express = require('express');
const router = express('Router');

module.exports = (models, passport) => {

    const controller = require('../controllers/books')(models);
    const middlewares = require('../middlewares')(models, passport);

    const ctrl = new controller();

    router.get('/', middlewares.Auth.loadUser, (req, res, next) => ctrl.list(req, res, next));
    return router;
};