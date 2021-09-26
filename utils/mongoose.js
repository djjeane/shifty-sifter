const mongoose = require('mongoose');


module.exports = {
    init: () =>{
        const dbOptions = {
            useNewUrlParser : true,
            autoIndex: false,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 500,
            poolSize: 5,
            connectTimeoutMS: 10000,
            family: 4
        };
        var env = require('dotenv').config();
        mongoose.connect(process.env.DB_URI, dbOptions);
        
        mongoose.set('useFindAndModify', false);
        mongoose.promise = global.promise;
        mongoose.connection.on('connected', () => {
            console.log('Mongoose connection initiated.');
        });
        mongoose.connection.on('err', err => {
            console.log(`Mongoose connection error: \n ${err.stack}`);
        });
        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose connection disconnected.');
        });
    }
}