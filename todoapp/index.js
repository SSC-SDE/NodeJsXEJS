const express = require('express');
const port = 7000;
const path = require('path');






const app = express();
app.use(express.static('assets'));
app.use('/', require('./routes'));
app.set('view engine','ejs');
app.use(express.urlencoded());
app.set('views', './views');

//Using Express Router
app.use('/', require('./routes'));



//Server
app.listen(port,function(error){
    if(error){
        console.log("Not running" + error);
    }
    console.log("running on 7000");
})