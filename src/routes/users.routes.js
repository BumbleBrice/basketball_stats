import { Router } from 'express';
import * as usersController from '../controllers/users.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', verifyToken, usersController.getAllUsers);
router.get('/:id', verifyToken, usersController.getUserById);
router.post('/', verifyToken, usersController.createUser);
router.put('/:id', verifyToken, usersController.updateUser);
router.delete('/:id', verifyToken, usersController.deleteUser);

export default router;
