import { Router } from 'express';
import { 
    renderGamesList,
    renderCreateGame,
    renderGameDetails,
    renderLiveGame,
    renderGameStats,
    createGame,
    updateGame,
    deleteGame,
    startGame,
    endGame,
    addGameStat,
    removeGameStat
} from '../controllers/games.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = Router();

// Pages de rendu (GET)
router.get('/', verifyToken, renderGamesList);
router.get('/create', verifyToken, renderCreateGame);
router.get('/:id', verifyToken, renderGameDetails);
router.get('/:id/live', verifyToken, renderLiveGame);
router.get('/:id/stats', verifyToken, renderGameStats);

// Actions (POST, PUT, DELETE)
router.post('/', verifyToken, createGame);
router.put('/:id', verifyToken, updateGame);
router.delete('/:id', verifyToken, deleteGame);

// Gestion du match en direct
router.post('/:id/start', verifyToken, startGame);
router.post('/:id/end', verifyToken, endGame);
router.post('/:id/stats', verifyToken, addGameStat);
router.delete('/:id/stats/:statId', verifyToken, removeGameStat);

export default router; 