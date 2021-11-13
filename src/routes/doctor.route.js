const express = require('express');
const router = express.Router();

const {
    allDoctors,
    newDoctor,
  } = require('../controllers/doctor.controller');

router.get('/', allDoctors);
router.post('/', newDoctor);

module.exports = router;
