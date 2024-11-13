class GameStatsModel {
    async addStat(gameId, playerId, statType, value) {
        try {
            // 1. Ajouter la stat dans game_statistics
            const [stat] = await this.db.query(
                `INSERT INTO game_statistics 
                (game_id, player_id, ${statType}) 
                VALUES (?, ?, ?)`,
                [gameId, playerId, value]
            );

            // 2. Mettre à jour les totaux du match si nécessaire
            if (statType.includes('points')) {
                await this.updateGameScore(gameId, playerId, value);
            }

            return stat;
        } catch (error) {
            throw error;
        }
    }
} 