const router = require('express').Router();
const authRoutes = require('./auth.routes');
const clubRoutes = require('./clubs.routes');
const teamRoutes = require('./teams.routes');
const playerRoutes = require('./players.routes');
const gameRoutes = require('./games.routes');
const statsRoutes = require('./stats.routes');

// Routes principales
router.get('/', (req, res) => {
    res.render('index', { title: 'Accueil' });
});

// Sous-routes
router.use('/auth', authRoutes);
router.use('/clubs', clubRoutes);
router.use('/teams', teamRoutes);
router.use('/players', playerRoutes);
router.use('/games', gameRoutes);
router.use('/stats', statsRoutes);

module.exports = router;
