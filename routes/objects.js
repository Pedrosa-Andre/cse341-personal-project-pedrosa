const router = require('express').Router();
const bodyParser = require('body-parser');

const { requiresAuth } = require('express-openid-connect');
const controller = require('../controllers');
const objectsValidator = require('../validators/objectsValidator');

router.get('/', controller.objects.getAllObjects);
router.get('/:id', controller.objects.getObjectById);
router.post(
  '/',
  requiresAuth(),
  bodyParser.json(),
  objectsValidator.validateObjectCreation,
  objectsValidator.validate,
  controller.objects.addNewObject,
);
router.put(
  '/:id',
  requiresAuth(),
  bodyParser.json(),
  objectsValidator.validateObjectUpdate,
  objectsValidator.validate,
  controller.objects.updateObject,
);
router.delete('/:id', requiresAuth(), controller.objects.deleteObject);

module.exports = router;
