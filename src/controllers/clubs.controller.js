import Club from '../models/club.model.js';

export const renderClubsList = async (req, res) => {
    try {
        const clubs = await Club.findByUserId(req.user.id);
        res.render('clubs/list', { 
            title: 'Mes Clubs',
            clubs 
        });
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).render('error', { 
            message: 'Erreur lors du chargement des clubs' 
        });
    }
};

export const renderCreateClub = (req, res) => {
    res.render('clubs/create', { 
        title: 'Créer un club' 
    });
};

export const renderClubDetails = async (req, res) => {
    try {
        const club = await Club.findById(req.params.id);
        if (!club) {
            return res.status(404).render('error', { 
                message: 'Club non trouvé' 
            });
        }
        
        const teams = await Club.getTeams(req.params.id);
        
        res.render('clubs/details', { 
            title: club.name,
            club,
            teams 
        });
    } catch (error) {
        console.error('Erreur lors du chargement du club:', error);
        res.status(500).render('error', { 
            message: 'Erreur lors du chargement du club' 
        });
    }
};

export const renderEditClub = async (req, res) => {
    try {
        const club = await Club.findById(req.params.id);
        if (!club) {
            return res.status(404).render('error', { 
                message: 'Club non trouvé' 
            });
        }
        res.render('clubs/edit', { 
            title: `Modifier ${club.name}`,
            club 
        });
    } catch (error) {
        console.error('Erreur lors du chargement du club:', error);
        res.status(500).render('error', { 
            message: 'Erreur lors du chargement du club' 
        });
    }
};

export const createClub = async (req, res) => {
    try {
        const { name, code_club } = req.body;
        
        if (!name || !code_club) {
            return res.status(400).json({ 
                message: 'Le nom et le code du club sont requis' 
            });
        }

        const existingClub = await Club.findByCode(code_club);
        if (existingClub) {
            return res.status(400).json({ 
                message: 'Ce code club est déjà utilisé' 
            });
        }

        const clubId = await Club.create({
            name,
            code_club,
            userId: req.user.id
        });

        res.status(201).json({ 
            message: 'Club créé avec succès',
            clubId 
        });

    } catch (error) {
        console.error('Erreur lors de la création du club:', error);
        res.status(500).json({ 
            message: 'Erreur lors de la création du club' 
        });
    }
};

export const updateClub = async (req, res) => {
    try {
        const { name } = req.body;
        const updated = await Club.update(req.params.id, { name });
        
        if (!updated) {
            return res.status(404).json({ 
                message: 'Club non trouvé' 
            });
        }

        res.json({ 
            message: 'Club mis à jour avec succès' 
        });

    } catch (error) {
        console.error('Erreur lors de la mise à jour du club:', error);
        res.status(500).json({ 
            message: 'Erreur lors de la mise à jour du club' 
        });
    }
};

export const deleteClub = async (req, res) => {
    try {
        const deleted = await Club.delete(req.params.id);
        
        if (!deleted) {
            return res.status(404).json({ 
                message: 'Club non trouvé' 
            });
        }

        res.json({ 
            message: 'Club supprimé avec succès' 
        });

    } catch (error) {
        console.error('Erreur lors de la suppression du club:', error);
        res.status(500).json({ 
            message: 'Erreur lors de la suppression du club' 
        });
    }
};
