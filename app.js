const express= require("express");
const path= require("path");
const fs= require("fs");
const app= express();
const port= 3000;

const bodyParser= require("body-parser");

//Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: true });

// main().catch(err => console.log(err));
// async function main() {
//   await mongoose.connect('mongodb://localhost:3000/contactDance');
// }

//Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    description: String
});

const Contact = mongoose.model('Contact', contactSchema);


//EXPRESS specific stuff
app.use('/static', express.static('static'));   //Serving Static files (Client side available to all)
app.use(express.urlencoded());   //Taking inputs from the Form


//PUB specification stuff
app.set('view engine', 'pug');    //Set the template engine as PUG
app.set('views', path.join(__dirname, 'views'));   //Set the views directory

//ENDPOINTS
app.get('/', (req, res) => {
    const params= {};
    res.status(200).render('home.pug', params);
});

app.get('/contact', (req, res) => {
    const params= {};
    res.status(200).render('contact.pug', params);
});

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body); 
    myData.save().then(()=>{
        res.send("This item has been saved to the database");
    }).catch(()=>{
        res.status(400).send("Unable to save to database");
    });

    // res.status(200).render('contact.pug');
});


//Start the Server
app.listen(port, ()=> {
    console.log(`Server is running on port: ${port}`);
});