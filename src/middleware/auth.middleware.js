import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.redirect('/auth/login');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        
        // Rendre l'utilisateur disponible pour tous les templates
        res.locals.user = decoded;
        
        next();
    } catch (error) {
        res.clearCookie('token');
        res.redirect('/auth/login');
    }
};

// Middleware optionnel pour les routes publiques
export const checkUser = (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            res.locals.user = decoded;
        }
        
        next();
    } catch (error) {
        res.locals.user = null;
        next();
    }
};

// Si vous avez besoin d'exporter plusieurs fonctions, vous pouvez le faire ainsi :
export const otherMiddleware = () => {
    // ...
};

// Ou vous pouvez exporter un objet par défaut si vous préférez :
// export default { verifyToken, otherMiddleware };
