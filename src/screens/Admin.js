import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';


const Admin = ({ navigation }) => {
  const reclamationsData = [
    {
      id: '1',
      titre: 'Problème de connexion Internet',
      type: 'Internet',
      statut: 'En attente',
      enseignant: { nom: 'Yusuf', departement: 'Informatique' },
      description: 'La connexion Internet est très lente dans la salle 204.',
    },
    {
      id: '2',
      titre: 'Climatisation défectueuse',
      type: 'Infrastructure',
      statut: 'En cours',
      enseignant: { nom: 'Tahani', departement: 'Physique' },
      description: 'La climatisation ne fonctionne pas dans le bureau des enseignants.',
    },
  ];

  const [reclamations, setReclamations] = useState(reclamationsData);
  const [filtreStatut, setFiltreStatut] = useState('Tous');

  // Fonction pour filtrer les réclamations
  const filtrerReclamations = (statut) => {
    setFiltreStatut(statut);
    if (statut === 'Tous') {
      setReclamations(reclamationsData);
    } else {
      const filtered = reclamationsData.filter((rec) => rec.statut === statut);
      setReclamations(filtered);
    }
  };
  const handleLogin = () => {
      navigation.replace('Login'); // Remplace l'écran actuel par la navigation admin
  
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gestion des Réclamations</Text>

      <Picker
        selectedValue={filtreStatut}
        onValueChange={(val) => filtrerReclamations(val)}
        style={styles.picker}
      >
        <Picker.Item label="Tous" value="Tous" />
        <Picker.Item label="En attente" value="En attente" />
        <Picker.Item label="En cours" value="En cours" />
        <Picker.Item label="Résolu" value="Résolu" />
      </Picker>

      <FlatList
        data={reclamations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Reclamation', { reclamation: item })}
          >
            <Text style={styles.title}>{item.titre}</Text>
            <Text>Type : {item.type}</Text>
            <Text>Statut : {item.statut}</Text>
            <Text>Enseignant : {item.enseignant.nom}</Text>
          </TouchableOpacity>
        )}
      />
       <TouchableOpacity
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.modalButtons}>LogOut</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  picker: { marginVertical: 10 },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginRight: 250,

    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Admin;
