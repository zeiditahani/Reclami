import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const User = () => {
  const [nom, setNom] = useState('Tahani Zeidi');
  const [departement, setDepartement] = useState('Informatique');
  const email = 'Tahani@isetmd.com';

  const [editable, setEditable] = useState(false);

  const enregistrerModifications = () => {
    alert('Profil mis à jour avec succès');
    setEditable(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profil Utilisateur</Text>
      <Text>Email académique : {email}</Text>
      <TextInput
        style={styles.input}
        value={nom}
        onChangeText={setNom}
        editable={editable}
      />
      <TextInput
        style={styles.input}
        value={departement}
        onChangeText={setDepartement}
        editable={editable}
      />
      {editable ? (
        <Button title="Enregistrer" onPress={enregistrerModifications} />
      ) : (
        <Button title="Modifier" onPress={() => setEditable(true)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});

export default User;
