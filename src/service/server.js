const express = require('express');
const cors = require('cors');
const router = require('./routes');
const db = require('./db');  // Importation de la connexion depuis db.js

const app = express();
app.use(cors());
app.use(express.json());

// Exemple de route
app.get('/data', (req, res) => {
  db.query('SELECT * FROM enseignant', (err, results) => {
    if (err) {
      res.status(500).send('Erreur de récupération des données');
      return;
    }
    res.json(results);
  });
});

// Utiliser les routes
app.use('/api', router);

// Lancer le serveur
app.listen(3000, () => {
  console.log('Serveur API en écoute sur le port 3000');
});
