import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Assurez-vous d'installer cette bibliothèque pour les icônes

// Exemple de données de notifications
const notificationsData = [
  {
    id: '1',
    type: 'Internet',
    message: 'Votre réclamation est maintenant en cours de traitement.',
    dateHeure: '2024-11-16 14:30',
  },
  {
    id: '2',
    type: 'Infrastructure',
    message: 'Votre réclamation a été résolue.',
    dateHeure: '2024-11-15 10:15',
  },
  // Ajoutez plus de notifications si nécessaire
];

 const Notification = () => {
  const [notifications, setNotifications] = useState(notificationsData);
  const [nouvellesNotifications, setNouvellesNotifications] = useState(true);

  // Marquer les notifications comme lues
  const marquerCommeLues = () => {
    setNouvellesNotifications(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Notifications</Text>
        <TouchableOpacity onPress={marquerCommeLues} style={styles.iconContainer}>
          <Icon name="notifications" size={30} color={nouvellesNotifications ? 'red' : 'black'} />
          {nouvellesNotifications && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{notifications.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notificationCard}>
            <Text style={styles.type}>Type : {item.type}</Text>
            <Text style={styles.message}>{item.message}</Text>
            <Text style={styles.dateHeure}>Date : {item.dateHeure}</Text>
          </View>
        )}
      />
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
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  iconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: 'red',
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  notificationCard: {
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
  type: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 14,
    marginVertical: 5,
  },
  dateHeure: {
    fontSize: 12,
    color: '#666',
  },
});

export default Notification;
