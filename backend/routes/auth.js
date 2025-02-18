const express = require('express');
const router = express.Router();
const rbacMiddleware = require('../middleware/rbacMiddleware');

const authController = require('../controllers/authController');

router.post('/login', rbacMiddleware.checkPermission('login'), authController.loginUser);

router.post('/register', rbacMiddleware.checkPermission('register'), authController.registerUser);

router.post('/forgot', rbacMiddleware.checkPermission('reset_password'), authController.forgotPassword);
router.get('/forgot/check', rbacMiddleware.checkPermission('reset_password'), authController.checkResetCredentials);
router.post('/reset', rbacMiddleware.checkPermission('reset_password'), authController.resetPassword);

router.get('/logout', rbacMiddleware.checkPermission('logout'), authController.logoutUser);

router.get('/status', rbacMiddleware.checkPermission('check_auth_status'), authController.loggedIn);

router.put('/:id', rbacMiddleware.checkPermission('reset_password'), authController.resetPassword);
// router.delete('/:id', rbacMiddleware.checkPermission('delete_auth'), authController.deleteUser);

router.get('/users', rbacMiddleware.checkPermission('fetch_users'), authController.getAllUsers);

module.exports = router;