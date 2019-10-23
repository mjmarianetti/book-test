"use strict";

module.exports = (models,passport) => {

    let middlewares = {};

    middlewares.Auth = require('./auth')(models,passport);

    return middlewares;
};