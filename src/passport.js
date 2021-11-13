const passport = require('passport');
const User = require('./models/user.model');
const localStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require('bcrypt');

passport.use(new localStrategy({
  usernameField: 'username',
  passwordField: 'password',
},
  (username, password, cb) => {
  return User.findOne({ username: username})
         .then( async user => {
            const compare = await bcrypt.compare(password, user.password);
            if (!compare) return cb(null, false, { message: 'incorrect username or password' });
            return cb(null, user, { message: 'Logged in' });
         })
         .catch(err => cb(err));
  }
));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
},
  (jwtPayload, cb) => {
    return User.findById(jwtPayload._id)
           .then(user => {
             return cb(null, user);
           })
           .catch(err => {
             return cb(err);
           });
  }
));
