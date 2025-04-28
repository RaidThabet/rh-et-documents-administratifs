const express = require('express');
const router = express.Router();
const rbacMiddleware = require('../middleware/rbacMiddleware');

const taskController = require('../controllers/taskController');

router.get('/', rbacMiddleware.checkPermission('read_task'), taskController.getAllTasks);
router.post('/', rbacMiddleware.checkPermission('create_task'), taskController.createTask);
router.put('/:id', rbacMiddleware.checkPermission('update_task'), taskController.updateTask);
router.put('/complete/:id', rbacMiddleware.checkPermission('complete_task'), taskController.completeTask);
router.delete('/:id', rbacMiddleware.checkPermission('delete_task'), taskController.deleteTask);

module.exports = router;