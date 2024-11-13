import { Router } from 'express';
import * as statsController from '../controllers/stats.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = Router();

// Pages de rendu (GET)
router.get('/team/:teamId', verifyToken, statsController.renderTeamStats);
router.get('/player/:playerId', verifyToken, statsController.renderPlayerStats);
router.get('/game/:gameId', verifyToken, statsController.renderGameStats);

// Actions (GET) pour l'API
router.get('/api/team/:teamId', verifyToken, statsController.getTeamStats);
router.get('/api/player/:playerId', verifyToken, statsController.getPlayerStats);
router.get('/api/game/:gameId', verifyToken, statsController.getGameStats);

export default router; 