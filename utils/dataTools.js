function checkEmptyFields(userData, requiredFields) {
  requiredFields.forEach((field) => {
    if (
      !Object.prototype.hasOwnProperty.call(userData, field) ||
      userData[field] === ''
    ) {
      throw new Error(`The '${field}' field is missing or empty`);
    }
  });

  return userData;
}

module.exports = {
  checkEmptyFields,
};
