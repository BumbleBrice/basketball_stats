const app = require('./src/app');

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
}).on('error', (err) => {
  console.error('Erreur de démarrage du serveur:', err);
  process.exit(1);
});

// Gestion de l'arrêt propre du serveur
process.on('SIGTERM', () => {
  console.info('SIGTERM signal reçu. Arrêt du serveur...');
  server.close(() => {
    console.log('Serveur arrêté');
    process.exit(0);
  });
});

// Ajout de la gestion de SIGINT (Ctrl+C)
process.on('SIGINT', () => {
  console.info('SIGINT signal reçu. Arrêt du serveur...');
  server.close(() => {
    console.log('Serveur arrêté');
    process.exit(0);
  });
}); 