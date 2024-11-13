import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import mysql from 'mysql2/promise';
import initializeDatabase from './config/initDatabase.js';
import { fileURLToPath } from 'url';
import { checkUser } from './middleware/auth.middleware.js';
import authRoutes from './routes/auth.routes.js';

// Configuration pour __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration dotenv
dotenv.config();

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

// Appliquer checkUser à toutes les routes
app.use(checkUser);

// Routes
app.use('/', routes);
app.use('/auth', authRoutes);

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

// Fonction de démarrage asynchrone
async function startApp() {
    try {
        // Initialiser la base de données
        const dbConfig = await initializeDatabase();
        
        // Créer le pool de connexions
        const pool = mysql.createPool(dbConfig);
        
        // Ajouter le pool à l'app pour l'utiliser dans les routes
        app.locals.db = pool;
        
        console.log('Connexion à la base de données établie avec succès');
        
    } catch (error) {
        console.error('Erreur au démarrage de l\'application:', error);
        process.exit(1);
    }
}

// Démarrer l'application
startApp();

export default app; 