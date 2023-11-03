const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    text:{
        type:String,
        required: true
    },
    date:{
        type:Date,
        required:true
    }
});


const todo = mongoose.model('Contact', todoSchema);

module.exports = todo;