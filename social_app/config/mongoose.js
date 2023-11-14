const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/socialapp_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to Mongo DB"));
db.once('open',function(){
    console.log('Connected to mongodb');
});

module.exports = db;