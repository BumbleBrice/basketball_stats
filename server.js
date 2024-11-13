require('dotenv').config();
const http = require('http');
const app = require('./src/app');

// Normalisation du port
const normalizePort = val => {
  const port = parseInt(val, 10);
  return isNaN(port) ? val : (port >= 0 ? port : false);
};

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// Gestionnaire d'erreurs amélioré
const errorHandler = error => {
  if (error.syscall !== 'listen') throw error;
  
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges.`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use.`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Création et configuration du serveur
const server = http.createServer(app);
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? `pipe ${address}` : `port ${port}`;
  console.log(`Listening on ${bind}`);
});

// Démarrage du serveur
server.listen(port);

// Gestion des erreurs globales
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Gestion de l'arrêt gracieux
process.on('SIGTERM', () => {
  console.info('SIGTERM signal reçu. Arrêt du serveur...');
  server.close(() => {
    console.log('Serveur arrêté proprement');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.info('SIGINT signal reçu. Arrêt du serveur...');
  server.close(() => {
    console.log('Serveur arrêté proprement');
    process.exit(0);
  });
}); 