const express = require('express');
const router = express.Router();
const rbacMiddleware = require('../middleware/rbacMiddleware');

const leaveController = require('../controllers/leaveController');

router.get('/', rbacMiddleware.checkPermission('read_leave'), leaveController.getAllLeaves);
router.get('/user/:id', rbacMiddleware.checkPermission('read_leave'), leaveController.getAllLeavesOfUser);
router.post('/', rbacMiddleware.checkPermission('create_leave'), leaveController.createLeave);
router.put('/:id', rbacMiddleware.checkPermission('update_leave'), leaveController.updateLeave);
router.put('/handleRequest/:id', rbacMiddleware.checkPermission('handle_leave'), leaveController.handleLeaveRequest);
router.delete('/:id', rbacMiddleware.checkPermission('delete_leave'), leaveController.deleteLeave);

module.exports = router;