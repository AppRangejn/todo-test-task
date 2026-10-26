module.exports = (schema, target = 'body') => async (req, res, next) => {
  try {
    req[target] = await schema.validate(req[target], {
      abortEarly: false,
      stripUnknown: true,
    });
    next();
  } catch (error) {
    next(error);
  }
};
