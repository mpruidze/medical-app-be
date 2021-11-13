const express = require('express');
const router = express.Router();

// importing controllers
const {
    allVisits,
    newVisit,
    updatedVisit,
    deletedVisit,
  } = require('../controllers/visit.controller');

// visit routes
router.get('/', allVisits);
router.post('/', newVisit);
router.put('/:id', updatedVisit);
router.delete('/:id', deletedVisit);

module.exports = router;
