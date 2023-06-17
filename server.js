const express = require('express');
const mongoose = require('mongoose')
const app = express();
const registerRouter = require('./routes/register')
const loginRouter = require('./routes/login')
const dashboardRouter = require('./routes/dashboard')
const path = require('path')
const cookie_parser = require('cookie-parser')

mongoose.connect('mongodb+srv://lodhdwipshikha:Dlodh%4001@cluster0.7tynimk.mongodb.net/appdb?retryWrites=true&w=majority')

app.use(express.urlencoded({extended : false}))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

app.use(express.static(path.join(__dirname, 'public')));


app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/dashboard', dashboardRouter);

app.listen(3000);