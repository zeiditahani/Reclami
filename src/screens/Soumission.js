import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { View, Text, TextInput,  Button, Alert, StyleSheet } from 'react-native';

 const Soumission = () => {
  const [typeReclamation, setTypeReclamation] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (typeReclamation === '' || description === '') {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires.');
    } else {
      // Logic pour envoyer la réclamation ici
      Alert.alert('Succès', 'Votre réclamation a été soumise avec succès.');
      // Réinitialiser les champs après soumission
      setTypeReclamation('');
      setDescription('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Type de réclamation</Text>
      <Picker
        selectedValue={typeReclamation}
        onValueChange={(itemValue) => setTypeReclamation(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Sélectionnez un type" value="" />
        <Picker.Item label="Problème d’équipement" value="equipement" />
        <Picker.Item label="Support administratif" value="administratif" />
        <Picker.Item label="Accès Internet" value="internet" />
      </Picker>

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Décrivez le problème..."
        multiline
        value={description}
        onChangeText={(text) => setDescription(text)}
      />

      <Button title="Soumettre" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    marginBottom: 20,
  },
  input: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    textAlignVertical: 'top',
  },
});

export default Soumission;
