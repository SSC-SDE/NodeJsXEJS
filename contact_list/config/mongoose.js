//Required the library
const mongoose = require('mongoose');
//Connect to the db

mongoose.connect('mongodb://127.0.0.1:27017/contacts_list_db');
//accquire connection to check if if successfull

const db = mongoose.connection;
//error
db.on('error', console.error.bind(console, 'error connecting to db'));

//success
db.once('open', function(){
    console.log('Successfully connected to the db');
}); 