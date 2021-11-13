const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Validate = require('../libs/validate');
const bcrypt = require('bcrypt');

// login
router.post('/login', (req, res) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) return res.status(404).json({
      message: 'неверное имя пользователя или пароль',
      error: "Not found",
      statusCode: "404",
    });
    if (err) res.send(err);
    const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_TTL });
    return res.json({ user: {_id: user._id, username: user.username}, token, note: "pass this token in header as a bearerToken :)))" });
  })(req, res);
});

// sign up
router.post('/', async (req, res, next) => {
  try {
    if (
      Object.keys(req.body.username).length == 0 ||
      Object.keys(req.body.password).length == 0
      ) {
      throw {
        message: 'пожалуйста, заполните все поля',
        error: "Bad request",
        status: '400',
      };
    }
    if (!/\w{6,}/.test(req.body.username)) {
      throw {
        message: `пожалуйста, введите правильнное имя пользователя`,
        error: 'Bad Request',
        status: '400',
      };
    }
    const userUsername = await User.find({ username: req.body.username });
    if (userUsername.length > 0) {
      throw {
        message: `${req.body.username} уже используется`,
        error: 'Conflict',
        status: '409',
      };
    }

    const invalidParameters = Validate.checkParamsPresent(req.body, ['username', 'password']);
    if (invalidParameters.length > 0) {
      throw {
        message: "invalid parameters: " + invalidParameters,
        error: "Bad request",
        status: '400',
      };
    }
    const user = new User({
      'username': req.body.username,
      'password': req.body.password,
    });
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;

    user.save((err, user) => {
      if (err) return next(err);
      res.send({
        result: {username: user.username},
      });
    });
  } catch (error) {
        if (error.status == '400') {
          res.status(error.status)
             .send(error);
        } else if (error.status == '409') {
          res.status(error.status)
             .send(error);
        } else {
          res.status('500')
             .send({
                message: error.message,
                error: "Internal server",
                status: 500,
             });
        }
  }
});

module.exports = router;
