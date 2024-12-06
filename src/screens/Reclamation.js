import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput, Button} from 'react-native';
import { Picker } from '@react-native-picker/picker';


// Exemple de données de réclamations
const reclamationsData = [
  {
    id: '1',
    titre: 'Problème de connexion Internet',
    type: 'Internet',
    statut: 'En attente',
    dateSoumission: '2024-11-10',
    description: 'La connexion Internet est très lente dans la salle de classe 204.',
    enseignant: { nom: 'Mme Dupont', departement: 'Informatique' },
  },
  {
    id: '2',
    titre: 'Climatisation défectueuse',
    type: 'Infrastructure',
    statut: 'En cours',
    dateSoumission: '2024-11-12',
    description: 'La climatisation ne fonctionne pas correctement dans le bureau des enseignants.',
    enseignant: { nom: 'M. Martin', departement: 'Sciences' },
  },
];

const Reclamation = () => {
  const [reclamations, setReclamations] = useState(reclamationsData);
  const [filtreStatut, setFiltreStatut] = useState('Tous');
  const [reclamationSelectionnee, setReclamationSelectionnee] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [nouveauStatut, setNouveauStatut] = useState('');

  // Fonction pour filtrer les réclamations par statut
  const filtrerReclamations = (statut) => {
    setFiltreStatut(statut);
    if (statut === 'Tous') {
      setReclamations(reclamationsData);
    } else {
      const filtered = reclamationsData.filter((reclamation) => reclamation.statut === statut);
      setReclamations(filtered);
    }
  };

  // Ouvrir les détails d'une réclamation
  const ouvrirDetails = (reclamation) => {
    setReclamationSelectionnee(reclamation);
    setNouveauStatut(reclamation.statut);
    setModalVisible(true);
  };

  // Enregistrer les modifications
  const enregistrerModifications = () => {
    if (reclamationSelectionnee) {
      setReclamations((prev) =>
        prev.map((rec) =>
          rec.id === reclamationSelectionnee.id ? { ...rec, statut: nouveauStatut } : rec
        )
      );
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Suivi des réclamations</Text>

      {/* Filtrage par statut */}
      <View style={styles.filterContainer}>
        {['Tous', 'En attente', 'En cours', 'Résolu'].map((statut) => (
          <TouchableOpacity
            key={statut}
            onPress={() => filtrerReclamations(statut)}
            style={[
              styles.filterButton,
              filtreStatut === statut && styles.activeFilter,
            ]}
          >
            <Text style={styles.filterText}>{statut}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Liste des réclamations */}
      <FlatList
        data={reclamations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => ouvrirDetails(item)}>
            <Text style={styles.title}>{item.titre}</Text>
            <Text>Type : {item.type}</Text>
            <Text>Statut : {item.statut}</Text>
            <Text>Date de soumission : {item.dateSoumission}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Modal pour afficher les détails */}
      {reclamationSelectionnee && (
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{reclamationSelectionnee.titre}</Text>
              <Text>Description : {reclamationSelectionnee.description}</Text>
              <Text>Enseignant : {reclamationSelectionnee.enseignant.nom}</Text>
              <Text>Département : {reclamationSelectionnee.enseignant.departement}</Text>

              <Text style={{ marginTop: 10 }}>Modifier le statut :</Text>
              <Picker
                selectedValue={nouveauStatut}
                onValueChange={(itemValue) => setNouveauStatut(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="En attente" value="En attente" />
                <Picker.Item label="En cours" value="En cours" />
                <Picker.Item label="Résolu" value="Résolu" />
              </Picker>

              <View style={styles.modalButtons}>
                <Button title="Enregistrer" onPress={enregistrerModifications} />
                <Button title="Fermer" onPress={() => setModalVisible(false)} color="red" />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  filterButton: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  activeFilter: {
    backgroundColor: '#007bff',
  },
  filterText: {
    fontSize: 14,
    color: '#fff',
  },
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default Reclamation;
