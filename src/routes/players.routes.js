import { Router } from 'express';
import * as playersController from '../controllers/players.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = Router();

// Pages de rendu (GET)
router.get('/', verifyToken, playersController.renderPlayersList);
router.get('/create', verifyToken, playersController.renderCreatePlayer);
router.get('/:id', verifyToken, playersController.renderPlayerDetails);
router.get('/:id/edit', verifyToken, playersController.renderEditPlayer);
router.get('/:id/stats', verifyToken, playersController.renderPlayerStats);

// Actions (POST, PUT, DELETE)
router.post('/', verifyToken, playersController.createPlayer);
router.put('/:id', verifyToken, playersController.updatePlayer);
router.delete('/:id', verifyToken, playersController.deletePlayer);

export default router; 