const { check, validationResult } = require('express-validator');
const ObjectId = require('mongodb').ObjectId;
const mongodb = require('../db/connect');
const Api422Error = require('../error_handling/api422Error');

const isValidUser = async (value) => {
  const user = await mongodb
    .getDb()
    .db('per_proj_db')
    .collection('students')
    .findOne({ _id: new ObjectId(value) });
  if (!user) {
    throw new Error('Student id does not exist');
  }
};

const iso8601Pattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;

const validateObjectCreation = [
  check('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Object name is too short.'),
  check('description')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Description value is too short.'),
  check('location_found')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Location value is too short.'),
  check('found_by')
    .notEmpty()
    .withMessage('Student id is required.')
    .custom(isValidUser),
  check('date_found')
    .matches(iso8601Pattern)
    .withMessage(
      'Invalid date format. Please provide a date in ISO 8601 pattern.',
    ),
  check('retrieved_by')
    .notEmpty()
    .withMessage('Student id is required.')
    .custom(isValidUser)
    .optional(),
  check('date_retrieved')
    .matches(iso8601Pattern)
    .withMessage(
      'Invalid date format. Please provide a date in ISO 8601 pattern.',
    )
    .optional(),
];

const validateObjectUpdate = [
  check('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Object name is too short.')
    .optional(),
  check('description')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Description value is too short.')
    .optional(),
  check('location_found')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Location value is too short.')
    .optional(),
  check('found_by')
    .notEmpty()
    .withMessage('Student id is required.')
    .custom(isValidUser)
    .optional(),
  check('date_found')
    .matches(iso8601Pattern)
    .withMessage(
      'Invalid date format. Please provide a date in ISO 8601 pattern.',
    )
    .optional(),
  check('retrieved_by')
    .notEmpty()
    .withMessage('Student id is required.')
    .custom(isValidUser)
    .optional(),
  check('date_retrieved')
    .matches(iso8601Pattern)
    .withMessage(
      'Invalid date format. Please provide a date in ISO 8601 pattern.',
    )
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
  validateObjectCreation,
  validateObjectUpdate,
  validate,
};
