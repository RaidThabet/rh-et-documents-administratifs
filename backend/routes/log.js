const express = require('express');
const router = express.Router();
const rbacMiddleware = require('../middleware/rbacMiddleware');

const logController = require('../controllers/logController');

router.get('/', rbacMiddleware.checkPermission('read_log'), logController.getAllLogs);
router.post('/', rbacMiddleware.checkPermission('create_log'), logController.createLog);
router.put('/:id', rbacMiddleware.checkPermission('update_log'), logController.updateLog);
router.delete('/:id', rbacMiddleware.checkPermission('delete_log'), logController.deleteLog);

module.exports = router;