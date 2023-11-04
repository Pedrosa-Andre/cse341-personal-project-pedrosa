const { check, validationResult } = require('express-validator');
const Api422Error = require('../error_handling/api422Error');

const emailPattern = /.+@.+\..+/;

const validateStudentCreation = [
  check('first_name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Student first name is too short.'),
  check('last_name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Student last name is too short.'),
  check('email').matches(emailPattern).withMessage('Invalid email format.'),
  check('age', 'Age is required.')
    .notEmpty()
    .isInt({ min: 14 })
    .withMessage('Age must be a number higher than 13.'),
  check('gender')
    .trim()
    .toLowerCase()
    .isIn(['male', 'female'])
    .withMessage('Please enter one of the following options: male, female'),
  check('major', 'A major is required')
    .trim()
    .isLength({ min: 5 })
    .withMessage('The major name is too short'),
  check('year', 'Entry year is required.')
    .notEmpty()
    .isInt({ min: 2000, max: 2024 })
    .withMessage('Entry year must be a number between 2000 and 2024.'),
];

const validateStudentUpdate = [
  check('first_name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Student first name is too short.')
    .optional(),
  check('last_name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Student last name is too short.')
    .optional(),
  check('email')
    .matches(emailPattern)
    .withMessage('Invalid email format.')
    .optional(),
  check('age', 'Age must not be empty.')
    .notEmpty()
    .isInt({ min: 14 })
    .withMessage('Age must be a number higher than 13.')
    .optional(),
  check('gender')
    .trim()
    .toLowerCase()
    .isIn(['male', 'female'])
    .withMessage('Please enter one of the following options: male, female')
    .optional(),
  check('major', 'Major must not be empty')
    .trim()
    .isLength({ min: 5 })
    .withMessage('The major name is too short')
    .optional(),
  check('year', 'Entry year must not be empty')
    .notEmpty()
    .isInt({ min: 2000, max: 2024 })
    .withMessage('Entry year must be a number between 2000 and 2024.')
    .optional(),
];

const validate = (req, res, next) => {
  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  validationErrors
    .array()
    .map((err) => extractedErrors.push({ [err.path]: err.msg }));
  console.log(validationErrors);
  return next(
    new Api422Error(
      'Validation Error',
      JSON.stringify({ errors: extractedErrors }),
    ),
  );
};

module.exports = {
  validateStudentCreation,
  validateStudentUpdate,
  validate,
};
