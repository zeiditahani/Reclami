const mysql = require('mysql2');  // Importation de mysql2

// Créer la connexion MySQL
const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'reclami_db'
});

// Connecter la base de données
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données: ' + err.stack);
    return;
  }
  console.log('Connecté à la base de données');
});

// Exporter la connexion
module.exports = db;
