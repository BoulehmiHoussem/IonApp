var express     = require('express');
var bodyParser  = require('body-parser');
var passport    = require('passport');
var mongoose    = require('mongoose');
var config      = require('../src/config/config');
var port        = process.env.PORT || 5000;

var app = express();

app.use(passport.initialize());
var passportMiddleware = require('./middlewares/passeport');
passport.use(passportMiddleware);

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());



app.get('/', function(req, res) {
    return res.send('Hello , API running on Localhost:'+port+'/api');
});


var routes = require('./routes.js');
app.use('/api', routes);


mongoose.connect(config.db, {useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;

connection.once('open', () => {
    console.log(' Mongodb database connected succesfully');
});

connection.on('error', (err) => {
    console.log('Mongodb failed to connect :'+err);
    process.exit();
});

app.listen(port);