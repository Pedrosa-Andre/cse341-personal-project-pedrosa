const router = require('express').Router();
const auth0 = require('./auth0');
const objects = require('./objects');
const students = require('./students');
const swagger = require('./swagger');

router.use('/', auth0);
router.use('/objects', objects);
router.use('/students', students);
router.use('/', swagger);

module.exports = router;
