const router = require('express').Router();
const objects = require('./objects');

// const controller = require('../controllers');

router.use('/objects', objects);

module.exports = router;
