const router = require('express').Router();
const bodyParser = require('body-parser');

const { validationResult } = require('express-validator');
const controller = require('../controllers/objects');
const objectsValidator = require('../validators/objectsValidator');

router.get('/', controller.getAllObjects);
router.get('/:id', controller.getObjectById);
router.post(
  '/',
  bodyParser.json(),
  objectsValidator.validateObjectCreation,
  objectsValidator.validate,
  controller.addNewObject,
);
router.put(
  '/:id',
  bodyParser.json(),
  objectsValidator.validateObjectUpdate,
  objectsValidator.validate,
  controller.updateObject,
);
router.delete('/:id', controller.deleteObject);

module.exports = router;
