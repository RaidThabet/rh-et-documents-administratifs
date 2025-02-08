const express = require('express');
const router = express.Router();
const rbacMiddleware = require('../middleware/rbacMiddleware');

const authController = require('../controllers/authController');

router.post('/login', rbacMiddleware.checkPermission('login'), authController.loginUser);
router.post('/register', rbacMiddleware.checkPermission('register'), authController.registerUser);
router.get('/logout', rbacMiddleware.checkPermission('logout'), authController.logoutUser);
router.get('/status', rbacMiddleware.checkPermission('logout'), authController.loggedIn);
router.put('/:id', rbacMiddleware.checkPermission('reset_password'), authController.resetPassword);
router.delete('/:id', rbacMiddleware.checkPermission('delete_auth'), authController.deleteUser);

module.exports = router;