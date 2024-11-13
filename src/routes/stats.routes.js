const router = require('express').Router();
const statsController = require('../controllers/stats.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// Pages de rendu (GET)
router.get('/team/:teamId', verifyToken, statsController.renderTeamStats);
router.get('/player/:playerId', verifyToken, statsController.renderPlayerStats);
router.get('/game/:gameId', verifyToken, statsController.renderGameStats);

// Actions (GET) pour l'API
router.get('/api/team/:teamId', verifyToken, statsController.getTeamStats);
router.get('/api/player/:playerId', verifyToken, statsController.getPlayerStats);
router.get('/api/game/:gameId', verifyToken, statsController.getGameStats);

module.exports = router; 