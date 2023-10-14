const router = require('express').Router();
const objects = require('./objects');
const swagger = require('./swagger');

router.use('/objects', objects);
router.use('/', swagger);

module.exports = router;
