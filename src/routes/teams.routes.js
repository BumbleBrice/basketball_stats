const router = require('express').Router();
const teamsController = require('../controllers/teams.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// Pages de rendu (GET)
router.get('/', verifyToken, teamsController.renderTeamsList);
router.get('/create', verifyToken, teamsController.renderCreateTeam);
router.get('/:id', verifyToken, teamsController.renderTeamDetails);
router.get('/:id/edit', verifyToken, teamsController.renderEditTeam);

// Actions (POST, PUT, DELETE)
router.post('/', verifyToken, teamsController.createTeam);
router.put('/:id', verifyToken, teamsController.updateTeam);
router.delete('/:id', verifyToken, teamsController.deleteTeam);

// Gestion des joueurs de l'équipe
router.post('/:id/players', verifyToken, teamsController.addPlayerToTeam);
router.delete('/:id/players/:playerId', verifyToken, teamsController.removePlayerFromTeam);

module.exports = router;
