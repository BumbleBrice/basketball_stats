import mysql from 'mysql2/promise';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Configuration pour __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration dotenv
dotenv.config();

async function initializeDatabase() {
    let connection;
    try {
        // Première connexion sans spécifier la base de données
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        });

        // Vérifier si la base de données existe
        const [rows] = await connection.query(`
            SELECT SCHEMA_NAME 
            FROM INFORMATION_SCHEMA.SCHEMATA 
            WHERE SCHEMA_NAME = ?
        `, [process.env.DB_NAME]);

        if (rows.length === 0) {
            console.log(`Base de données ${process.env.DB_NAME} non trouvée. Création en cours...`);
            
            // Créer la base de données
            await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}
                                CHARACTER SET utf8mb4 
                                COLLATE utf8mb4_unicode_ci`);
            
            // Utiliser la nouvelle base de données
            await connection.query(`USE ${process.env.DB_NAME}`);
            
            // Lire et exécuter le fichier SQL
            const sqlPath = path.join(__dirname, '../../data_clubs.sql');
            const sqlContent = await fs.readFile(sqlPath, 'utf8');
            
            // Séparer et exécuter les requêtes
            const queries = sqlContent
                .split(';')
                .filter(query => query.trim().length > 0)
                .map(query => query.trim() + ';');

            for (const query of queries) {
                try {
                    if (query.includes('CREATE TABLE')) {
                        await connection.query(query);
                    }
                } catch (err) {
                    console.error('Erreur lors de l\'exécution de la requête:', err.message);
                }
            }
            
            console.log('Base de données initialisée avec succès !');
        } else {
            console.log(`Base de données ${process.env.DB_NAME} existe déjà.`);
        }

        // Fermer la connexion initiale
        await connection.end();

        // Retourner la configuration pour la connexion normale
        return {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        };

    } catch (error) {
        console.error('Erreur lors de l\'initialisation de la base de données:', error);
        if (connection) await connection.end();
        throw error;
    }
}

export default initializeDatabase; 