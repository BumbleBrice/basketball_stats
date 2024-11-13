const router = require('express').Router();
const usersController = require('../controllers/users.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.get('/', verifyToken, usersController.getAllUsers);
router.get('/:id', verifyToken, usersController.getUserById);
router.post('/', verifyToken, usersController.createUser);
router.put('/:id', verifyToken, usersController.updateUser);
router.delete('/:id', verifyToken, usersController.deleteUser);

module.exports = router;
