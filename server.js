var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var passport = require('passport');
var events = require('events');
var mailer = require('./config/mailer');
var cors = require('cors')
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
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const MongoStore = require('connect-mongo')(session);

app.use(session({
    name: 'pl.sid',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 36000000,
      httpOnly: false,
      secure: false
    },
    secret: 'purelogic',
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
require('./config/passport')
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(cors({
  origin:['http://localhost:4200','http://localhost:4200/login','http://127.0.0.1:4200'],
  credentials:true
}));

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header("Access-Control-Allow-Headers", "Origin, Cache-Control, X-Requested-With, Content-Type, Accept, Authorization");
//     // intercept OPTIONS method
//     if ('OPTIONS' == req.method) {
//       res.sendStatus(200);
//     } else {
//       next();
//     }
  
//   });
require('./app/routes.js')(app, passport, eventEmitter);
app.listen(port);
console.log('app started at: ' + port);