var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

passport.use('local',new LocalStrategy({
    usernameField:'email',
    passwordField:'password'
},
    function (email, password, done) {
        User.findOne({ email: email }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));

passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
            function (req, email, password, done) {
                if (email)
                    email = email.toLowerCase();
                process.nextTick(function () {
                    if (!req.user) {
                        User.findOne({ 'email': email }, function (err, user) {
                            if (err) 
                                return done(err);
                            if (user) {
                                return done(null, false,  { message: 'Email already exists.'});
                            } else {
                                var newUser = new User();
                                newUser.name = req.body.name
                                newUser.email = email;
                                newUser.password = newUser.generateHash(password);
                                newUser.save(function (err) {
                                    if (err)
                                        return done(err);
                                    return done(null, newUser);
                                });
                            }
    
                        });
                    } else if (!req.user.email) {
                        User.findOne({ 'email': email }, function (err, user) {
                            if (err)
                                return done(err);
    
                            if (user) {
                                return done(null, false, { message: 'Email already exists.'});
                            } else {
                                var user = req.user;
                                user.name = req.body.name;
                                user.email = email;
                                user.password = user.generateHash(password);
                                user.save(function (err) {
                                    if (err)
                                        return done(err);
    
                                    return done(null, user);
                                });
                            }
                        });
                    } else {
                        return done(null, user);
                    }
                });
    
            }));
    


passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
  
  passport.deserializeUser(function(id, done) {
      console.log("Deserialize",id)
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });



























// var passport = require('passport')
// var LocalStrategy = require('passport-local').Strategy;
// var FacebookStrategy = require('passport-facebook').Strategy;
// var User = require('../models/user');
// var configAuth = require('./auth');
// module.exports = function (passport) {

//     passport.serializeUser(function (user, done) {
//         done(null, user);
//     });

//     passport.deserializeUser(function (id, done) {
//         console.log(id,"Deserialize")
//         User.findById(id, function (err, user) {
//             done(err, user);
//         });
//     });

//     passport.use('local',new LocalStrategy({
//         usernameField:'email',
//         passwordField:'password'
//     },
//         function (email, password, done) {
//             User.findOne({ email: email }, function (err, user) {
//                 if (err) { return done(err); }
//                 if (!user) {
//                     return done(null, false, { message: 'Incorrect username.' });
//                 }
//                 if (!user.validPassword(password)) {
//                     return done(null, false, { message: 'Incorrect password.' });
//                 }
//                 return done(null, user);
//             });
//         }
//     ));
    

//     passport.use('local-login', new LocalStrategy({
//         usernameField: 'email',
//         passwordField: 'password',
//         passReqToCallback: true
//     },
//         function (req, email, password, done) {
//             if (email)
//                 email = email.toLowerCase();
//             process.nextTick(function () {
//                 User.findOne({ 'email': email }, function (err, user) {
//                     if (err)
//                         return done(err);
//                     if (!user)
//                         return done(null, false, { message: 'No user found.'});
//                     if (!user.validPassword(password))
//                         return done(null, false, { message: 'Oops! Wrong password.'});
//                     else
//                         return done(null, user);
//                 });
//             });

//         }));

//     passport.use('local-signup', new LocalStrategy({
//         usernameField: 'email',
//         passwordField: 'password',
//         passReqToCallback: true
//     },
//         function (req, email, password, done) {
//             if (email)
//                 email = email.toLowerCase();
//             process.nextTick(function () {
//                 if (!req.user) {
//                     User.findOne({ 'email': email }, function (err, user) {
//                         if (err) 
//                             return done(err);
//                         if (user) {
//                             return done(null, false,  { message: 'Email already exists.'});
//                         } else {
//                             var newUser = new User();
//                             newUser.name = req.body.name
//                             newUser.email = email;
//                             newUser.password = newUser.generateHash(password);
//                             newUser.save(function (err) {
//                                 if (err)
//                                     return done(err);
//                                 return done(null, newUser);
//                             });
//                         }

//                     });
//                 } else if (!req.user.email) {
//                     User.findOne({ 'email': email }, function (err, user) {
//                         if (err)
//                             return done(err);

//                         if (user) {
//                             return done(null, false, { message: 'Email already exists.'});
//                         } else {
//                             var user = req.user;
//                             user.name = req.body.name;
//                             user.email = email;
//                             user.password = user.generateHash(password);
//                             user.save(function (err) {
//                                 if (err)
//                                     return done(err);

//                                 return done(null, user);
//                             });
//                         }
//                     });
//                 } else {
//                     return done(null, false, { message: 'Email already exists.'});
//                 }
//             });

//         }));

//     var fbStrategy = configAuth.facebookAuth;
//     fbStrategy.passReqToCallback = true;
//     passport.use(new FacebookStrategy(fbStrategy,
//         function (req, token, refreshToken, profile, done) {
//             process.nextTick(function () {
//                 if (!req.user) {
//                     User.findOne({ 'id': profile.id }, function (err, user) {
//                         if (err)
//                             return done(err);
//                         if (user) {

//                             if (!user.token) {
//                                 user.token = token;
//                                 user.name = profile.name.givenName + ' ' + profile.name.familyName;
//                                 user.email = (profile.emails[0].value || '').toLowerCase();

//                                 user.save(function (err) {
//                                     if (err)
//                                         return done(err);

//                                     return done(null, user);
//                                 });
//                             }

//                             return done(null, user);
//                         } else {
//                             var newUser = new User();

//                             newUser.id = profile.id;
//                             newUser.token = token;
//                             newUser.name = profile.name.givenName + ' ' + profile.name.familyName;
//                             newUser.email = (profile.emails[0].value || '').toLowerCase();

//                             newUser.save(function (err) {
//                                 if (err)
//                                     return done(err);

//                                 return done(null, newUser);
//                             });
//                         }
//                     });

//                 } else {
//                     var user = req.user;
//                     user.id = profile.id;
//                     user.token = token;
//                     user.name = profile.name.givenName + ' ' + profile.name.familyName;
//                     user.email = (profile.emails[0].value || '').toLowerCase();

//                     user.save(function (err) {
//                         if (err)
//                             return done(err);

//                         return done(null, user);
//                     });

//                 }
//             });

//         }));
// };