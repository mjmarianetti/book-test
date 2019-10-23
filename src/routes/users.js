'use strict';

const express = require('express');
const router = express('Router');

module.exports = (models, passport) => {

    const controller = require('../controllers/users')(models, passport);

    const ctrl = new controller();

    router.post('/create', (req, res, next) => ctrl.create(req, res, next));
    router.post('/signin', passport.authenticate('login', {
        session: false
    }), (req, res, next) => ctrl.signin(req, res, next));


    return router;
};