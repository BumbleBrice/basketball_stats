import db from '../config/database.js';

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

// Créer et exporter une instance unique
const userModel = new UserModel();
export default userModel;

// Alternative : exporter la classe si vous préférez créer l'instance ailleurs
// export default UserModel; 