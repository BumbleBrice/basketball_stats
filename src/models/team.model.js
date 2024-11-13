import db from '../config/database.js';

class TeamModel {
    async create({ name, level, category, club_id }) {
        try {
            const [result] = await db.query(
                'INSERT INTO teams (name, level, category, club_id) VALUES (?, ?, ?, ?)',
                [name, level, category, club_id]
            );
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    async findById(id) {
        try {
            const [rows] = await db.query(
                'SELECT * FROM teams WHERE id = ?',
                [id]
            );
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    async update(id, { name, level, category }) {
        try {
            await db.query(
                'UPDATE teams SET name = ?, level = ?, category = ? WHERE id = ?',
                [name, level, category, id]
            );
            return true;
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            await db.query('DELETE FROM teams WHERE id = ?', [id]);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async getPlayers(teamId) {
        try {
            const [rows] = await db.query(
                `SELECT p.*, pt.jersey_number 
                 FROM players p 
                 INNER JOIN player_teams pt ON p.id = pt.player_id 
                 WHERE pt.team_id = ? AND pt.is_active = true`,
                [teamId]
            );
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async addPlayer(teamId, playerId, jerseyNumber) {
        try {
            await db.query(
                `INSERT INTO player_teams (team_id, player_id, jersey_number, is_active) 
                 VALUES (?, ?, ?, true)`,
                [teamId, playerId, jerseyNumber]
            );
            return true;
        } catch (error) {
            throw error;
        }
    }

    async removePlayer(teamId, playerId) {
        try {
            await db.query(
                'UPDATE player_teams SET is_active = false WHERE team_id = ? AND player_id = ?',
                [teamId, playerId]
            );
            return true;
        } catch (error) {
            throw error;
        }
    }

    async findByClub(clubId) {
        try {
            const [rows] = await db.query(
                'SELECT * FROM teams WHERE club_id = ? ORDER BY category, level, name',
                [clubId]
            );
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async getTeamStats(teamId, season = null) {
        try {
            let query = `
                SELECT 
                    COUNT(DISTINCT g.id) as total_games,
                    SUM(CASE WHEN g.home_team_score > g.away_team_score AND g.home_team_id = ? THEN 1
                         WHEN g.away_team_score > g.home_team_score AND g.away_team_id = ? THEN 1
                         ELSE 0 END) as wins,
                    SUM(CASE WHEN g.home_team_score < g.away_team_score AND g.home_team_id = ? THEN 1
                         WHEN g.away_team_score < g.home_team_score AND g.away_team_id = ? THEN 1
                         ELSE 0 END) as losses
                FROM games g
                WHERE (g.home_team_id = ? OR g.away_team_id = ?)
                AND g.status = 'completed'
            `;
            const params = [teamId, teamId, teamId, teamId, teamId, teamId];

            if (season) {
                query += ' AND YEAR(g.date) = ?';
                params.push(season);
            }

            const [rows] = await db.query(query, params);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }
}

const teamModel = new TeamModel();
export default teamModel; 