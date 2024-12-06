import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons'; // Import de l'icône

// Exemple de données des réclamations
const reclamations = [
  { id: '1', titre: 'Problème d’Internet', type: 'Internet', statut: 'En attente', date: '2024-11-01', description: 'Perte de connexion intermittente depuis 2 jours.' },
  { id: '2', titre: 'Équipement défectueux', type: 'Équipement', statut: 'En cours', date: '2024-11-05', description: 'L’ordinateur de la salle de classe 3B ne s’allume pas.' },
  { id: '3', titre: 'Problème de connexion', type: 'Internet', statut: 'Résolu', date: '2024-10-29', description: 'Connexion trop lente pour les examens en ligne.' },
];

const getStatutColor = (statut) => {
  switch (statut) {
    case 'En attente':
      return 'orange';
    case 'En cours':
      return 'blue';
    case 'Résolu':
      return 'green';
    default:
      return 'gray';
  }
};

const Dashboard = ({ navigation }) => {
  const [statutFiltre, setStatutFiltre] = useState('Tous');
  const [notificationsNonLues, setNotificationsNonLues] = useState(3); // Exemple de nombre de notifications

  const reclamationsFiltrees = statutFiltre === 'Tous'
    ? reclamations
    : reclamations.filter(item => item.statut === statutFiltre);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Aperçu des Réclamations</Text>
        <TouchableOpacity style={styles.userIcone}  onPress={() => navigation.navigate("User")}>
          <Icon name="person" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationIcon}  onPress={() => navigation.navigate("Notification")}>
          <Icon name="notifications-outline" size={30} color="#000" />
          {notificationsNonLues > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{notificationsNonLues}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <Picker
        selectedValue={statutFiltre}
        style={styles.picker}
        onValueChange={(itemValue) => setStatutFiltre(itemValue)}
      >
        <Picker.Item label="Tous" value="Tous" />
        <Picker.Item label="En attente" value="En attente" />
        <Picker.Item label="En cours" value="En cours" />
      </Picker>
      <FlatList
        data={reclamationsFiltrees}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.reclamationContainer}
            onPress={() => navigation.navigate('Reclamation', { reclamation: item })}
          >
            <View style={[styles.statusIndicator, { backgroundColor: getStatutColor(item.statut) }]} />
            <View style={styles.textContainer}>
              <Text style={styles.titre}>{item.titre}</Text>
              <Text style={styles.details}>Type: {item.type}</Text>
              <Text style={styles.details}>Statut: {item.statut}</Text>
              <Text style={styles.details}>Date: {item.date}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Soumission")}
      >
        <Text style={styles.buttonText}>Soumettre une nouvelle réclamation</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.modalButtons}>LogOut</Text>
      </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  notificationIcon: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  reclamationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  titre: {
    fontSize: 16,
    fontWeight: '600',
  },
  details: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
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

export default Dashboard;
