const errorMap = {
  PRODUCT_NOT_FOUND: 404,
  INVALID_VALUE: 422,
  // DRIVER_NOT_FOUND: 404,
  // TRAVEL_CONFLICT: 409,
  UNDEFINED_VALUE: 400,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};
