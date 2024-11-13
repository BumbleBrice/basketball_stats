const db = require('../config/database');

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
}

module.exports = new TeamModel(); 