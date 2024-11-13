import db from '../config/database.js';

class StatModel {
    async addGameStat(gameId, playerId, teamId, statType, value = 1) {
        try {
            // Ajouter la statistique du match
            await db.query(
                `INSERT INTO game_statistics 
                (game_id, player_id, team_id, ${statType}) 
                VALUES (?, ?, ?, ?)`,
                [gameId, playerId, teamId, value]
            );

            // Mettre à jour les statistiques de la saison
            await this.updateSeasonStats(playerId, teamId, statType, value);

            return true;
        } catch (error) {
            throw error;
        }
    }

    async updateSeasonStats(playerId, teamId, statType, value) {
        try {
            const season = new Date().getFullYear().toString();
            
            // Vérifier si les stats de la saison existent
            const [existing] = await db.query(
                `SELECT id FROM season_statistics 
                 WHERE player_id = ? AND team_id = ? AND season = ?`,
                [playerId, teamId, season]
            );

            if (existing.length > 0) {
                // Mettre à jour les stats existantes
                await db.query(
                    `UPDATE season_statistics 
                     SET ${statType} = ${statType} + ? 
                     WHERE player_id = ? AND team_id = ? AND season = ?`,
                    [value, playerId, teamId, season]
                );
            } else {
                // Créer de nouvelles stats pour la saison
                await db.query(
                    `INSERT INTO season_statistics 
                    (player_id, team_id, season, ${statType}) 
                    VALUES (?, ?, ?, ?)`,
                    [playerId, teamId, season, value]
                );
            }

            return true;
        } catch (error) {
            throw error;
        }
    }

    async getPlayerSeasonStats(playerId, season) {
        try {
            const [rows] = await db.query(
                `SELECT * FROM season_statistics 
                 WHERE player_id = ? AND season = ?`,
                [playerId, season]
            );
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    async getTeamSeasonStats(teamId, season) {
        try {
            const [rows] = await db.query(
                `SELECT 
                    p.firstname, p.lastname,
                    ss.*
                 FROM season_statistics ss
                 INNER JOIN players p ON ss.player_id = p.id
                 WHERE ss.team_id = ? AND ss.season = ?`,
                [teamId, season]
            );
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Méthodes supplémentaires suggérées
    async getGameStats(gameId) {
        try {
            const [rows] = await db.query(
                `SELECT 
                    p.firstname, p.lastname,
                    t.name as team_name,
                    gs.*
                 FROM game_statistics gs
                 INNER JOIN players p ON gs.player_id = p.id
                 INNER JOIN teams t ON gs.team_id = t.id
                 WHERE gs.game_id = ?
                 ORDER BY t.id, p.lastname, p.firstname`,
                [gameId]
            );
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async getPlayerCareerStats(playerId) {
        try {
            const [rows] = await db.query(
                `SELECT 
                    season,
                    SUM(points) as total_points,
                    SUM(rebounds) as total_rebounds,
                    SUM(assists) as total_assists,
                    COUNT(DISTINCT game_id) as games_played
                 FROM game_statistics
                 WHERE player_id = ?
                 GROUP BY season
                 ORDER BY season DESC`,
                [playerId]
            );
            return rows;
        } catch (error) {
            throw error;
        }
    }
}

// Créer et exporter une instance unique
const statModel = new StatModel();
export default statModel; 