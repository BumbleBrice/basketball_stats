import Team from '../models/team.model.js';

// Pages de rendu
export const renderTeamsList = async (req, res) => {
    try {
        const teams = await Team.findAll();
        res.render('teams/list', {
            title: 'Liste des équipes',
            teams
        });
    } catch (error) {
        res.status(500).render('error', { message: error.message });
    }
};

export const renderCreateTeam = (req, res) => {
    res.render('teams/create', {
        title: 'Créer une équipe',
        error: null,
        form: {}
    });
};

export const renderTeamDetails = async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        if (!team) {
            return res.status(404).render('error', { message: 'Équipe non trouvée' });
        }

        const players = await Team.getPlayers(req.params.id);
        const stats = await Team.getStats(req.params.id);

        res.render('teams/details', {
            title: team.name,
            team,
            players,
            stats
        });
    } catch (error) {
        res.status(500).render('error', { message: error.message });
    }
};

export const renderEditTeam = async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        if (!team) {
            return res.status(404).render('error', { message: 'Équipe non trouvée' });
        }
        res.render('teams/edit', {
            title: `Modifier ${team.name}`,
            team,
            error: null
        });
    } catch (error) {
        res.status(500).render('error', { message: error.message });
    }
};

// Actions CRUD
export const createTeam = async (req, res) => {
    try {
        const teamId = await Team.create(req.body);
        res.status(201).json({ id: teamId });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateTeam = async (req, res) => {
    try {
        await Team.update(req.params.id, req.body);
        res.json({ message: 'Équipe mise à jour avec succès' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteTeam = async (req, res) => {
    try {
        await Team.delete(req.params.id);
        res.json({ message: 'Équipe supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Gestion des joueurs
export const addPlayerToTeam = async (req, res) => {
    try {
        const { playerId, jerseyNumber } = req.body;
        await Team.addPlayer(req.params.id, playerId, jerseyNumber);
        res.json({ message: 'Joueur ajouté avec succès' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const removePlayerFromTeam = async (req, res) => {
    try {
        await Team.removePlayer(req.params.id, req.params.playerId);
        res.json({ message: 'Joueur retiré avec succès' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
