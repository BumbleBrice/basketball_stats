const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.redirect('/auth/login');
        }

        if (!process.env.JWT_SECRET) {
            throw new Error('Configuration JWT manquante');
        }

        // Vérifier le token
        const decoded = jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: ['HS256'] // Spécifier explicitement l'algorithme accepté
        });

        // Ajouter les informations de l'utilisateur à la requête
        req.user = decoded;

        // Ajouter les informations aux variables locales pour les vues
        res.locals.user = decoded;
        res.locals.isAuthenticated = true;

        next();
    } catch (error) {
        console.error('Erreur de vérification du token:', error);
        res.clearCookie('token');
        res.redirect('/auth/login');
    }
};

module.exports = {
    verifyToken
};
