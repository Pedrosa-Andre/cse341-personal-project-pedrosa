const router = require('express').Router();
const bodyParser = require('body-parser');

const { requiresAuth } = require('express-openid-connect');
const controller = require('../controllers/objects');
const objectsValidator = require('../validators/objectsValidator');

router.get('/', controller.getAllObjects);
router.get('/:id', controller.getObjectById);
router.post(
  '/',
  requiresAuth(),
  bodyParser.json(),
  objectsValidator.validateObjectCreation,
  objectsValidator.validate,
  controller.addNewObject,
);
router.put(
  '/:id',
  requiresAuth(),
  bodyParser.json(),
  objectsValidator.validateObjectUpdate,
  objectsValidator.validate,
  controller.updateObject,
);
router.delete('/:id', requiresAuth(), controller.deleteObject);

module.exports = router;
