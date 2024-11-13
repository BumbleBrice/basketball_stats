import { Router } from 'express';
import * as teamsController from '../controllers/teams.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = Router();

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

export default router;
