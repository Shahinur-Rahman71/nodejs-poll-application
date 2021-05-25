require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose'); // aita diya database er sathe communication kora jai
const allController = require('./controller/pollController');
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


//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';

// connect to database
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log('Connected to MongoDB');
});

app.get('/',(req, res) => {
    res.render('create')
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


