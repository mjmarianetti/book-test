"use strict";
const config = require('../config/app');
const mongoose = require('mongoose');

module.exports = () => {

    mongoose.set('debug', config.application.debugEnabled);

    mongoose.connect(config.database.host, config.database.options);
    mongoose.connection.on('error', (err) => {
        if (config.application.debugEnabled) {
            console.log('MongoDB connection error:', err)
        }
    });
    mongoose.connection.once('open', () => {
        if (config.application.debugEnabled) {
            console.log("Connected successfully to database");
        }
    });

    mongoose.model('Book', require('./book')(mongoose), 'books');
    mongoose.model('User', require('./user')(mongoose), 'users');
    mongoose.model('Institution', require('./institution')(mongoose), 'institutions');

    return mongoose;
};