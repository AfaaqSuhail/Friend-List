var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var events = require('events');
var mailer = require('./config/mailer');
var eventEmitter = new events.EventEmitter();
eventEmitter.on('UserEvent', function (user) {
    mailer.sendEmail(user);
});
global.eventEmitter = eventEmitter;
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var configDB = require('./config/database.js');
mongoose.connect(configDB.url);
require('./config/passport')(passport);
// app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.set('view engine', 'ejs');
app.use(session({
    secret: 'purelogic',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, Cache-Control, X-Requested-With, Content-Type, Accept, Authorization");
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.sendStatus(200);
    } else {
      next();
    }
  
  });
require('./app/routes.js')(app, passport, eventEmitter);
app.listen(port);
console.log('app started at: ' + port);