
const createError = (errorName, errorMessage) => {
  const error = new Error(errorMessage);
  error.name = errorName;
  return error;
};
module.exports = { createError };
