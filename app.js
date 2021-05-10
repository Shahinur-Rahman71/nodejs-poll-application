const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose'); // aita diya database er sathe communication kora jai
const allController = require('./controller/pollController');
const port = process.env.port || 4050
const app = express();//aitar kaj muloto : route handle kora,middleware function niya kaj kora
// and templete engine niya kaj kora

app.set('view engine', 'ejs');
// app.set('views', 'templates');// views folder and templates directory;
// by default express application a sobkisu thake views directory te;

app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());



app.get('/create', allController.createPollGetController)
app.post('/create', allController.createPollPostController)
app.get('/polls', allController.getallPolls)
app.get('/polls/:id', allController.viewPollGetController)
app.post('/polls/:id', allController.viewPollPostController)

app.get('/',(req, res) => {
    res.render('create')
})

mongoose.connect('mongodb://localhost:27017/test')
    .then( () => {
        app.listen(port,()=> {
            console.log(`Application is ready to serve on port ${port}`)
        }) 
    })
    .catch(err =>{
        console.log(err)
    })

