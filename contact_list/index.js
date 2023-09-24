const express = require('express');
const { readdir } = require('fs');
const path = require('path');
const port = 8000;

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

var contactList = [
    {
        name: "Shankhya",
        phone: "123456789"
    },
    {
        name: "Tony",
        phone: "12222222"
    },
    {
        name: "John Snow",
        phone: "2441139"
    }

]



app.get('/', function(req,res){
    //console.log('from the get route controller',req.myName);
    return res.render('home', {

        title:"contact_list",
        contact_list: contactList
    });
});

app.post('/create-contact', function(req,res){
//    contactList.push({
//         name: req.body.name,
//         phone: req.body.phone
//    });

   contactList.push(req.body);

   return res.redirect('back');

});
//for deleting a contact get the query from the url, find the index if not -1 delete.
app.get('/delete-contact',function(req,res){
    
    let phone = req.query.phone;

    let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    if (contactIndex != -1){
        contactList.splice(contactIndex, 1);
    }

    return res.redirect('back');

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