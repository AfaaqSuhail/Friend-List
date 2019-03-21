var User = require('../models/user');
var jwt = require('jsonwebtoken');
module.exports = function (app, passport, eventEmitter) {

    app.post('/signup', (req,res,next) => {
        passport.authenticate('local-signup', function(err, user, info) {
          if (err) { return res.status(501).json(err); }
          if (!user) { return res.status(400).send({
              status: 400,
              message: info.message
          }); }
          req.logIn(user, function(err) {
            if (err) { return res.status(501).json(err); }
            return res.status(200).send({
                status: 200,
                user: user,
            });
          });
        })(req, res, next);
      });


      app.post('/login',(req,res,next) => {
        passport.authenticate('local', function(err, user, info) {
          if (err) { return res.status(501).json(err); }
          if (!user) { return res.status(400).send({
              status: 400,
              message: info.message
          }); }
          req.logIn(user, function(err) {
            if (err) { return res.status(501).json(err); }
            return res.status(200).send({
                status: 200,
                user: user,
            });
          });
        })(req, res, next);
      });

      app.get('/me',isLoggedIn, async (req,res,next) => {
          return res.status(200).json(req.user)(req, res, next);
      })


    app.get('/profile', isLoggedIn,function (req, res, next){
        User.find({ _id: { $ne: req.user._id } }).then((users)=>{
            res.status(200).send({
                staus: 200,
                users: users
            })
        })
    })

    app.post('/friends/:friendId',(req, res, next) =>{
        User.update({ _id: req.user._id }, { $addToSet: { friends: req.params.friendId } }, { multi: false }) 
        res.status(200).send({
            status: 200,
            message: "Ok kro"
        })
    });
    


    // app.get('/friends', isLoggedIn, function (req, res) {
    //     User.find({ _id: { $in: req.user.friends } }).then(function (users) {
    //         // res.render('friends.ejs', {
    //         //     user: req.user,
    //         //     users: users
    //         // });
    //     })(req, res, next);
    // });

    
        app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

        app.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                successRedirect: '/profile',
                failureRedirect: '/'
            }));
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
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
    res.status(400).send({
        status: 400,
        message: 'Unauthorized request'
    });
}