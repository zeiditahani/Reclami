const express = require('express');
const router = express.Router();
const db = require('./db');  // Importation de la connexion depuis db.js


// Route pour récupérer toutes les données
router.post('/enseignants', (req, res) => {
  db.query('SELECT * FROM enseignant', (err, results) => {
    if (err) {
      console.error("Erreur SQL: ", err);  // Log l'erreur SQL
      res.status(500).send('Erreur de récupération des données');
      return;
    }
    res.json(results); // Retourne les données sous forme JSON
  });
});

router.get('/reclamations', (req, res) => {
  db.query('SELECT * FROM reclamation', (err, results) => {
    if (err) {
      console.error("Erreur SQL: ", err);
      res.status(500).send('Erreur de récupération des données');
      return;
    }
    // Assurez-vous que les résultats sont bien en format JSON
    res.json(results.map(item => ({
      idreclamation: item.idreclamation,
      type: item.type,
      description: item.description,
      date: item.date
    }))); // Formatez les données selon ce que vous attendez côté client
  });
});

router.get('/user/:id/reclamations', (req, res) => {
  const userId = req.params.id; // Récupérer l'identifiant de l'utilisateur depuis les paramètres
  console.log(userId)

  db.query('SELECT * FROM reclamation WHERE idens = ?', [userId], (err, results) => {
    if (err) {
      console.error("Erreur SQL: ", err);
      res.status(500).send('Erreur de récupération des données');
      return;
    }

    // Formater les résultats pour correspondre à ce qui est attendu côté client
    res.json(results.map(item => ({
      idreclamation: item.idreclamation,
      type: item.type,
      description: item.description,
      date: item.date,
      statut: item.statut,
      titre: item.titre
    })));
  });
});



router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Vérification dans la table 'enseignant'
  db.query('SELECT * FROM enseignant WHERE email=?', [email], (err, results) => {
    if (err) {
      console.error("Erreur SQL: ", err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }

    if (results.length > 0) {
      const user = results[0];
      
      // Vérification du mot de passe
      if (user.password === password) {
        return res.json({
          message: 'Connexion réussie',
          user: { ...user, role: 'enseignant', redirectTo: '/home' }, // L'utilisateur est un enseignant
        });
      }
    }

    // Si l'utilisateur n'est pas trouvé dans la table 'enseignant', vérification dans la table 'admin'
    db.query('SELECT * FROM admin WHERE email=?', [email], (err, results) => {
      if (err) {
        console.error("Erreur SQL: ", err);
        return res.status(500).json({ message: 'Erreur serveur' });
      }

      if (results.length > 0) {
        const admin = results[0];
        
        // Vérification du mot de passe pour l'admin
        if (admin.password === password) {
          return res.json({
            message: 'Connexion réussie',
            user: { ...admin, role: 'admin', redirectTo: '/admin' }, // L'utilisateur est un administrateur
          });
        } else {
          return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }
      } else {
        return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
      }
    });
  });
});


  


// Route pour ajouter des données
router.post('/addEns', (req, res) => {
  const { nom, prenom, departement, email, password } = req.body;

  // Vérifier les données avant l'insertion
  console.log('Données reçues:', { nom, prenom, departement, email, password });

  const query = 'INSERT INTO enseignant (nom, prenom, departement, email, password) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [nom, prenom, departement, email, password], (err, results) => {
    if (err) {
      console.error("Erreur SQL: ", err);  // Log l'erreur SQL
      res.status(500).send('Erreur lors de l\'insertion des données');
      return;
    }
    res.json({ message: 'Données ajoutées avec succès', id: results.insertId });
  });
});

router.post('/addReclamation', (req, res) => {
  const { type,description,idEns } = req.body;

  // Vérifier les données avant l'insertion
  console.log('Données reçues:', { type,description,idEns });

  const query = 'INSERT INTO reclamation (type,description,date,idEns,statut) VALUES (?, ?,CURRENT_DATE,?,"En attente")';
  db.query(query, [type,description,idEns], (err, results) => {
    if (err) {
      console.error("Erreur SQL: ", err);  // Log l'erreur SQL
      res.status(500).send('Erreur lors de l\'insertion des données');
      return;
    }
    res.json({ message: 'Reclamation ajouté avec succés', id: results.insertId });
  });
});

// Exporter le router
module.exports = router;
