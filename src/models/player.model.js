import db from '../config/database.js';

class PlayerModel {
    async create({ firstname, lastname, birthdate }) {
        try {
            const [result] = await db.query(
                'INSERT INTO players (firstname, lastname, birthdate) VALUES (?, ?, ?)',
                [firstname, lastname, birthdate]
            );
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    async findById(id) {
        try {
            const [rows] = await db.query(
                'SELECT * FROM players WHERE id = ?',
                [id]
            );
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    async update(id, { firstname, lastname, birthdate }) {
        try {
            await db.query(
                'UPDATE players SET firstname = ?, lastname = ?, birthdate = ? WHERE id = ?',
                [firstname, lastname, birthdate, id]
            );
            return true;
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            await db.query('DELETE FROM players WHERE id = ?', [id]);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async getTeams(playerId) {
        try {
            const [rows] = await db.query(
                `SELECT t.*, pt.jersey_number 
                 FROM teams t 
                 INNER JOIN player_teams pt ON t.id = pt.team_id 
                 WHERE pt.player_id = ? AND pt.is_active = true`,
                [playerId]
            );
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async getStats(playerId, season = null) {
        try {
            let query = `
                SELECT 
                    SUM(games_played) as total_games,
                    SUM(total_points) as total_points,
                    SUM(total_rebounds) as total_rebounds,
                    SUM(total_assists) as total_assists
                FROM season_statistics 
                WHERE player_id = ?
            `;
            const params = [playerId];

            if (season) {
                query += ' AND season = ?';
                params.push(season);
            }

            const [rows] = await db.query(query, params);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }
}

// Créer et exporter une instance unique
const playerModel = new PlayerModel();
export default playerModel;

// Alternative : exporter la classe
// export default PlayerModel; 