const validate = (validator) => {
  return async function (req, res, next) {
    try {
      await validator.validateAsync(req.body);
      next();
    } catch (err) {
      console.error('err: ', err);
      if (err.isJoi) return util.inValidParam(err.message, res);
      return res.status(401).json({ code: "VALIDATION_ERROR", message: "Validation failed requested payload with required fields." });
    }
  };
};

module.exports = validate;