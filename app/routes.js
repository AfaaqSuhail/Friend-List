var User = require('../models/user');
var jwt = require('jsonwebtoken');
module.exports = function (app, passport, eventEmitter) {

    app.post('/create-user', async (req,res) => { 
        let user = await User.create(req.body).catch((err) => {
            res.status(400).send({
              error:"Email already exist"
            })
          });
          return res.json({
            body: {
              user: user
            }
          })
    })


    app.get('/profile', isLoggedIn, function (req, res) {
        User.find({ _id: { $ne: req.user._id } }).then(function (users) {
            res.render('profile.ejs', {
                user: req.user,
                users: users
            });
        });
    });

    // app.post('/login', (req,res) => {
    //     res.send({
    //         user: req.email
    //     })
    // })

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/user',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get('/user', (req,res) => {
        console.log("Reqqqqqqqqqqqqqqqqqqqqqqqqqqqqques",req)
       res.send({
           status: 200,
           user: req.user
       })
    })

    app.get('/signup-user', (req,res) => {   
        console.log(req.user) 
    //    res.send({
    //        status: 200,
    //        user: req.user
    //    })
    })
    
    app.get('/login', function (req, res) {
        res.status(400).send({
            status: 400,
            message: "Invalid username or password"
        })
    });


    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/signup-user',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    app.get('/signup', (req,res) =>{
      
        res.status(400).send({
            status: 400,
            message: "Email already exist"
        })
     })

    app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));


    app.get('/friends', isLoggedIn, function (req, res) {
        User.find({ _id: { $in: req.user.friends } }).then(function (users) {
            res.render('friends.ejs', {
                user: req.user,
                users: users
            });
        });
    });


    app.post('/friends', isLoggedIn, function (req, res) {
        User.update({ _id: req.user._id }, { $addToSet: { friends: req.body.friendId } }, { multi: false }).then(function () {
            res.redirect('/friends');
        });
    });

    app.get('/user/:id', function (req, res) {
        User.findOne({ _id: req.params.id }, function (err, user) {
            if (err || !user) {
                res.json({ message: 'user not found' })
            } else {
                var token = jwt.sign(user, 'shhhhh');
                res.send({ message: 'success', token: token });
            }
        });
    });

  

};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}