import Stats from '../models/stats.model.js';

// Rendu des pages
export const renderTeamStats = async (req, res) => {
    try {
        const stats = await Stats.getTeamStats(req.params.teamId);
        res.render('stats/team', {
            title: 'Statistiques de l\'équipe',
            stats,
            scripts: ['team-stats']
        });
    } catch (error) {
        res.status(500).render('error', { message: error.message });
    }
};

export const renderPlayerStats = async (req, res) => {
    try {
        const stats = await Stats.getPlayerStats(req.params.playerId);
        res.render('stats/player', {
            title: 'Statistiques du joueur',
            stats,
            scripts: ['player-stats']
        });
    } catch (error) {
        res.status(500).render('error', { message: error.message });
    }
};

export const renderGameStats = async (req, res) => {
    try {
        const stats = await Stats.getGameStats(req.params.gameId);
        res.render('stats/game', {
            title: 'Statistiques du match',
            stats,
            scripts: ['game-stats']
        });
    } catch (error) {
        res.status(500).render('error', { message: error.message });
    }
};

// API Endpoints
export const getTeamStats = async (req, res) => {
    try {
        const stats = await Stats.getTeamStats(req.params.teamId);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPlayerStats = async (req, res) => {
    try {
        const stats = await Stats.getPlayerStats(req.params.playerId);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getGameStats = async (req, res) => {
    try {
        const stats = await Stats.getGameStats(req.params.gameId);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 