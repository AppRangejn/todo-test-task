const yup = require('yup');

module.exports.registerSchema = yup.object().shape({
  name: yup.string().trim().min(2).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

module.exports.loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
