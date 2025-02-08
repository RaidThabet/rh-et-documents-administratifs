const express = require('express');
const router = express.Router();
const rbacMiddleware = require('../middleware/rbacMiddleware');

const recordsController = require('../controllers/recordsController');

// router.get('/records', rbacMiddleware.checkPermission('read_record'), recordsController.getAllRecord);
// router.post('/records', rbacMiddleware.checkPermission('create_record'), recordsController.createRecord);
// router.put('/records/:id', rbacMiddleware.checkPermission('update_record'), recordsController.updateRecord);
// router.delete('/records/:id', rbacMiddleware.checkPermission('delete_record'), recordsController.deleteRecord);

module.exports = router;