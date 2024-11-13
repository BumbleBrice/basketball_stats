document.addEventListener('DOMContentLoaded', function() {
    let selectedPlayer = null;
    const statsActions = document.getElementById('statsActions');
    const actionsLog = document.getElementById('actionsLog');

    // Gestion de la sélection des joueurs
    document.querySelectorAll('.player-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Désélectionner le joueur précédent
            if (selectedPlayer) {
                document.querySelector(`[data-player-id="${selectedPlayer.id}"]`)
                    .classList.remove('selected');
            }

            // Sélectionner le nouveau joueur
            selectedPlayer = {
                id: this.dataset.playerId,
                teamId: this.dataset.teamId,
                number: this.dataset.number
            };
            this.classList.add('selected');
            statsActions.style.display = 'block';
        });
    });

    // Gestion des actions de statistiques
    document.querySelectorAll('.stat-btn').forEach(btn => {
        btn.addEventListener('click', async function() {
            if (!selectedPlayer) return;

            const statType = this.dataset.stat;
            const result = this.dataset.result;

            try {
                const response = await fetch(`/api/games/${gameId}/stats`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        player_id: selectedPlayer.id,
                        team_id: selectedPlayer.teamId,
                        stat_type: statType,
                        result: result
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    updateScoreboard(data.scores);
                    addActionToLog(selectedPlayer.number, statType, result);
                }
            } catch (error) {
                console.error('Erreur lors de l\'ajout de la statistique:', error);
            }
        });
    });

    // Fonctions utilitaires
    function updateScoreboard(scores) {
        document.getElementById('homeScore').textContent = scores.home;
        document.getElementById('awayScore').textContent = scores.away;
    }

    function addActionToLog(playerNumber, statType, result) {
        const action = getActionText(playerNumber, statType, result);
        const logEntry = document.createElement('div');
        logEntry.className = 'action-log-entry';
        logEntry.textContent = action;
        actionsLog.insertBefore(logEntry, actionsLog.firstChild);
    }

    function getActionText(playerNumber, statType, result) {
        // Conversion des types de stats en texte lisible
        const statTexts = {
            'two_points': {
                'made': '2 points marqués',
                'missed': '2 points ratés'
            },
            'three_points': {
                'made': '3 points marqués',
                'missed': '3 points ratés'
            },
            // ... autres conversions
        };

        return `#${playerNumber} - ${statTexts[statType][result] || statType}`;
    }
}); 