const express = require('express');
const { readdir } = require('fs');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

//middleware custom
// app.use(function(req, res, next){
//     req.myName="Shankhya"
//     // console.log('middleware 1 called');
//     next();
// });

// //middleware 2
// app.use(function(req, res,next){
//     console.log('My Name from MW2', req.myName);
//     // console.log('middleware 2 called');
//     next();
// });

// var contactList = [
//     {
//         name: "Shankhya",
//         phone: "123456789"
//     },
//     {
//         name: "Tony",
//         phone: "12222222"
//     },
//     {
//         name: "John Snow",
//         phone: "2441139"
//     }

// ]



//C:\Program Files\MongoDB\Server\7.0\data\

app.get('/', function(req,res){
    //console.log('from the get route controller',req.myName);
    
    Contact.find({},function(err,contacts){
        if(err){
            console.log('Error when fetching contact from db');
            return;
        }
        return res.render('home', {
        
            title:"contact_list",
            contact_list: contacts
        });
    }) 
    

});


app.post('/create-contact', function(req,res, next){
 
    Contact.create({
    name: req.body.name,
    phone: req.body.phone
   }, function (err, newContact) {
           if (err) { console.log('error in creating a contact!'); return; };

           console.log('********', newContact);
           return res.redirect('back');
       });
    
});
//for deleting a contact get the query from the url, find the index if not -1 delete.
app.get('/delete-contact',function(req,res){
    //get the id form quering the url 
    let id = req.query.id;
    
    
    //find the contact in the db using id and delete
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log("Error executing delete command in DB");
            return;
        }
        return res.redirect('back');
    });

   
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