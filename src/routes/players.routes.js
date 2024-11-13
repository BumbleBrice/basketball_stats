const router = require('express').Router();
const playersController = require('../controllers/players.controller');
const { verifyToken } = require('../middleware/auth.middleware');

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

module.exports = router; 