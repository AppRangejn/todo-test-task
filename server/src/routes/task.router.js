const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const checkAuth = require('../middlewares/authenticate');
const validate = require('../middlewares/validate');
const {
  createTaskSchema,
  updateTaskSchema,
  filterTaskSchema,
} = require('../validators/task.schema');

router.use(checkAuth);

router.get('/', validate(filterTaskSchema, 'query'), taskController.getTasks);
router.post('/', validate(createTaskSchema), taskController.createTask);
router.get('/:id', taskController.getTaskById);
router.patch('/:id', validate(updateTaskSchema), taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
