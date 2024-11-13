const router = require('express').Router();
const gamesController = require('../controllers/games.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// Pages de rendu (GET)
router.get('/', verifyToken, gamesController.renderGamesList);
router.get('/create', verifyToken, gamesController.renderCreateGame);
router.get('/:id', verifyToken, gamesController.renderGameDetails);
router.get('/:id/live', verifyToken, gamesController.renderLiveGame);
router.get('/:id/stats', verifyToken, gamesController.renderGameStats);

// Actions (POST, PUT, DELETE)
router.post('/', verifyToken, gamesController.createGame);
router.put('/:id', verifyToken, gamesController.updateGame);
router.delete('/:id', verifyToken, gamesController.deleteGame);

// Gestion du match en direct
router.post('/:id/start', verifyToken, gamesController.startGame);
router.post('/:id/end', verifyToken, gamesController.endGame);
router.post('/:id/stats', verifyToken, gamesController.addGameStat);
router.delete('/:id/stats/:statId', verifyToken, gamesController.removeGameStat);

module.exports = router; 