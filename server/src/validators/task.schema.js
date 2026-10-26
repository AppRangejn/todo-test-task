const yup = require('yup');

const ALLOWED_STATUSES = ['todo', 'in progress', 'done'];

module.exports.createTaskSchema = yup.object().shape({
  title: yup.string().trim().min(1).required(),
  description: yup.string().trim().nullable(),
  status: yup.string().oneOf(ALLOWED_STATUSES).default('todo'),
});

module.exports.updateTaskSchema = yup.object().shape({
  title: yup.string().trim().min(1),
  description: yup.string().trim().nullable(),
  status: yup.string().oneOf(ALLOWED_STATUSES),
});

module.exports.filterTaskSchema = yup.object().shape({
  status: yup.string().oneOf(ALLOWED_STATUSES),
});
