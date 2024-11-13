import db from '../config/database.js';

class Club {
    static async findByUserId(userId) {
        try {
            const [rows] = await db.query(`
                SELECT c.* 
                FROM clubs c
                JOIN user_clubs uc ON c.id = uc.club_id
                WHERE uc.user_id = ?
            `, [userId]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async findById(id) {
        try {
            const [rows] = await db.query('SELECT * FROM clubs WHERE id = ?', [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async findByCode(code) {
        try {
            const [rows] = await db.query('SELECT * FROM clubs WHERE code_club = ?', [code]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async create({ name, code_club, userId }) {
        try {
            const connection = await db.getConnection();
            await connection.beginTransaction();

            try {
                // Créer le club
                const [result] = await connection.query(
                    'INSERT INTO clubs (name, code_club) VALUES (?, ?)',
                    [name, code_club]
                );

                // Associer l'utilisateur comme admin
                await connection.query(
                    'INSERT INTO user_clubs (user_id, club_id, role) VALUES (?, ?, ?)',
                    [userId, result.insertId, 'admin']
                );

                await connection.commit();
                return result.insertId;

            } catch (error) {
                await connection.rollback();
                throw error;
            } finally {
                connection.release();
            }
        } catch (error) {
            throw error;
        }
    }

    static async update(id, { name }) {
        try {
            const [result] = await db.query(
                'UPDATE clubs SET name = ? WHERE id = ?',
                [name, id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            const [result] = await db.query('DELETE FROM clubs WHERE id = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    static async getTeams(clubId) {
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
}

export default Club; 