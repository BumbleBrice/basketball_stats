const db = require('../config/database');

class GameModel {
    async create({ home_team_id, away_team_id, game_date, competition_type }) {
        try {
            const [result] = await db.query(
                `INSERT INTO games 
                (home_team_id, away_team_id, game_date, competition_type, status) 
                VALUES (?, ?, ?, ?, 'scheduled')`,
                [home_team_id, away_team_id, game_date, competition_type]
            );
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    async findById(id) {
        try {
            const [rows] = await db.query(
                `SELECT g.*, 
                    ht.name as home_team_name, 
                    at.name as away_team_name
                 FROM games g
                 INNER JOIN teams ht ON g.home_team_id = ht.id
                 INNER JOIN teams at ON g.away_team_id = at.id
                 WHERE g.id = ?`,
                [id]
            );
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    async updateStatus(id, status) {
        try {
            await db.query(
                'UPDATE games SET status = ? WHERE id = ?',
                [status, id]
            );
            return true;
        } catch (error) {
            throw error;
        }
    }

    async addStat(gameId, playerId, statType, value = 1) {
        try {
            await db.query(
                `INSERT INTO game_statistics 
                (game_id, player_id, ${statType}) 
                VALUES (?, ?, ?)`,
                [gameId, playerId, value]
            );
            return true;
        } catch (error) {
            throw error;
        }
    }

    async getGameStats(gameId) {
        try {
            const [rows] = await db.query(
                `SELECT 
                    p.firstname, p.lastname,
                    t.name as team_name,
                    COUNT(*) as total_actions,
                    SUM(CASE WHEN gs.two_points_made = 1 THEN 2 ELSE 0 END +
                        CASE WHEN gs.three_points_made = 1 THEN 3 ELSE 0 END +
                        CASE WHEN gs.free_throw_made = 1 THEN 1 ELSE 0 END) as points,
                    SUM(gs.offensive_rebound + gs.defensive_rebound) as rebounds,
                    SUM(gs.assist) as assists
                 FROM game_statistics gs
                 INNER JOIN players p ON gs.player_id = p.id
                 INNER JOIN teams t ON gs.team_id = t.id
                 WHERE gs.game_id = ?
                 GROUP BY gs.player_id`,
                [gameId]
            );
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async getGamesByTeam(teamId, status = null) {
        try {
            let query = `
                SELECT * FROM games 
                WHERE home_team_id = ? OR away_team_id = ?
            `;
            const params = [teamId, teamId];

            if (status) {
                query += ' AND status = ?';
                params.push(status);
            }

            query += ' ORDER BY game_date DESC';

            const [rows] = await db.query(query, params);
            return rows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new GameModel(); 