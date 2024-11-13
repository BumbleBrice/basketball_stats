import { Router } from 'express';
import authRoutes from './auth.routes.js';
import clubRoutes from './clubs.routes.js';
import teamRoutes from './teams.routes.js';
import playerRoutes from './players.routes.js';
import gameRoutes from './games.routes.js';
import statsRoutes from './stats.routes.js';

const router = Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'Accueil' });
});

router.use('/auth', authRoutes);
router.use('/clubs', clubRoutes);
router.use('/teams', teamRoutes);
router.use('/players', playerRoutes);
router.use('/games', gameRoutes);
router.use('/stats', statsRoutes);

export default router;
