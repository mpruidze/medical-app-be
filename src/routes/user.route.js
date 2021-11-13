const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user.controller');
const visit = require('./visit.route');

router.get('/profile', user_controller.profile);

module.exports = router;
