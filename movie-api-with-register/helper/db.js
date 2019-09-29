const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://admin:admin123@ds021663.mlab.com:21663/heroku_hwmj60vt');

    mongoose.connection.on('open', () => {
       console.log('MongoDB : Connected....');
    });

    mongoose.connection.on('error', (err) => {
       console.log('MongoDB : Connection Error....', err);
    });

    mongoose.Promise = global.Promise;
};