const express = require('express');
const mongoose = require('mongoose')
const app = express();
const registerRouter = require('./routes/register')
const loginRouter = require('./routes/login')

mongoose.connect('mongodb://localhost/appdb')

app.use(express.urlencoded({extended : false}))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

app.use('/register', registerRouter);
app.use('/login', loginRouter);

app.listen(3000);