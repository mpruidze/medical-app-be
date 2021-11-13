require("dotenv").config();
require('./passport');
require('./data/db');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const passport = require('passport');

const auth = require('./routes/auth.route');
const user = require('./routes/user.route');
const visit = require('./routes/visit.route');
const doctor = require('./routes/doctor.route');

mongoose.connect(process.env.URI, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.json());

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use('/auth', auth);
app.use(passport.initialize());
app.use('/user/:id', passport.authenticate('jwt', {session: false}), user);
app.use('/visit', passport.authenticate('jwt', {session: false}), visit);
app.use('/doctor', passport.authenticate('jwt', {session: false}), doctor);

module.exports = app;
