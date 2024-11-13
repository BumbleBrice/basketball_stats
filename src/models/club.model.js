const db = require('../config/database');

class ClubModel {
    async create({ name, code_club, created_by }) {
        try {
            const [result] = await db.query(
                'INSERT INTO clubs (name, code_club, created_by) VALUES (?, ?, ?)',
                [name, code_club, created_by]
            );
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    async findById(id) {
        try {
            const [rows] = await db.query(
                'SELECT * FROM clubs WHERE id = ?',
                [id]
            );
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    async update(id, { name, code_club }) {
        try {
            await db.query(
                'UPDATE clubs SET name = ?, code_club = ? WHERE id = ?',
                [name, code_club, id]
            );
            return true;
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            await db.query('DELETE FROM clubs WHERE id = ?', [id]);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async getTeams(clubId) {
        try {
            const [rows] = await db.query(
                'SELECT * FROM teams WHERE club_id = ?',
                [clubId]
            );
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async addUser(clubId, userId, role) {
        try {
            await db.query(
                'INSERT INTO user_clubs (club_id, user_id, role) VALUES (?, ?, ?)',
                [clubId, userId, role]
            );
            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ClubModel(); 