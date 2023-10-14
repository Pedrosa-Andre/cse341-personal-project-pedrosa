const router = require('express').Router();
const bodyParser = require('body-parser');

const controller = require('../controllers/objects');

router.get('/', controller.getAllObjects);
router.get('/:id', controller.getObjectById);
router.post('/', bodyParser.json(), controller.addNewObject);

module.exports = router;
