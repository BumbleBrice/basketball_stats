import playerModel from '../models/player.model.js';

// Pages de rendu
export const renderPlayersList = async (req, res) => {
    try {
        const players = await playerModel.findAll();
        res.render('players/list', {
            title: 'Liste des joueurs',
            players
        });
    } catch (error) {
        res.status(500).render('error', { message: error.message });
    }
};

export const renderCreatePlayer = (req, res) => {
    res.render('players/create', {
        title: 'Ajouter un joueur',
        error: null,
        form: {}
    });
};

export const renderPlayerDetails = async (req, res) => {
    try {
        const player = await playerModel.findById(req.params.id);
        if (!player) {
            return res.status(404).render('error', { message: 'Joueur non trouvé' });
        }

        const teams = await playerModel.getTeams(req.params.id);
        const stats = await playerModel.getStats(req.params.id);

        res.render('players/details', {
            title: `${player.firstname} ${player.lastname}`,
            player,
            teams,
            stats
        });
    } catch (error) {
        res.status(500).render('error', { message: error.message });
    }
};

export const renderEditPlayer = async (req, res) => {
    try {
        const player = await playerModel.findById(req.params.id);
        if (!player) {
            return res.status(404).render('error', { message: 'Joueur non trouvé' });
        }
        res.render('players/edit', {
            title: `Modifier ${player.firstname} ${player.lastname}`,
            player,
            error: null
        });
    } catch (error) {
        res.status(500).render('error', { message: error.message });
    }
};

// Actions CRUD
export const createPlayer = async (req, res) => {
    try {
        const playerId = await playerModel.create(req.body);
        res.status(201).json({ id: playerId });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updatePlayer = async (req, res) => {
    try {
        await playerModel.update(req.params.id, req.body);
        res.json({ message: 'Joueur mis à jour avec succès' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deletePlayer = async (req, res) => {
    try {
        await playerModel.delete(req.params.id);
        res.json({ message: 'Joueur supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const renderPlayerStats = async (req, res) => {
    try {
        const player = await playerModel.findById(req.params.id);
        if (!player) {
            return res.status(404).render('error', { message: 'Joueur non trouvé' });
        }

        const stats = await playerModel.getStats(req.params.id);
        
        res.render('players/stats', {
            title: `Statistiques de ${player.firstname} ${player.lastname}`,
            player,
            stats
        });
    } catch (error) {
        res.status(500).render('error', { message: error.message });
    }
}; 