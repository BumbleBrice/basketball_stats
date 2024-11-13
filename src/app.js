require('dotenv').config();
const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

// Vérification de la présence des variables d'environnement critiques
if (!process.env.JWT_SECRET) {
    console.error('ERREUR: JWT_SECRET n\'est pas défini dans les variables d\'environnement');
    process.exit(1);
}

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// Configuration EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// Routes
app.use('/', routes);

// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).render('errors/404', { title: 'Page non trouvée' });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('errors/500', { 
        title: 'Erreur serveur',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

module.exports = app; 