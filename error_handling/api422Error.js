const httpStatusCodes = require('./httpStatusCodes');
const BaseError = require('./baseError');

class Api422Error extends BaseError {
  constructor(
    name,
    errors = '',
    statusCode = httpStatusCodes.INVALID_DATA,
    description = 'Invalid data.',
    isOperational = true,
  ) {
    super(name, statusCode, isOperational, `${description}\n ${errors}`);
  }
}

module.exports = Api422Error;
