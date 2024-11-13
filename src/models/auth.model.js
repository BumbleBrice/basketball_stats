const bcrypt = require('bcrypt');

class AuthModel {
  constructor(db) {
    this.db = db;
  }

  async createUser({ firstname, lastname, email, password, club_id }) {
    try {
      // Vérifier si l'email existe déjà
      const [existingUser] = await this.db.query(
        'SELECT id FROM users WHERE email = ?',
        [email]
      );

      if (existingUser.length > 0) {
        throw new Error('Cet email est déjà utilisé');
      }

      // Hasher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insérer le nouvel utilisateur
      const [result] = await this.db.query(
        `INSERT INTO users (firstname, lastname, email, password, club_id) 
         VALUES (?, ?, ?, ?, ?)`,
        [firstname, lastname, email, hashedPassword, club_id]
      );

      return {
        id: result.insertId,
        firstname,
        lastname,
        email,
        club_id
      };
    } catch (error) {
      throw error;
    }
  }

  async login(email, password) {
    try {
      // Récupérer l'utilisateur
      const [users] = await this.db.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );

      if (users.length === 0) {
        throw new Error('Email ou mot de passe incorrect');
      }

      const user = users[0];

      // Vérifier le mot de passe
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new Error('Email ou mot de passe incorrect');
      }

      // Ne pas renvoyer le mot de passe
      delete user.password;
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthModel; 