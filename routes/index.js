const router = require('express').Router();
const auth0 = require('./auth0');
const objects = require('./objects');
const swagger = require('./swagger');

router.use('/', auth0);
router.use('/objects', objects);
router.use('/', swagger);

module.exports = router;
