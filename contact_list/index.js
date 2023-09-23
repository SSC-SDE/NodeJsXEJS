const express = require('express');
const path = require('path');
const port = 8000;

const app = express();


app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', function(req,res){
    
    return res.render('home', {title:"I am flying"});
});

app.get('/practice', function(req, res){
    return res.render('practice', {
        title: "Contact List"
    });
});






app.listen(port, function(err){
    if(err){
        console.log('Error boy', err);
    };

    console.log('Yo my express server is running on :', port);
});