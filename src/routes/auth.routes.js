const router = require('express').Router();
const AuthController = require('../controllers/auth.controller');
const { registerValidator, loginValidator } = require('../middleware/validators/auth.validator');

// Middleware pour vérifier si l'utilisateur est déjà connecté
const checkGuest = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        return res.redirect('/');
    }
    next();
};

// Pages de rendu (GET)
router.get('/login', checkGuest, (req, res) => {
    res.render('auth/login', { 
        title: 'Connexion',
        error: null,
        form: {},
        scripts: ['auth']
    });
});

router.get('/register', checkGuest, (req, res) => {
    res.render('auth/register', { 
        title: 'Inscription',
        error: null,
        form: {},
        scripts: ['auth']
    });
});

// Actions (POST)
router.post('/register', 
    checkGuest,
    registerValidator,
    AuthController.register
);

router.post('/login',
    checkGuest,
    loginValidator,
    AuthController.login
);

router.post('/logout', AuthController.logout);

module.exports = router;
