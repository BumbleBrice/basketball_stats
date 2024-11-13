import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';

const router = Router();

// Pages de rendu (GET)
router.get('/login', (req, res) => {
    res.render('auth/login', { 
        title: 'Connexion',
        error: null,
        form: {}
    });
});

router.get('/register', (req, res) => {
    res.render('auth/register', { 
        title: 'Inscription',
        error: null,
        form: {}
    });
});

// Actions (POST)
router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/logout', authController.logout);

// Route de test
router.get('/test-logout', (req, res) => {
    res.send(`
        <form action="/auth/logout" method="POST">
            <button type="submit">Test Déconnexion</button>
        </form>
    `);
});

export default router;
