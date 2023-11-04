const router = require('express').Router();
const bodyParser = require('body-parser');

const { requiresAuth } = require('express-openid-connect');
const controller = require('../controllers');
const studentsValidator = require('../validators/studentsValidator');

router.get('/', controller.students.getAllStudents);
router.get('/:id', controller.students.getStudentById);
router.post(
  '/',
  requiresAuth(),
  bodyParser.json(),
  studentsValidator.validateStudentCreation,
  studentsValidator.validate,
  controller.students.addNewStudent,
);
router.put(
  '/:id',
  requiresAuth(),
  bodyParser.json(),
  studentsValidator.validateStudentUpdate,
  studentsValidator.validate,
  controller.students.updateStudent,
);
router.delete('/:id', requiresAuth(), controller.students.deleteStudent);

module.exports = router;
