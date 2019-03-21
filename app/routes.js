var User = require('../models/user');
var jwt = require('jsonwebtoken');
module.exports = function (app, passport, eventEmitter) {

    app.post('/signup', (req, res, next) => {
        passport.authenticate('local-signup', function (err, user, info) {
            if (err) { return res.status(501).json(err); }
            if (!user) {
                return res.status(400).send({
                    status: 400,
                    message: info.message
                });
            }
            req.logIn(user, function (err) {
                if (err) { return res.status(501).json(err); }
                return res.status(200).send({
                    status: 200,
                    user: user,
                });
            });
        })(req, res, next);
    });

    app.get('/me',(req,res) => {
        res.status(200).send({
            status: 200,
            user: req.user
        })
    })


    app.post('/login', (req, res, next) => {
        passport.authenticate('local', function (err, user, info) {
            if (err) { return res.status(501).json(err); }
            if (!user) {
                return res.status(400).send({
                    status: 400,
                    message: info.message
                });
            }
            req.logIn(user, function (err) {
                if (err) { return res.status(501).json(err); }
                user = user.toObject();
                delete user["password"];
                return res.status(200).send({
                    status: 200,
                    user: user
                });
            });
        })(req, res, next);
    });

    app.get('/profile', isLoggedIn, function (req, res, next) {
        User.find({ _id: { $ne: req.user._id } }).then((users) => {
            res.status(200).send({
                staus: 200,
                users: users
            })
        })
    })

    app.post('/friends/:friendId', async (req, res) => {
        User.findByIdAndUpdate(req.body.userId,
            { $addToSet: { friends: [req.params.friendId] } },
            { safe: true, upsert: true },
            function (err, doc) {
                if (err) {
                    res.status(201).send({
                        status: 201,
                        message: err
                    })
                } else {
                    res.status(200).send({
                        status: 200,
                        user: doc
                    })
                }
            }
        );

    });

    app.get('/friends', isLoggedIn, async (req, res) => {
        let users = await User.find({ _id: { $in: req.user.friends } })
        res.status(200).send({
            staus: 200,
            users: users
        })
    })


    app.get('/logout', function (req, res) {
        req.logout();
        res.status(200).send({
            status: 200,
            message: "successfuly logout"
        })
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
    res.status(400).send({
        status: 400,
        message: 'Unauthorized request'
    });
}