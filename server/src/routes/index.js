const { Router } = require('express');

const authRouter = require('./auth.router');
const taskRouter = require('./task.router');

const router = Router();

router.use('/auth', authRouter);
router.use('/tasks', taskRouter);

module.exports = router;
