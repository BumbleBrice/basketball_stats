const db = require('../config/database');

class UserModel {
    async create({ firstname, lastname, email, password }) {
        try {
            const [result] = await db.query(
                `INSERT INTO users 
                (firstname, lastname, email, password) 
                VALUES (?, ?, ?, ?)`,
                [firstname, lastname, email, password]
            );
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    async findByEmail(email) {
        try {
            const [rows] = await db.query(
                'SELECT * FROM users WHERE email = ?',
                [email]
            );
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    async findById(id) {
        try {
            const [rows] = await db.query(
                `SELECT id, firstname, lastname, email, 
                created_at, updated_at 
                FROM users WHERE id = ?`,
                [id]
            );
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    async update(id, { firstname, lastname, email }) {
        try {
            const [result] = await db.query(
                `UPDATE users 
                SET firstname = ?, lastname = ?, email = ? 
                WHERE id = ?`,
                [firstname, lastname, email, id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new UserModel(); 