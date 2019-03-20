var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var options = require('./auth').sendgrid;
console.log(options);
var mailer = nodemailer.createTransport(sgTransport(options));
var emailSender = {};
emailSender.sendEmail = function (user) {
    console.log(user);
    var email = {
        from: 'do-not-reply@friendlist.com',
        to: user.email,
        subject: 'Welcome '+user.name, // Subject line
        text: 'Hi, welcome ' + user.name
    };
    mailer.sendMail(email,function(e,r){
        console.log(e,r);
    });
}
module.exports = emailSender;