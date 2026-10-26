const { Task } = require('../db/models');

const findUserTask = (id, userId) => Task.findOne({ where: { id, userId } });

module.exports.getTasks = async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = { userId: req.user.id };

    if (status) {
      filter.status = status;
    }

    const tasks = await Task.findAll({
      where: filter,
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

module.exports.createTask = async (req, res, next) => {
  try {
    const task = await Task.create({
      ...req.body,
      userId: req.user.id,
    });

    return res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

module.exports.getTaskById = async (req, res, next) => {
  try {
    const task = await findUserTask(req.params.id, req.user.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

module.exports.updateTask = async (req, res, next) => {
  try {
    const task = await findUserTask(req.params.id, req.user.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.update(req.body);

    return res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

module.exports.deleteTask = async (req, res, next) => {
  try {
    const deletedCount = await Task.destroy({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!deletedCount) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};
