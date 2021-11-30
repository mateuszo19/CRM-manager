const express = require('express');
const hbs = require('express-handlebars');
const methodOverride = require('method-override');
const {clientRouter} = require('./routers/client');
const {homeRouter} = require('./routers/home');
const {db} = require('./utils/db');
const {v4: uuid} = require('uuid');
const {handleError} = require('./utils/errors')
//*****************************************
let today = new Date();
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
const logTime = `[${date} || ${time}]`;
//*****************************************
const app = express();

app.use(methodOverride('_method'));
app.use(express.urlencoded({
        extended: true,
    }))
app.use(express.static('public'))
app.use(express.json())

//Konifguracja handlebars

app.engine('.hbs', hbs({
    extname: '.hbs',
    //helpers: handlebarsHelpers,
}));
app.set('view engine', '.hbs');

app.use('/', homeRouter);
app.use('/client', clientRouter);

app.use(handleError);

app.listen(3000, 'localhost', () => {
    console.log(`Listening on port http://localhost:3000/ - ${logTime}`);
})
